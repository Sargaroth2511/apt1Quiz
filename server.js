import express from "express";
import axios from "axios";
import cors from "cors";
import {} from "dotenv/config";


const app = express()
app.use(cors())
app.use(express.json());

const port = 5000;

const apiKey = process.env.REACT_APP_API_KEY;  

app.listen(5000, ()=> console.log(`Server is running on ${port}` ))

// API request
app.post('/ask', (req,res)=>{  

    const userQuestion = req.body.question

    const options = {
        method: 'POST',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
            // 'GPT-API-Key':process.env.REACT_APP_API_KEY,
            // 'GPT-API-Host': 'api.openai.com/v1/chat/completions.com'
            'Authorization': `Bearer ${apiKey}`,
        },
        data:{
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: "You are a helpful assistant. You answer Questions precisely and in a short way."},{ role: 'user', content: userQuestion }],
        }
   };
   
    axios.request(options).then(function (response) {
        const assistantReply = response.data.choices[0].message.content
        res.json({ reply: assistantReply });
    }).catch(function (error) {
        console.error('an error occured', error.response.data);
    });
})