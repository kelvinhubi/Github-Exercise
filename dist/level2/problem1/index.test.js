"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const R = tslib_1.__importStar(require("ramda"));
const delay_1 = tslib_1.__importDefault(require("@highoutput/delay"));
const _1 = require("./");
describe('ExecutionCache', () => {
    describe('#fire', () => {
        test('execute async handler', async () => {
            const handler = jest.fn(async (a, b) => {
                await (0, delay_1.default)(Math.floor(100 * Math.random()));
                return a + b;
            });
            const cache = new _1.ExecutionCache(handler);
            await cache.fire('key', 1, 2);
            expect(handler).toHaveBeenCalledWith(1, 2);
        });
        test('multiple unrelated executions', async () => {
            const handler = jest.fn(async (a, b) => {
                await (0, delay_1.default)(Math.floor(100 * Math.random()));
                return a + b;
            });
            const cache = new _1.ExecutionCache(handler);
            for (const i of R.range(0, 10)) {
                await cache.fire(`key-${i}`, i, i);
            }
            expect(handler).toHaveBeenCalledTimes(10);
        });
        test('idempotent execution', async () => {
            const handler = jest.fn(async (a, b) => {
                await (0, delay_1.default)(Math.floor(100 * Math.random()));
                return a + b;
            });
            const cache = new _1.ExecutionCache(handler);
            const results = await Promise.all(R.times(() => cache.fire('key', 4, 5), 10));
            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(4, 5);
            expect(results).toEqual(R.repeat(9, 10));
        });
    });
});
//# sourceMappingURL=index.test.js.map