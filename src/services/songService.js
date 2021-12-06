/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* istanbul ignore else */
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
  if (!Math.abs(score)) {
    return null;
  }

  const result = await songRepository.downVoteRecommendationSongById(id);

  if ((await songRepository.getScoreById(id))?.score < -5) {
    await songRepository.deleteRecommendationSongByID(id);

    return true;
  }

  return Boolean(result);
}

export async function getRecommendationsAmount() {
  const result = await songRepository.getRecommendationsAmount();

  return result;
}

export async function getRecommendationRandomly() {
  const above = await songRepository.getAboveRecommendation();
  const between = await songRepository.getBetweenRecommendation();

  let result;
  if ((above && !between) || (!above && between)) {
    result = await songRepository.getRecommendationRandomly();
  } else if (!above && !between) {
    return null;
  } else if (Math.random() <= 0.7) {
    result = await songRepository.getRecommendationsRandomlyAbove();
  } else {
    result = await songRepository.getRecommendationRandomlyBetween();
  }

  return result;
}

export async function recommendationTop(amount) {
  const result = await songRepository.getRecommendationTop(amount);

  return result;
}
