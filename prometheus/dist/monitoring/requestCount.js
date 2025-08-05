"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCountMiddleware = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const requestCounter = new prom_client_1.default.Counter({
    name: "http_requests_total",
    help: "Total number of http requests",
    labelNames: ["method", "route", "statusCode"],
});
const requestCountMiddleware = (req, res, next) => {
    const startTime = Date.now();
    res.on("finish", () => {
        const endTime = Date.now();
        console.log(`Request took ${endTime - startTime}ms`);
        requestCounter.inc({
            method: req.method,
            route: req.path,
            statusCode: res.statusCode,
        });
    });
    next();
};
exports.requestCountMiddleware = requestCountMiddleware;
