import client from "prom-client";

export const activeRequestsGauge = new client.Gauge({
    name: 'active_requests',
    help: 'Number of active requests',
    labelNames:['method','route','statusCode']
});

//@ts-ignore

export const activeCountMiddleware = (req,res,next) => {

  
  activeRequestsGauge.inc({
      method: req.method,
      route: req.path,
      statusCode: res.statusCode,
    });

  res.on("finish", () => {

    activeRequestsGauge.dec({
      method: req.method,
      route: req.path,
      statusCode: res.statusCode,
    });
  });
  next();
};
