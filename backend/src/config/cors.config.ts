import envConfig from "./env.config"

const corsConfig={
    origin:envConfig.CLIENT_URL,
    credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
}

export default corsConfig