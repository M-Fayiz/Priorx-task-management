import { Router } from "express";
import { asyncHandler } from "../util/asyncHandler.util";
import { authController } from "../container";
import { authInputValidation } from "../middleware/authInputValidation.middleware";
const authRouter = Router();

authRouter.get("/me", asyncHandler(authController.authME));
authRouter.get("/refresh-token", asyncHandler(authController.refreshToken));
authRouter.post("/signup",authInputValidation, asyncHandler(authController.signup));
authRouter.post("/verify-email", asyncHandler(authController.verifyEmail));
authRouter.post("/login", asyncHandler(authController.login));
authRouter.delete("/logout", asyncHandler(authController.logout));

export default authRouter;
