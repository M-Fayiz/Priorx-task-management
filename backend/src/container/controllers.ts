import { AuthController } from "../controller/implementation/AuthController";
import { authService } from "./services";

export const authController = new AuthController(authService)