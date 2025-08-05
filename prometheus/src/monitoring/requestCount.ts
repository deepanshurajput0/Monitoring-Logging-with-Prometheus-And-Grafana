import { Request, Response, NextFunction } from "express";
import client from "prom-client";

const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of http requests",
  labelNames: ["method", "route", "statusCode"],
});

export const requestCountMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
