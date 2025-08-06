"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeCountMiddleware = exports.activeRequestsGauge = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.activeRequestsGauge = new prom_client_1.default.Gauge({
    name: 'active_requests',
    help: 'Number of active requests',
    labelNames: ['method', 'route', 'statusCode']
});
//@ts-ignore
const activeCountMiddleware = (req, res, next) => {
    exports.activeRequestsGauge.inc({
        method: req.method,
        route: req.path,
        statusCode: res.statusCode,
    });
    res.on("finish", () => {
        exports.activeRequestsGauge.dec({
            method: req.method,
            route: req.path,
            statusCode: res.statusCode,
        });
    });
    next();
};
exports.activeCountMiddleware = activeCountMiddleware;
