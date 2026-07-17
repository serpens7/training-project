import '@testing-library/jest-dom'

// jsdom is missing several web APIs that RTK Query's fetchBaseQuery needs
// even when `fetch` itself is mocked per-test. See:
// https://github.com/jsdom/jsdom/issues/1724
// Order matters: undici reads these globals at import time, so they must be
// assigned via `require` (not hoisted `import`) before requiring undici.
/* eslint-disable global-require, @typescript-eslint/no-var-requires */
if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('node:util');
    Object.assign(global, { TextEncoder, TextDecoder });
}
if (typeof global.ReadableStream === 'undefined') {
    const { ReadableStream, WritableStream, TransformStream } = require('node:stream/web');
    Object.assign(global, { ReadableStream, WritableStream, TransformStream });
}
if (typeof global.MessageChannel === 'undefined') {
    const { MessageChannel, MessagePort } = require('node:worker_threads');
    Object.assign(global, { MessageChannel, MessagePort });
}
if (typeof global.Response === 'undefined') {
    const { Headers, Request, Response } = require('undici');
    Object.assign(global, { Headers, Request, Response });
}
/* eslint-enable global-require, @typescript-eslint/no-var-requires */
