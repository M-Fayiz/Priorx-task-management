import {Router} from 'express'
import { asyncHandler } from '../util/asyncHandler.util'
import { authController } from '../container'
const authRouter=Router()



authRouter.get('/me',asyncHandler(authController.authME))
authRouter.get('/refresh-token',asyncHandler(authController.refreshToken))
authRouter.post('/signup',asyncHandler(authController.signup))
authRouter.post('/verify-email',asyncHandler(authController.verifyEmail))
authRouter.post('/login',asyncHandler(authController.login))


export default authRouter