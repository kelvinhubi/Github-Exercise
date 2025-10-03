"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const R = tslib_1.__importStar(require("ramda"));
const delay_1 = tslib_1.__importDefault(require("@highoutput/delay"));
const _1 = require("./");
describe('ObjectId', () => {
    test('unique ids', () => {
        const COUNT = 10000;
        const set = new Set(R.times(() => _1.ObjectId.generate().toString(), COUNT));
        expect(set.size).toBe(COUNT);
    });
    test('different timestamps', async () => {
        const one = _1.ObjectId.generate().toString();
        await (0, delay_1.default)(100);
        const two = _1.ObjectId.generate().toString();
        expect(one.substring(2, 14)).not.toEqual(two.substring(2, 14));
    });
    test('fixed random', async () => {
        const one = _1.ObjectId.generate().toString();
        const two = _1.ObjectId.generate().toString();
        expect(one.substring(14, 22)).toEqual(two.substring(14, 22));
    });
    test('lexicographic ordering', () => {
        const ids = R.times(() => _1.ObjectId.generate().toString(), 1000);
        expect(ids.slice().sort()).toEqual(ids);
    });
});
//# sourceMappingURL=index.test.js.map