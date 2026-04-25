import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../config/database";
import { env } from "../../../config/env";
import type { LoginRequest, RegisterRequest } from "../../../types";

export async function register({ name, email, password }: RegisterRequest) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw Object.assign(new Error("Email already in use"), { statusCode: 409 });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  const { accessToken, refreshToken } = generateTokens(user.id);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id } });
  return { user, accessToken, refreshToken };
}

export async function login({ email, password }: LoginRequest) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw Object.assign(new Error("Invalid credentials"), { statusCode: 401 });

  const { accessToken, refreshToken } = generateTokens(user.id);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id } });

  const { passwordHash: _, ...safeUser } = user;
  return { user: safeUser, accessToken, refreshToken };
}

export async function refreshAccessToken(token: string) {
  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored) throw Object.assign(new Error("Invalid refresh token"), { statusCode: 401 });

  const payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string };
  const accessToken = jwt.sign({ sub: payload.sub }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
  return { accessToken };
}

export async function logout(userId: string) {
  await prisma.refreshToken.deleteMany({ where: { userId } });
}

export async function getUserById(id: string) {
  return prisma.user.findUniqueOrThrow({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
}

function generateTokens(userId: string) {
  const accessToken = jwt.sign({ sub: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  });
  return { accessToken, refreshToken };
}
