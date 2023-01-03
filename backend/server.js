import express from "express";
import colors from "colors";
import cors from 'cors';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import moduleRoutes from "./routes/moduleRoutes.js";

dotenv.config()
connectDB()

const port = process.env.port || 8000;

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors());

app.use('/api/modules', moduleRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));

