const knex = require('../knex');
exports.up = function(knex, Promise) {
    return knex.schema.createTable('search', (table) => {
        table.increments('searchId')
        table.string('searchTag')
        table.integer('mosqueId')
        table.integer('locationId')
      })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('search')
};
