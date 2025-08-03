import express from 'express'

const app = express()

app.get("/user",(req,res)=>{
    const startTime = Date.now()

   res.json({
    name:'deepanshu'
   })
   const endTime = Date.now()
   console.log(endTime-startTime+"ms")
})

app.post("/user",(req,res)=>{
   res.json({
    name:'deepanshu'
   })
})


app.listen(3000)