import { io } from "../../socket/index.socket";
import { IEventPublisher } from "../interface/IEventPublisherInterface";

export class SocketPublisher implements IEventPublisher {
  emit(event: string, payload: any, userId: string) {
    io.to(userId).emit(event, payload);
  }
}
