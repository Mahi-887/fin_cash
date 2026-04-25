export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isStrongPassword(value: string): boolean {
  return value.length >= 8 && /[A-Z]/.test(value) && /[0-9]/.test(value);
}

export function isRequired(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  return value !== null && value !== undefined;
}

export function isPositiveNumber(value: number): boolean {
  return typeof value === "number" && isFinite(value) && value > 0;
}

export function isTicker(value: string): boolean {
  return /^[A-Z]{1,5}$/.test(value.toUpperCase());
}
