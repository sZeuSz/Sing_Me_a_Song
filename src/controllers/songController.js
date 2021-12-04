/* eslint-disable import/prefer-default-export */
// import { validSongSchema } from '../schemas/songSchemas.js';
import { validSongSchema } from '../schemas/songSchemas.js';
import * as songService from '../services/songService.js';

export async function postRecommendationSong(req, res) {
  const {
    name,
    youtubeLink,
  } = req.body;

  if (!name || !youtubeLink) {
    return res.status(400).send({ message: 'Os campos name e youtubeLink precisam estar definidos' });
  }
  try {
    const { error } = validSongSchema.validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    await songService.insertRecommendation(name, youtubeLink);

    return res.status(200).send({ message: 'Recomendação inseria com sucesso' });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
