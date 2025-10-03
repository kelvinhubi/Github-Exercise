export type Value = string | number | boolean | null | undefined |
  Date | Buffer | Map<unknown, unknown> | Set<unknown> |
  Array<Value> | { [key: string]: Value };

/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
export function serialize(value: Value): unknown {
  /**
   * insert your code here
   */
  return processValue(value);
}

function processValue(value: any) {
  if (value === null) {
    // handle null
    return null
  } else if (value === undefined) {
    // handle undefined
    return undefined;
  } else if (typeof value === 'string') {
    // handle string
    const result: string = value;
    return result;
  } else if (typeof value === 'number') {
    // handle number
    const result: number = value;
    return result;
  } else if (typeof value === 'boolean') {
    // handle boolean
    const result: boolean = value;
    return result;
  } else if (value instanceof Date) {
    // handle Date
    return { __t: 'Date', __v: value.getTime() };
  } else if (Buffer.isBuffer(value)) {
    // handle Buffer
    return { __t: 'Buffer', __v: Array.from(value) }
  } else if (value instanceof Map) {
    // handle Map
    const result = { __t: 'Map', __v: Array.from(value.entries()) };
    return result;
  } else if (value instanceof Set) {
    // handle Set
    return { __t: 'Set', __v: Array.from(value) };
  } else if (Array.isArray(value)) {
    // handle Array
    return value.map(v => processValue(v));
  } else if (typeof value === 'object') {
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
export function deserialize<T = unknown>(value: unknown): T {
  /**
   * insert your code here
   */

  return processDeserialize(value) as T;
}

function processDeserialize(value: any): any {
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
