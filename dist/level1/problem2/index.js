"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectId = void 0;
class ObjectId {
    constructor(type, timestamp) {
        /**
         * insert your code here
         */
    }
    static generate(type) {
        return new ObjectId(type !== null && type !== void 0 ? type : 0, Date.now());
    }
    toString(encoding) {
        return this.data.toString(encoding !== null && encoding !== void 0 ? encoding : 'hex');
    }
}
exports.ObjectId = ObjectId;
//# sourceMappingURL=index.js.map