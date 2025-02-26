import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import connectDB from './db/index.js';
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
    
}));

app.get('/', (req, res) => 
    res.send('hi')
)

connectDB()
    .then(() => {
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`✅ Server is running on ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Server failed to start:", err);
        process.exit(1);
    });

