export class ExecutionCache<TInputs extends Array<unknown>, TOutput> {
  private cache = new Map<string, Promise<TOutput>>();

  constructor(private readonly handler: (...args: TInputs) => Promise<TOutput>) { }

  async fire(key: string, ...args: TInputs): Promise<TOutput> {
    /**
     * insert your code here
     */

    // Check if we already have a cached promise for this key
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    // Create new promise and cache it
    const promise = this.handler(...args);
    this.cache.set(key, promise);

    return promise;
  }
}
