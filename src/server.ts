import 'dotenv/config';
import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorHandler);

app.get('/', (req, res) => {
    return res.json({ message: "API is online!" });
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));