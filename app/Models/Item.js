'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
    userGithub(){
        return this.hasOne('App/Models/UserGithub');
    }
}

module.exports = Item
