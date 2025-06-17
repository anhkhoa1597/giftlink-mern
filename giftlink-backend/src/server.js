import app from "./app.js";
import { connectDB } from "./db/db.js";
import logger from "./utils/logger.js";
import config from "./config/config.js";
import mongoose from "mongoose"

const { port } = config;

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      logger.info(
        `Received ${signal}. Closing server and MongoDB connection...`
      );
      await mongoose.connection.close();
      server.close(() => {
        logger.info("HTTP server closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    logger.error("Failed to start server", { stack: error.stack });
    process.exit(1);
  }
};

startServer();
