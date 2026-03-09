import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
apiKey:"YOUR_API_KEY"
});

app.post("/analyze", async (req,res)=>{

let text = req.body.text;

const completion = await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{
role:"system",
content:"You are an English communication coach helping students improve interview communication."
},

{
role:"user",
content:`Analyze this student answer:

${text}

Give:
1 Grammar corrections
2 Better version of answer
3 Confidence improvement tips
4 Communication score out of 10`
}

]

})

res.json({
feedback:completion.choices[0].message.content
})

})

app.listen(3000,()=>{
console.log("Server running on port 3000")
})
