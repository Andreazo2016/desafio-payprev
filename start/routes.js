'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**Rota para registra-se */
Route.post('/register', 'AuthController.register');
/**Rota para autentica-se */
Route.post('/authenticate', 'AuthController.authenticate');

Route.group(() => {
  /**Rota para o usuário admin pesquisar usuario direto no github */
  Route.get('/usersGithubApi/:username', 'AdminController.findUserGitHub');
  /**Rota para o usuário admin cadastrar um usuario do github */
  Route.post('/userGithub', 'AdminController.store');

}).middleware('auth').prefix('/admin')

Route.group(() => {

  /**Rota para a criação, edição e exclusão de pastas */
  Route.resource('folders', 'FolderController')
    .validator(new Map([
      [['folders.store'], ['StoreFolder']],
    ]))
    .apiOnly();


  /**Rota para o usuário comun possa ver os usuários cadastrados pelo admin do github */
  Route.get('/usersGithub', 'UserGithubController.index');


  /**Rota para adicionar um usuário a uma pasta */
  Route.post('/folderUser', 'FolderUserGithubController.store');


  /**Rota para adicionr tags a um usuário */
  Route.post('/tag', 'TagController.store');


}).middleware('auth');




