import { eventEmitter } from '@/config';

export const emitAsync = async <T>(event: string | symbol, ...args: T[]): Promise<void> => {
  const listeners = eventEmitter.listeners(event);
  await Promise.all(listeners.map((listener) => listener(...args)));
};
