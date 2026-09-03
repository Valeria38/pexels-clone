import { ReadableStream } from "node:stream/web";
import { TextDecoder, TextEncoder } from "node:util";
import { MessagePort } from "node:worker_threads";

export interface TestEnvironmentGlobal {
  TextEncoder: typeof TextEncoder;
  TextDecoder: typeof TextDecoder;
  ReadableStream: typeof ReadableStream;
  MessagePort: typeof MessagePort;
  IntersectionObserver: unknown;
  simulateIntersection: (isIntersecting: boolean) => void;
  crypto: {
    randomUUID: () => string;
    [key: string]: unknown;
  };
}

const g = globalThis as unknown as TestEnvironmentGlobal;

if (!g.TextEncoder) g.TextEncoder = TextEncoder;
if (!g.TextDecoder) g.TextDecoder = TextDecoder;
if (!g.ReadableStream) g.ReadableStream = ReadableStream;
if (!g.MessagePort) g.MessagePort = MessagePort;

import "@testing-library/jest-dom";

const observers = new Map();
g.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: (node: Element) => {
    observers.set(node, callback);
  },
  unobserve: (node: Element) => observers.delete(node),
  disconnect: () => observers.clear(),
}));

g.simulateIntersection = (isIntersecting: boolean) => {
  observers.forEach((callback) => {
    callback([{ isIntersecting, target: {} }]);
  });
};

process.env.NEXT_PUBLIC_SUPABASE_URL = "https://fake-url.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "fake-anon-key";

jest.mock("@/lib/actions", () => ({
  toggleLikeAction: jest.fn(),
}));

export const mockGuestId = "test-guest-id-12345";
if (!g.crypto) {
  // @ts-expect-error: need to mock crypto object for tests
  g.crypto = {};
}
g.crypto.randomUUID = jest.fn(() => mockGuestId);
