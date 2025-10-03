export class ObjectId {
  private data: Buffer;
  private static processRandom: Buffer;
  private static counter: number;

  constructor(type: number, timestamp: number) {
    /**
     * insert your code here
     */
    // Initialize static values if not already done
    if (!ObjectId.processRandom) {
      ObjectId.processRandom = Buffer.allocUnsafe(4);
      // Generate random 4-byte value once per process
      for (let i = 0; i < 4; i++) {
        ObjectId.processRandom[i] = Math.floor(Math.random() * 256);
      }
    }

    if (ObjectId.counter === undefined) {
      // Initialize counter to random 3-byte value
      ObjectId.counter = Math.floor(Math.random() * 0xFFFFFF);
    }

    // Create 14-byte buffer: 1 + 6 + 4 + 3 = 14 bytes
    this.data = Buffer.allocUnsafe(14);

    let offset = 0;

    // Type: 1 byte
    this.data.writeUInt8(type, offset);
    offset += 1;

    // Timestamp: 6 bytes (48-bit timestamp)
    // Write timestamp as big-endian 48-bit value
    const timestampBuffer = Buffer.allocUnsafe(8);
    timestampBuffer.writeBigUInt64BE(BigInt(timestamp), 0);
    // Copy last 6 bytes (skip first 2 bytes)
    for (let i = 0; i < 6; i++) {
      this.data[offset + i] = timestampBuffer[2 + i];
    }
    offset += 6;

    // Random: 4 bytes (process-specific random value)
    for (let i = 0; i < 4; i++) {
      this.data[offset + i] = ObjectId.processRandom[i];
    }
    offset += 4;

    // Counter: 3 bytes (increment and wrap around at 24-bit max)
    ObjectId.counter = (ObjectId.counter + 1) & 0xFFFFFF;
    this.data.writeUIntBE(ObjectId.counter, offset, 3);
  }

  static generate(type?: number): ObjectId {
    return new ObjectId(type ?? 0, Date.now());
  }

  toString(encoding?: 'hex' | 'base64'): string {
    return this.data.toString(encoding ?? 'hex');
  }
}