"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/user", (req, res) => {
    const startTime = Date.now();
    res.json({
        name: 'deepanshu'
    });
    const endTime = Date.now();
    console.log(endTime - startTime + "ms");
});
app.post("/user", (req, res) => {
    res.json({
        name: 'deepanshu'
    });
});
app.listen(3000);
