/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import * as songControllers from './controllers/songController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendations', songControllers.postRecommendationSong);

export default app;
