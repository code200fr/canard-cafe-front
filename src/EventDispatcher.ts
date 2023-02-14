import EventEmitter from 'events';

export class EventDispatcher {
  protected static emitter: EventEmitter = new EventEmitter();

  public static on(eventName, cb: (...args: any) => void) {
    EventDispatcher.emitter.on(eventName, cb);
  }

  public static once(eventName, cb: (...args: any) => void) {
    EventDispatcher.emitter.once(eventName, cb);
  }

  public static off(eventName, cb: (...args: any) => void) {
    EventDispatcher.emitter.off(eventName, cb);
  }

  public static emit(eventName: string, value?: any) {
    EventDispatcher.emitter.emit(eventName, value);
  }
}
