'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with folderusergithubs
 */

const Folder = use('App/Models/Folder');
const UserGithub = use('App/Models/UserGithub');
const Item = use('App/Models/Item');

class FolderUserGithubController {
 

 

  /**
   * Create/save a new folderusergithub.
   * POST folderusergithubs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const { idFolder, idUser } = request.post();
    const folder = await Folder.findOrFail(idFolder);
    const userGithub = await UserGithub.findOrFail(idUser);
  
    const items = await folder.items().fetch();
    const { rows } = items;

    /**Verificar se já existe o usuário adicionado na mesma pasta */
    const item = rows.map(item => {
      const { user_github } = item;
      if( user_github.id === idUser ){
        return item;
      }

    });

    if( item.length !== 0 ){
      return item;
    }
    
    /**Verifica se o usuário é dono da pasta para poder adicionar nela um novo usuário */
    if (folder.user_id === auth.user.id) {
        const item = await Item.create({ folder_id: folder.id, user_github: userGithub,tags:{ tags:[] } })
        return item;
    }
    return response.status(500).send({ error: 'Você não é dono desta pasta.' });
  }


  /**
   * Delete a folderusergithub with id.
   * DELETE folderusergithubs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { idItem } = params;
    const itemForRemove = await Item.findOrFail(idItem);

    await itemForRemove.delete();

    return response.status(200); 
  }
}

module.exports = FolderUserGithubController
