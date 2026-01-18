import jwt, { SignOptions } from "jsonwebtoken"
import { randomUUID } from "crypto"
import { IAccessPayloadDTO } from "../types/mapper-types/payload.types"
import envConfig from "../config/env.config"

export const generateTokens = (accessPayload:IAccessPayloadDTO) => {
  try {
    

    const refreshPayload = {
      sub: accessPayload.sub,
      tokenId: randomUUID()
    }

    const accessToken = jwt.sign(
      accessPayload,
      envConfig.ACCESS_TOKEN_SIGNATURE!,
      {
        expiresIn: "15m",
        algorithm: "HS256",
        issuer: "task-management-api"
      }
    )

    const refreshToken = jwt.sign(
      refreshPayload,
      envConfig.REFRESH_TOKEN_SIGNATURE!,
      {
        expiresIn: "7d",
        algorithm: "HS256",
        issuer: "task-management-api"
      }
    )

    return { accessToken, refreshToken }

  } catch (error) {
    throw new Error("Token generation failed")
  }
}
