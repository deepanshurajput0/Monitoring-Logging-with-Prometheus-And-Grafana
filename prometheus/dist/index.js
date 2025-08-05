"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestCount_1 = require("./monitoring/requestCount");
const prom_client_1 = __importDefault(require("prom-client"));
const app = (0, express_1.default)();
//@ts-ignore
// function middleware(req,res,next){
//     const startTime = Date.now()
//     next()
//     const endTime = Date.now()
//     console.log('it took', endTime - startTime,'ms')
// }
app.use(requestCount_1.requestCountMiddleware);
app.get("/user", (req, res) => {
    res.json({
        name: 'deepanshu'
    });
});
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metrics = yield prom_client_1.default.register.metrics();
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(metrics);
}));
app.listen(3000);
