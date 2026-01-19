export interface IEventPublisher {
  emit(event: string, payload: any, userId: string): void;
}
