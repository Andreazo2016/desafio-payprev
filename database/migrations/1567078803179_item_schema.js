'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up () {
    this.create('items', (table) => {
      table.increments()
      table.integer('folder_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('folders')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.json('user_github')
      table.json('tags')
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemSchema
