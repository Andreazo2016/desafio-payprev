# Desafio PayPrev

API foi desenvolvida usando AdonisJS com banco de dados Postgresql.

## Documentação

### Rotas 
### Registra-se
- `POST  /register`. <br/> 
    Request: 
  ```json
    {
        "email":"",
        "password":"",
        "cpf":"",
        "role":""
    }
    ```
    Response: 
     ```json
     {
        "email":"",
        "password":"",
        "cpf":"",
        "role":""
    }
    ```
### Loga-se
- `POST /authenticate`. <br/>
  Request:
    ```json
    {
        "email":"",
        "password":""
    }
    ```
    Response
    ```json
    {
        "type": "",
        "token": "",
        "refreshToken": ""
    }
    ```  
### Procurar usuários direto no github
- `GET /admin/usersGithubApi/:username`

### Salva um usuário do github na API
- `POST /admin/userGithub`. <br/>
 
  Request
    ```json
    {
        "username":""
    }
    ```
    Response
    ```json
    {
        "id": ,
        "login": "",
        "name": "",
        "bio": "",
        "location": "",
        "html_url": "",
        "created_at": "",
        "updated_at": ""
    }
    ```
### Visualizar os usuários adicionados
- `GET /usersGithub`. <br/>
 
    Response
    ```json
    [
     {   
         "id": ,
        "login": "",
        "name": "",
        "bio": "",
        "location": "",
        "html_url": "",
        "created_at": "",
        "updated_at": ""
     }
    ]
    ```
### Criar uma pasta
- `POST /folders `<br />
    Request
    ```json
    {
        "name":""
    }
    ```
    Response
    ```json
    {
        "id":"",
        "name":""
    }
    ```
### Visualizar todas as pastas que o usuario criou
- `GET /folders`
    Response
    ```json
    [
        {
            "id":"",
            "name":""
        }
    ]
    ```
### Visualizar o conteúdo de uma pasta.
- `GET /folders/:idFolder`<br />
    Response
    ```json
    [
        {
            "id":"",
            "user_github":{},
            "tags":{ "tags":[]}
        }
    ]
    ```
### Editar o nome da pasta
- `PUT /folders/:idFolder` <br />
    Request
    ```json
    {
        "name":""
    }
    ```
    Response
    ```json
    {
            "id":"",
            "name":""
    }
    ```
### Remover uma pasta
- `DELETE /folders/:idFolder` <br />

### Adicionar um usuario github na pasta
- `POST /folderUser` <br />
  Request
  ```json
  {
      "idFolder":"",
      "idUser":""
  }
  ```
    Response
    ```json
    {
            "id":"",
            "user_github":{},
            "tags":{ "tags":[]}
    }
    ```
### Adicionar uma Tag a um usuário dentro de uma pasta
- `POST /tag` <br />
    Request
    ```json
    {
        "idItem":"",
        "tag":""
    }
    ```
