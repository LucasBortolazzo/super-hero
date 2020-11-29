# Gestão de Super Heróis com Angular e Django Rest Framework

Plataforma para gestão de Super Heróis utilizando Angular para o front-end e Django Rest Framework para a construção da api back-end.

## Features

1. Inclusão, alteração e exclusão de super heróis
2. Pesquisa de super heróis
3. Criação de lista de super heróis favoritos
4. Validação de campos feitas com javascript
5. Paginação server side(rest_framework.pagination, PAGE_SIZE: 10)
6. Inclusão de e alteração arquivos de mídia
7. Mensagens de notificações(sweetalert2)
8. Endpoints cobertos por testes
9. Design responsivo(PC, celular, tablet, notebook)


## Demonstration

Front-end: https://super-hero-angular.herokuapp.com/

Back-end: https://api-heroes-v1.herokuapp.com/heroes/

## Installation

1- git clone https://github.com/LucasBortolazzo/super-hero.git

### Front-end

2. cd '..heroes/heroes-frontend'
3. run ng build
4. run ng serve
5. access: "http://localhost:4200/".

### Back-end

2. create a Python virtualenv and activate
3. cd '..heroes/heroes-backend'
4. run pip install -r requirements.txt
5. run python manage.py migrate
6. run python manage.py runserver
7. access: "http://localhost:8000/".