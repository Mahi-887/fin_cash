import "dotenv/config";
import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./middleware/requestLogger";
import { prisma } from "./config/database";

const PORT = env.PORT;

async function bootstrap() {
  try {
    await prisma.$connect();
    logger.info("Database connected");

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} [${env.NODE_ENV}]`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
}

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down gracefully");
  await prisma.$disconnect();
  process.exit(0);
});

bootstrap();
