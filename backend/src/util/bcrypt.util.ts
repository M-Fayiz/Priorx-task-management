import bcrypt from "bcrypt";
import envConfig from "../config/env.config";

export const hashPassword = async (pass: string) => {
  return await bcrypt.hash(pass, Number(envConfig.HASH_SALT));
};

export async function comparePassword(
  pass: string,
  hashed: string,
): Promise<boolean> {
  return await bcrypt.compare(pass, hashed);
}
