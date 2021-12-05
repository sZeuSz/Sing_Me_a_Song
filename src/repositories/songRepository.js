/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import '../setup/setup.js';
import connection from '../database/database.js';

export async function insertRecommendation(name, youtubeLink) {
  await connection.query('INSERT INTO songs (name, youtube_link) VALUES ($1, $2)', [name, youtubeLink]);
}

export async function upVoteRecommendationSongById(id) {
  const result = await connection.query('UPDATE songs SET score = score + 1 WHERE id = $1 RETURNING id', [id]);
  return result.rowCount;
}

export async function getScoreById(id) {
  const result = await connection.query('SELECT score FROM songs where id = $1', [id]);
  return result.rows[0];
}

export async function downVoteRecommendationSongById(id) {
  const result = await connection.query('UPDATE songs SET score = score - 1 WHERE id = $1 RETURNING id', [id]);
  return result.rowCount;
}

export async function deleteRecommendationSongByID(id) {
  const result = await connection.query('DELETE FROM songs WHERE id = $1 RETURNING id', [id]);

  return result.rows;
}
