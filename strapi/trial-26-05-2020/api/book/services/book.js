'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  find(params, populate) {
    return strapi.query('book').find(params, populate);
  },

  search(params) {
    return strapi.query('book').search(params);
  },

  countSearch(params) {
    return strapi.query('book').countSearch(params);
  },

  findOne(params, populate) {
    return strapi.query('book').findOne(params, populate);
  },

  count(params) {
    return strapi.query('book').count(params);
  },

  async create(data, { files } = {}) {
    const entry = await strapi.query('book').create(data);

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'book',
        // if you are using a plugin's model you will have to add the `plugin` key (plugin: 'users-permissions')
      });
      return this.findOne({ id: entry.id });
    }

    return entry;
  },

  async update(params, data, { files } = {}) {
    const entry = await strapi.query('book').update(params, data);

    if (files) {
      // automatically uploads the files based on the entry and the model
      await strapi.entityService.uploadFiles(entry, files, {
        model: 'book',
        // if you are using a plugin's model you will have to add the `plugin` key (plugin: 'users-permissions')
      });
      return this.findOne({ id: entry.id });
    }

    return entry;
  },

  delete(params) {
    return strapi.query('book').delete(params);
  },
};
