"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
describe('Serialization', () => {
    describe('scalars', () => {
        const cases = [
            ['null', null, null],
            ['string', 'string', 'string'],
            ['number', 1, 1],
            ['boolean', true, true],
            ['undefined', undefined, undefined],
        ];
        test.each(cases)('serialize %p', (_, input, output) => {
            expect((0, _1.serialize)(input)).toEqual(output);
        });
        test.each(cases)('deserialize %p', (_, output, input) => {
            expect((0, _1.deserialize)(input)).toEqual(output);
        });
    });
    describe('built-in object types', () => {
        const cases = [
            [
                'Map',
                new Map([
                    ['one', 1],
                    ['two', 2],
                ]),
                {
                    __t: 'Map',
                    __v: [
                        ['one', 1],
                        ['two', 2],
                    ],
                },
            ],
            [
                'Set',
                new Set(['one', 'two', 'three']),
                { __t: 'Set', __v: ['one', 'two', 'three'] },
            ],
            [
                'Buffer',
                Buffer.from([90, 115, 109, 187, 242, 216, 94, 110]),
                {
                    __t: 'Buffer',
                    __v: [90, 115, 109, 187, 242, 216, 94, 110],
                },
            ],
            [
                'Date',
                new Date('2022-12-25T04:27:49.988Z'),
                { __t: 'Date', __v: 1671942469988 },
            ],
        ];
        test.each(cases)('serialize %p', (_, input, output) => {
            expect((0, _1.serialize)(input)).toEqual(output);
        });
        test.each(cases)('deserialize %p', (_, output, input) => {
            expect((0, _1.deserialize)(input)).toEqual(output);
        });
    });
    describe('nested objects', () => {
        const cases = [
            [
                {
                    null: null,
                    string: 'string',
                    number: 1,
                    boolean: true,
                    undefined: undefined,
                    Date: new Date('2022-12-25T04:27:49.988Z'),
                    Buffer: Buffer.from([90, 115, 109, 187, 242, 216, 94, 110]),
                    Set: new Set(['one', 'two', 'three']),
                    Map: new Map([
                        ['one', 1],
                        ['two', 2],
                    ]),
                    object: {
                        null: null,
                        string: 'string',
                        number: 1,
                        boolean: true,
                        undefined: undefined,
                        Date: new Date('2022-12-25T04:27:49.988Z'),
                        Buffer: Buffer.from([90, 115, 109, 187, 242, 216, 94, 110]),
                        Set: new Set(['one', 'two', 'three']),
                        Map: new Map([
                            ['one', 1],
                            ['two', 2],
                        ]),
                    },
                    array: [
                        null,
                        'string',
                        1,
                        true,
                        undefined,
                        new Date('2022-12-25T04:27:49.988Z'),
                        Buffer.from([90, 115, 109, 187, 242, 216, 94, 110]),
                        new Set(['one', 'two', 'three']),
                        new Map([
                            ['one', 1],
                            ['two', 2],
                        ]),
                        {
                            null: null,
                            string: 'string',
                            number: 1,
                            boolean: true,
                            undefined: undefined,
                        },
                    ],
                },
                {
                    null: null,
                    string: 'string',
                    number: 1,
                    boolean: true,
                    undefined: undefined,
                    Date: { __t: 'Date', __v: 1671942469988 },
                    Buffer: {
                        __t: 'Buffer',
                        __v: [90, 115, 109, 187, 242, 216, 94, 110],
                    },
                    Set: { __t: 'Set', __v: ['one', 'two', 'three'] },
                    Map: {
                        __t: 'Map',
                        __v: [
                            ['one', 1],
                            ['two', 2],
                        ],
                    },
                    object: {
                        null: null,
                        string: 'string',
                        number: 1,
                        boolean: true,
                        undefined: undefined,
                        Date: { __t: 'Date', __v: 1671942469988 },
                        Buffer: {
                            __t: 'Buffer',
                            __v: [90, 115, 109, 187, 242, 216, 94, 110],
                        },
                        Set: { __t: 'Set', __v: ['one', 'two', 'three'] },
                        Map: {
                            __t: 'Map',
                            __v: [
                                ['one', 1],
                                ['two', 2],
                            ],
                        },
                    },
                    array: [
                        null,
                        'string',
                        1,
                        true,
                        undefined,
                        { __t: 'Date', __v: 1671942469988 },
                        {
                            __t: 'Buffer',
                            __v: [90, 115, 109, 187, 242, 216, 94, 110],
                        },
                        { __t: 'Set', __v: ['one', 'two', 'three'] },
                        {
                            __t: 'Map',
                            __v: [
                                ['one', 1],
                                ['two', 2],
                            ],
                        },
                        {
                            null: null,
                            string: 'string',
                            number: 1,
                            boolean: true,
                            undefined: undefined,
                        },
                    ],
                },
            ],
        ];
        test.each(cases)('serialize nested object', (input, output) => {
            expect((0, _1.serialize)(input)).toEqual(output);
        });
        test.each(cases)('deserialize nested object', (output, input) => {
            expect((0, _1.deserialize)(input)).toEqual(output);
        });
    });
});
//# sourceMappingURL=index.test.js.map