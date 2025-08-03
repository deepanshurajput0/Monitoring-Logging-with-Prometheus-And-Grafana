"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//@ts-ignore
function middleware(req, res, next) {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log('it took', endTime - startTime, 'ms');
}
app.use(middleware);
app.get("/user", (req, res) => {
    res.json({
        name: 'deepanshu'
    });
});
app.post("/user", (req, res) => {
    res.json({
        name: 'deepanshu'
    });
});
app.listen(3000);
