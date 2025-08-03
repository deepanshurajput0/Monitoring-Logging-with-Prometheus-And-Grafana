import express from 'express'

const app = express()

//@ts-ignore

function middleware(req,res,next){
    const startTime = Date.now()
    next()
    const endTime = Date.now()
    console.log('it took', endTime - startTime,'ms')
}

app.use(middleware)

app.get("/user",(req,res)=>{

   res.json({
    name:'deepanshu'
   })
})

app.post("/user",(req,res)=>{
   res.json({
    name:'deepanshu'
   })
})


app.listen(3000)