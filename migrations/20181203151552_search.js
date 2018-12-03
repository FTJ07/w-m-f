const knex = require('../knex');
exports.up = function(knex, Promise) {
    return knex.schema.createTable('search', (table) => {
        table.increments('searchId')
        table.integer('locationId')
        table.integer('mosqueId')
        table.string('locationName')
      })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('search')
};
