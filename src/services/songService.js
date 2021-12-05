/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import * as songRepository from '../repositories/songRepository.js';

export async function insertRecommendation(name, youtubeLink) {
  await songRepository.insertRecommendation(name, youtubeLink);
}

export async function upVoteRecommendationSongById(id) {
  const result = await songRepository.upVoteRecommendationSongById(id);

  return Boolean(result);
}

export async function downVoteRecommendationSongById(id) {
  const score = await songRepository.getScoreById(id);

  if (!score) {
    return null;
  }

  if (score.score <= -4) {
    await songRepository.deleteRecommendationSongByID(id);

    return true;
  }

  const result = await songRepository.downVoteRecommendationSongById(id);

  return Boolean(result);
}
