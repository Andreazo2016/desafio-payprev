'use strict'

const axios = use('axios');
const { validate } = use('Validator');
const UserGithub = use('App/Models/UserGithub');


class AdminController {

    async findUserGitHub({ params, auth, response }) {

        if (auth.user.role === 'ADMIN') {
            const { username } = params;
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const { data } = response;
            return data;
        }
        return response.status(401).send({ error: 'Usuario comun não realizar essa operação' });

    }

    async store({ request, auth, response }) {
        const rules = {
            username: 'required'
        }
        const messages = {
            'username.required': 'Você deve informar um username'
        }

        const validation = await validate(request.all(), rules, messages);

        if (validation.fails()) {
            return validation.messages();
        }

        if (auth.user.role === 'ADMIN') {
            const { username } = request.post();

            const response = await axios.get(`https://api.github.com/users/${username}`);
            const { data } = response;

            const { login, name, bio, location, html_url } = data;


            const userCreated = await UserGithub.findOrCreate({ login }, { login, name, bio, location, html_url });

            return userCreated;

        }

        return response.status(401).send({ error: 'Usuario comun não realizar essa operação' });


    }
}

module.exports = AdminController
