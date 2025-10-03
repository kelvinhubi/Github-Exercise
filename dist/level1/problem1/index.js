"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserialize = exports.serialize = void 0;
/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
function serialize(value) {
    /**
     * insert your code here
     */
    return processValue(value);
}
exports.serialize = serialize;
function processValue(value) {
    if (value === null) {
        // handle null
        return null;
    }
    else if (value === undefined) {
        // handle undefined
        return undefined;
    }
    else if (typeof value === 'string') {
        // handle string
        const result = value;
        return result;
    }
    else if (typeof value === 'number') {
        // handle number
        const result = value;
        return result;
    }
    else if (typeof value === 'boolean') {
        // handle boolean
        const result = value;
        return result;
    }
    else if (value instanceof Date) {
        // handle Date
        return { __t: 'Date', __v: value.getTime() };
    }
    else if (Buffer.isBuffer(value)) {
        // handle Buffer
        return { __t: 'Buffer', __v: Array.from(value) };
    }
    else if (value instanceof Map) {
        // handle Map
        const result = { __t: 'Map', __v: Array.from(value.entries()) };
        return result;
    }
    else if (value instanceof Set) {
        // handle Set
        return { __t: 'Set', __v: Array.from(value) };
    }
    else if (Array.isArray(value)) {
        // handle Array
        return value.map(v => processValue(v));
    }
    else if (typeof value === 'object') {
        // handle regular Object
        let result = {};
        for (const key in value) {
            result[key] = processValue(value[key]);
        }
        return result;
    }
}
/**
 * Transforms JSON compatible scalars and objects into JavaScript
 * scalar and objects.
 */
function deserialize(value) {
    /**
     * insert your code here
     */
    return processDeserialize(value);
}
exports.deserialize = deserialize;
function processDeserialize(value) {
    // Handle null and undefined
    if (value === null) {
        return null;
    }
    if (value === undefined) {
        return undefined;
    }
    // Handle primitive types (pass through)
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return value;
    }
    // Handle arrays (recursively deserialize each element)
    if (Array.isArray(value)) {
        return value.map(v => processDeserialize(v));
    }
    // Handle objects
    if (typeof value === 'object') {
        // Check if it's a special serialized object
        if (value.hasOwnProperty('__t')) {
            const type = value.__t;
            const data = value.__v;
            if (type === 'Date') {
                return new Date(data);
            }
            if (type === 'Buffer') {
                return Buffer.from(data);
            }
            if (type === 'Map') {
                return new Map(data);
            }
            if (type === 'Set') {
                return new Set(data);
            }
        }
        // Regular object - recursively deserialize properties
        const result = {};
        for (const key in value) {
            result[key] = processDeserialize(value[key]);
        }
        return result;
    }
    // Fallback
    return value;
}
//# sourceMappingURL=index.js.map