const knex = require('../knex');
exports.up = function(knex, Promise) {
    return knex.schema.createTable('mosque', (table) => {
        table.increments('mosqueId')
        table.string('mosqueName',100)
        table.string('mosqueDetails',250)
      })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('mosque')
};
