import {Router} from 'express'
import { asyncHandler } from '../util/asyncHandler.util'
import { authController } from '../container'
const authRouter=Router()



authRouter.post('/signup',asyncHandler(authController.signup))


export default authRouter