import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());

const PORT = 3001;

const allowedOrigins = ['http://localhost:5173'];

const corsOptions: cors.CorsOptions = {
	origin: allowedOrigins,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
};

app.use(cors(corsOptions));

app.get('/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
