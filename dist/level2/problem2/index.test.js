"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
describe('mergeDowntimeLogs', () => {
    const cases = [
        [
            'islands',
            [
                [[new Date('2020-01-01T00:00:00Z'), new Date('2020-01-01T01:00:00Z')], [new Date('2020-01-02T05:00:00Z'), new Date('2020-01-02T05:30:00Z')]],
                [[new Date('2020-01-01T17:00:00Z'), new Date('2020-01-01T17:45:00Z')]],
            ],
            [
                [new Date('2020-01-01T00:00:00Z'), new Date('2020-01-01T01:00:00Z')],
                [new Date('2020-01-01T17:00:00Z'), new Date('2020-01-01T17:45:00Z')],
                [new Date('2020-01-02T05:00:00Z'), new Date('2020-01-02T05:30:00Z')],
            ]
        ],
        [
            'overlaps',
            [
                [[new Date('2020-01-01T00:00:00Z'), new Date('2020-01-01T01:00:00Z')], [new Date('2020-01-02T05:00:00Z'), new Date('2020-01-02T05:30:00Z')]],
                [[new Date('2020-01-01T17:00:00Z'), new Date('2020-01-01T17:45:00Z')], [new Date('2020-01-02T05:20:00Z'), new Date('2020-01-02T06:10:00Z')]],
            ],
            [
                [new Date('2020-01-01T00:00:00Z'), new Date('2020-01-01T01:00:00Z')],
                [new Date('2020-01-01T17:00:00Z'), new Date('2020-01-01T17:45:00Z')],
                [new Date('2020-01-02T05:00:00Z'), new Date('2020-01-02T06:10:00Z')],
            ]
        ],
    ];
    test.each(cases)('%p', (_, input, expected) => {
        expect((0, _1.merge)(...input)).toEqual(expected);
    });
});
//# sourceMappingURL=index.test.js.map