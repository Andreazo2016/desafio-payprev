'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with usergithubs
 */

const UserGithub = use('App/Models/UserGithub');

class UserGithubController {
  /**
   * Show a list of all usergithubs.
   * GET usergithubs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, response }) {
    if (auth.user.role === 'COMUN') {
      const users = await UserGithub.all();
      return users;
    }
    return response.status(401).send({ message: 'Você não está autorizado para essa operação.' })
  }
}

module.exports = UserGithubController
