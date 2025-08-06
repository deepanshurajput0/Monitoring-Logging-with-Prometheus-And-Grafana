import client from "prom-client";

export const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});

// @ts-ignore
export function requestCount(req,res,next){
    const startTime = Date.now() 
     res.on('finish',()=>{
        const endTime = Date.now()
        httpRequestDurationMicroseconds.observe({
            method:req.method,
            route:req.route ? req.route.path : req.path,
            code: res.statusCode
        },endTime-startTime)
     })
     next();
}


