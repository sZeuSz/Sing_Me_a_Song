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
      .required()
      .messages({
        'string.base': 'youtubeLink precisa ser do tipo texto',
        'string.empty': 'youtubeLink precisa estar preenchido',
        'any.required': 'campo youtubeLink é obrigatório',
      }),
});

export {
  validSongSchema,
};
