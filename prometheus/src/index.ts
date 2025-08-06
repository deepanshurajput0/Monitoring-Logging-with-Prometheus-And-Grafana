import express from 'express'
import { requestCountMiddleware } from './monitoring/requestCount'
import client from "prom-client";
import { activeCountMiddleware } from './monitoring/gauge';
const app = express()

//@ts-ignore

// function middleware(req,res,next){
//     const startTime = Date.now()
//     next()
//     const endTime = Date.now()
//     console.log('it took', endTime - startTime,'ms')
// }

app.use(activeCountMiddleware
    
)

app.get("/user",(req,res)=>{

   res.json({
    name:'deepanshu'
   })
})


app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})


app.listen(3000)