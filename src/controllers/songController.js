/* eslint-disable import/extensions */
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
    return res.sendStatus(500);
  }
}

export async function postUpVoteRecommendationSong(req, res) {
  const { id } = req.params;

  if (!Number(id)) {
    return res.status(400).send({ message: 'O parametro passsado precisa ser um inteiro' });
  }

  const voted = await songService.upVoteRecommendationSong(id);

  if (!voted) {
    return res.status(404).send({ message: 'Recomendação não encontrada' });
  }

  return res.status(200).send({ message: 'Votou com sucesso' });
}
