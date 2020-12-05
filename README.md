# hackaton1-backend

### Banco de dados criado para armazenar novas músicas

# Principais funcionalidades :earth_asia:

 #### Acesso sem estar logado:
 - [x] Cadastrar usuário.
 - [x] Fazer login.
 
 #### Restrito a usuários logado:
 
 - [x] Procurar por produtos.
 - [x] Ver a lista de varejos.
 
 ### Restrito a vendedores logados:
 - [x] Cadastrar varejo.
 - [x] Criar/publicar um novo produto.
 - [x] Pegar varejo pelo cnpj.
 
# Rodando a aplicação :computer:
 - [x] Clonando o projeto 
 ```bash
  git clone https://github.com/Martthus/hackaton1-backend.git 
 ```
 - [x] Acessando a pasta onde contem a raiz do projeto: /hackaton1-backend
 ```bash
  cd hackaton1-backend
 ```
 - [x] Instalando as dependências
 ```bash
  npm i
 ```
 - [x] Por fim executando a aplicação
 ```bash
  npm run dev
 ```
# Endpoints disponíveis:

### SIGNUP :clipboard:
  ```node
    POST http://localhost:3003/user/signup
      Authorization: none
      Content-Type: application/json

  {
	  "name": "Felipe",
	  "cpf": "01.594.651-13",
	  "email": "Fel@not.com",
	  "password": "123456789",
	  "role": "ADMIN"
  }
 ```

### LOGIN :busts_in_silhouette:
```node
    POST http://localhost:3003/user/login
      Authorization: none
      Content-Type: application/json

  {
      "email": "Fel@not.com",
      "password": "123456789"
  }
 ```

### NEW RETAIL :notes:
 ```node
    POST http://localhost:3003/retail/new
      Authorization: token de autorização / ex: "qbfq@%ffw6sdf342¨@%#&sfsw52342¨@%f6125f"
      Content-Type: application/json

  {
      "name": "Varejo Flórida",
      "cnpj": "48.486.997/0001-68",
      "cep": "16832248",
      "address": "R. Xavantes, 632, SP"
   }
 ```
 
 ### GET ALL RETAILS :musical_score:
  ```node
      GET http://localhost:3003/retail/all
        Authorization: token de autorização / ex: "qbfq@%ffw6sdf342¨@%#&sfsw52342¨@%f6125f"
        Content-Type: application/json
  ```
  
 ### GET RETAIL BY CNPJ :musical_score:
  ```node
      GET http://localhost:3003/retail/search?cnpj={{cnpj}}
        Authorization: token de autorização / ex: "qbfq@%ffw6sdf342¨@%#&sfsw52342¨@%f6125f"
        Content-Type: application/json
  ```
