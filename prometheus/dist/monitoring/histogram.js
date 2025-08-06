"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequestDurationMicroseconds = void 0;
exports.requestCount = requestCount;
const prom_client_1 = __importDefault(require("prom-client"));
exports.httpRequestDurationMicroseconds = new prom_client_1.default.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});
// @ts-ignore
function requestCount(req, res, next) {
    const startTime = Date.now();
    res.on('finish', () => {
        const endTime = Date.now();
        exports.httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, endTime - startTime);
    });
    next();
}
