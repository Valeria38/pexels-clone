const { TextEncoder, TextDecoder } = require("node:util");
const { ReadableStream } = require("node:stream/web");
const { MessagePort } = require("node:worker_threads");

if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;
if (!global.ReadableStream) global.ReadableStream = ReadableStream;
if (!global.MessagePort) global.MessagePort = MessagePort;

require("@testing-library/jest-dom");

let observers = new Map();
(global as any).IntersectionObserver = jest
  .fn()
  .mockImplementation((callback, options) => ({
    observe: (node: any) => {
      observers.set(node, callback);
    },
    unobserve: (node: any) => observers.delete(node),
    disconnect: () => observers.clear(),
  }));

(global as any).simulateIntersection = (isIntersecting: boolean) => {
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
if (!global.crypto) {
  // @ts-ignore
  global.crypto = {};
}
// @ts-ignore
global.crypto.randomUUID = jest.fn(() => mockGuestId);
