import { AuthService } from "../service/implemetnation/AuthService";
import { userRepository } from "./repositories";


export const authService = new AuthService(userRepository)
