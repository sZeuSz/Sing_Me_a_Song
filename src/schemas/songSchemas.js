/* eslint-disable no-useless-escape */
/* eslint-disable import/prefer-default-export */
import joi from 'joi';

const validSongSchema = joi.object({
  name:
    joi.string()
      .required()
      .messages({
        'string.base': 'name precisa ser do tipo texto',
        'string.empty': 'nome precisa estar preenchido',
        'any.required': 'campo name é obrigatório',
      }),
  youtubeLink:
    joi.string()
      .regex(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)
      .required()
      .messages({
        'string.base': 'youtubeLink precisa ser do tipo texto',
        'string.empty': 'youtubeLink precisa estar preenchido',
        'any.required': 'campo youtubeLink é obrigatório',
        'string.pattern.base': 'campo youtubeLink deve ser um link do youtube',
      }),
});

export {
  validSongSchema,
};
