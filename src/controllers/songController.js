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

export async function postUpVoteRecommendationSongById(req, res) {
  const { id } = req.params;

  if (!Number(id)) {
    return res.status(400).send({ message: 'O parametro passsado precisa ser um inteiro' });
  }

  try {
    const voted = await songService.upVoteRecommendationSongById(id);

    if (!voted) {
      return res.status(404).send({ message: 'Recomendação não encontrada' });
    }

    return res.status(200).send({ message: 'Votou com sucesso' });
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function postDownVoteRecommendationSongById(req, res) {
  const { id } = req.params;

  if (!Number(id)) {
    return res.status(400).send({ message: 'O parametro passsado precisa ser um inteiro' });
  }

  try {
    const voted = await songService.downVoteRecommendationSongById(id);

    if (!voted) {
      return res.status(404).send({ message: 'Recomendação não encontrada' });
    }

    return res.status(200).send({ message: 'Votou com sucesso' });
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getRecommendationRandom(req, res) {
  try {
    const existMusic = await songService.getRecommendationsAmount();

    if (!existMusic) {
      return res.status(404).send({ message: 'Desculpe, não há nenhuma recomendação cadastrada no momento' });
    }

    const song = await songService.getRecommendationRandomly();

    return res.status(200).send(song);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function getRecommendationTop(req, res) {
  const { amount } = req.params;

  if (!amount) {
    return res.status(404).send({ message: 'A quantidade tem que ser positiva e definida' });
  }

  try {
    const songs = await songService.recommendationTop(amount);

    if (!songs.length) {
      return res.status(404).send({ message: 'Desculpe, não há nenhuma recomendação cadastrada no momento' });
    }
    return res.status(200).send(songs);
  } catch (error) {
    return res.sendStatus(500);
  }
}
