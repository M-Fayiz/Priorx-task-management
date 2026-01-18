import { RedisClientType, createClient } from "redis";
import envConfig from "./env.config";

const redisClient: RedisClientType = createClient({
  url: envConfig.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      console.log(`Redis reconnect attempt ${retries}`);
      return Math.min(retries * 100, 3000);
    },
  },
});

redisClient.on("connect", () => {
  console.log("R E D I S Connected |");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis connection error", err);
});

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (err) {
    console.error("Redis connection failed", err);
  }
};

export default redisClient;
