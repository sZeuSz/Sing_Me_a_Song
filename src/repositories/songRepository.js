/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import '../setup/setup.js';
import connection from '../database/database.js';

export async function insertRecommendation(name, youtubeLink) {
  await connection.query('INSERT INTO songs (name, youtube_link) VALUES ($1, $2)', [name, youtubeLink]);
}

export async function upVoteRecommendationSong(id) {
  const result = await connection.query('UPDATE songs SET score = score + 1 WHERE id = $1 RETURNING id', [id]);
  return result.rowCount;
}
