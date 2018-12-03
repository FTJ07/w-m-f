const knex = require('../knex');

exports.up = function(knex, Promise) {
   return knex.schema.createTable('location', (table) => {
        table.increments('locationId')
        table.string('locationName',100)
      })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('location')
};
