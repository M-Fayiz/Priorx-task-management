import { server } from "./app";
import envConfig from "./config/env.config";
import { connectDB } from "./config/db.config";
import { connectRedis } from "./config/redis.config";




async function bootstrap() {
  try {
    await connectDB();
    await connectRedis();

    server.listen(envConfig.PORT, () => {
      console.log(`🚀 Server running on port ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
    process.exit(1);
  }
}

bootstrap();
