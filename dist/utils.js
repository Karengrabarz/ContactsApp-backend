"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
let id = 1;
const generateId = () => {
    return id++;
};
exports.generateId = generateId;
