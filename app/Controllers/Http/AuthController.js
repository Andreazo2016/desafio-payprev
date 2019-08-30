'use strict'

const { validate } = use('Validator');

const User = use('App/Models/User');

class AuthController {

    isValidoCPF(cpf) {
        var numeros, digitos, soma, i, resultado, digitos_iguais;
        digitos_iguais = 1;
        if (cpf.length < 11)
            return false;
        for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                digitos_iguais = 0;
                break;
            }
        if (!digitos_iguais) {
            numeros = cpf.substring(0, 9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;
            numeros = cpf.substring(0, 10);
            soma = 0;
            for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;
            return true;
        }
        else
            return false;
    }

    async register({ request, response }) {
        const rules = {
            email: 'required|email|unique:users,email',
            password: 'required',
            cpf: 'required|unique:users,cpf',
            role: 'required|in:ADMIN,COMUN'
        }

        const messages = {
            'email.required': 'Você deve informar um email',
            'email.email': 'Informe um email válido.',
            'email.unique': 'Email já existente',
            'cpf.unique': 'Cpf já existente',
            'cpf.required': 'Você deve informar um cpf',
            'role.required': 'Você deve informar o tipo do usuario',
            'role.in': 'O usuário deve informar se é ADMIN OU COMUN',
            'password.required': 'Você deve informar uma senha'
        }

        const validation = await validate(request.all(), rules, messages);
        if (validation.fails()) {
            return validation.messages();
        }

        const data = request.only(['email', 'password', 'role', 'cpf']);

        if (!this.isValidoCPF(data.cpf)) {
            return response.status(500)
                .send({ message: 'Cpf inválido.' })
        }
        try {

            const user = await User.create(data);
            return user;

        } catch (error) {
            return error;
        }
    }

    async authenticate({ request, response, auth }) {
        const { email, password } = request.post();
        try {
            const tokenAcess = await auth.attempt(email, password);
            return tokenAcess;
        } catch (error) {
            return response.status(500)
                .send({ error: 'Email ou senha incorreta. Tente novamente.' })
        }


    }
}

module.exports = AuthController
