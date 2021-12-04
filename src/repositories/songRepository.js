/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import '../setup/setup.js';
import connection from '../database/database.js';

async function insertRecommendation(name, youtubeLink) {
  await connection.query('INSERT INTO songs (name, youtube_link) VALUES ($1, $2)', [name, youtubeLink]);
}

export {
  insertRecommendation,
};
