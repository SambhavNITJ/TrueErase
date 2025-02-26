import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import connectDB from './db/index.js';
import userRouter from './routes/userRoutes.js';


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => 
    res.send('hi')
)

app.use('/api/user', userRouter)

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

