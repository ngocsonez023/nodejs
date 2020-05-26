'use strict';
const { sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.book.search(ctx.query);
    } else {
      entities = await strapi.services.book.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.book }));
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.book.findOne({ id });
    return sanitizeEntity(entity, { model: strapi.models.book });
  },

  count(ctx) {
    if (ctx.query._q) {
      return strapi.services.book.countSearch(ctx.query);
    }
    return strapi.services.book.count(ctx.query);
  },

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.book.create(data, { files });
    } else {
      entity = await strapi.services.book.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.book });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.book.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.book.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.book });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.book.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.book });
  },
};
