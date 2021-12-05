/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import * as songRepository from '../repositories/songRepository.js';

export async function insertRecommendation(name, youtubeLink) {
  await songRepository.insertRecommendation(name, youtubeLink);
}

export async function upVoteRecommendationSong(id) {
  const result = await songRepository.upVoteRecommendationSong(id);

  return Boolean(result);
}
