import { eventEmitter } from "@/config";

type AsyncListener = (...args: unknown[]) => Promise<void> | void;

export const emitAsync = async (
  event: string | symbol,
  ...args: unknown[]
): Promise<void> => {
  const listeners = eventEmitter.listeners(event) as AsyncListener[];
  await Promise.all(listeners.map(fn => fn(...args)));
};
