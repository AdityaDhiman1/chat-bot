import express from 'express';
const app = express();
const port = 3000;
import morgan from 'morgan';
import cors from 'cors';
import OpenAI from 'openai';
import bodyParser from 'body-parser';
app.use(morgan("tiny"))
import dotenv from 'dotenv';
dotenv.config()


  
const openai = new OpenAI({
    apiKey: process.env.KEY,
      
  });

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are a helpful assistant." },
            {role:'user',content:message}],
            max_tokens: 30
        });

        const reply = completion.choices[0].message.content;
        res.status(200).json({ reply });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: `EXCEPTION =>${error.message}` })

    }
})

app.listen(port, () => {
    console.log('listening on port', port)
});