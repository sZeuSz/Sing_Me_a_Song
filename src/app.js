/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import * as songControllers from './controllers/songController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendations', songControllers.postRecommendationSong);
app.post('/recommendations/:id/upvote', songControllers.postUpVoteRecommendationSongById);
app.post('/recommendations/:id/downvote', songControllers.postDownVoteRecommendationSongById);

app.get('/recommendations/random', songControllers.getRecommendationRandom);
export default app;
