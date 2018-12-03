const knex = require('../knex');

exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', (table) => {
        table.increments('userId')
        table.string('userName')
        table.string('userEmail')
        table.string('userPhone')
        table.string('userPassword')
      })
};

exports.down = function(knex, Promise) {
    knex.schema.dropTableIfExists('user')
};
