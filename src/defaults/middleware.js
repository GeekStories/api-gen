const defaultMiddleware = `
    const { celebrate, Joi, errors, Segments } = require("celebrate");
    const _validation = {
        GET: celebrate({
            [Segments.BODY]: Joi.object().keys({
                authorName: Joi.string().max(100).required(),
                title: Joi.string().max(100).required(),
                pubDate: Joi.date().required(),
                publisher: Joi.string().max(100).required(),
                genre: Joi.string().max(100).required(),
            }),
            [Segments.PARAMS]: Joi.object().keys({
                authorName: Joi.string().max(100).required(),
                title: Joi.string().max(100).required(),
                pubDate: Joi.date().required(),
                publisher: Joi.string().max(100).required(),
                genre: Joi.string().max(100).required(),
            }),
        }),
        POST: celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                authorName: Joi.string().max(100).required(),
                title: Joi.string().max(100).required(),
                pubDate: Joi.date().required(),
                publisher: Joi.string().max(100).required(),
                genre: Joi.string().max(100).required(),
            }),
        })
    }

    export default _validation;
    `;

export default defaultMiddleware;
