'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserGithubSchema extends Schema {
  up () {
    this.create('user_githubs', (table) => {
      table.increments()
      table.string('login',30).notNullable()
      table.string('name',100).notNullable()
      table.string('bio',255)
      table.string('location',255)
      table.string('html_url',255)
      table.timestamps()
    })
  }

  down () {
    this.drop('user_githubs')
  }
}

module.exports = UserGithubSchema
