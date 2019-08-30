'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with folders
 */

const Folder = use('App/Models/Folder');
const User = use('App/Models/User');
const UserGithub = use('App/Models/UserGithub');


class FolderController {
  /**
   * Show a list of all folders.
   * GET folders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const userLogged = await User.find(auth.user.id);
    const myFolders = await userLogged.folders().fetch();
    return myFolders;
  }


  /**
   * Create/save a new folder.
   * POST folders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request,response, auth }) {
    const data = request.only(['name']);
    try {
      const folder = await Folder.create({ user_id: auth.user.id, ...data });
      return folder;

    } catch (error) {
      return response.status(500)
      .send({error:'Não foi possível criar uma pasta. Tente novamento mais tarde.'})
    }

  }

  /**
   * Display a single folder.
   * GET folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  async show({ params, request, response, view }) {
    const { id } = params;
    try {
      const folder = await Folder.findOrFail(id);
      const item = await folder.items().fetch();
      return item;

    } catch (error) {
      return response.status(500)
        .send({ error: `Não existe pasta com id = ${id}` })
    }

  }

 
  /**
   * Update folder details.
   * PUT or PATCH folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params;
    const { name } = request.post();

    try {

      const folder = await Folder.findOrFail(id);

      folder.name = name;

      folder.save();

      return folder;

    } catch (error) {
      return response.status(500).send({ error: `Não foi possível atualizar a pasta com id = ${id}` });
    }

  }

  /**
   * Delete a folder with id.
   * DELETE folders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response }) {
    const { id } = params;
    try {
      const folder = await Folder.findOrFail(id);
      await folder.delete();

    } catch (error) {

      return response.status(500).send({ error: `Não foi possível remover o pasta com id = ${id}` });

    }
    return response.status(200).send({ message: 'Pasta removida com sucesso. :)' });
  }
}

module.exports = FolderController
