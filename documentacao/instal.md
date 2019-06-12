# Instalação

Inclusão da biblioteca via HTML e inicialização da mesma:	

```html
<script src="../atlas-engine/dist/atlas.build.js"></script>
<script>
    new AtlasCtor({ /* objeto de configuracao */ });
</script>
```



## Configuração: 

Para configuração da 'engine', AtlasCtor recebe como parametro um objeto com os seguintes e possíveis argumentos de configuração: 

exemplo:

```json
{
        "name": "portifolho",
        "id": "atlas-body",
        "index": "/index",
        "master": {
            "url": "./html/master.html",
            "idInsert": "master"
        },
        "securyte": {
            "key" : "123" , 
            "in"  : "securyte.encrypt",
            "out" : "securyte.decrypt",
            "cfg" : {
                "on": "AES",
                "key": "123",
                "enc": "Utf8"
            }
        },
        "root": "http://localhost:3000/",
        "modulesJson": "./js/atlas-engine/resources/modules.json",
        "rout": [
            {
                "url": "./html/index.html",
                "autentificacao": false,
                "name": "index",
                "path": "/index",
                "title": "home"
            }
        ],
        "required": {
            "scripts": [
                "./vendor/bootstrap/dist/js/bootstrap.js"
            ],
            "links": [
                "./vendor/bootstrap/dist/css/bootstrap.min.css"
            ],
            "partialViews": [
                {
                    "view": "./html/partialViews/commom.html",
                    "name": "commom",
                    "ids": [
                        "card"
                    ]
                }
            ]
        }
    }
```



### Nome do projeto:

Nome da aplicação:

```json
{ "name": "portifolho"}
```



### Master Page

Master pages . É possível usar master pages. 

- url recebe a onde a 'engine' ira fazer a requisição para recuperar o HTML da master page. idInsert 
- ID do elemento DOM a onde será inserido a master page:

```
{
	"master": {
    	"url": "./html/master.html",
        "idInsert": "master"
 	} 
 }
```



### ID Elemento

Elemento principal onde a 'engine' ira manipular o HTML armazenado em memória. Caso se utilizado uma master page, o id deve ficar condito dentro da master page.

```json
{ "id": "atlas-body" }
```



### Index

Primeira página onde a 'engine' ira exibir na tela. "/index" path que representa url da view na memória:  

```json
{ "index": "/index" }
```



### Rotas e Views 

Rotas recebe um array que contém todas as views que seram carregadas para a memória:

- url: onde a 'engine' ira fazer a requisição para recuperar o HTML da view.
- autentificacao: uso futuro.
- name: nome da view.
- path: a url da view na url do browser. uso como browser ira cair na view.
- title: titulo do page/view .

```json
{
	"rout": [
            {
                "url": "./html/index.html",
                "autentificacao": false,
                "name": "index",
                "path": "/index",
                "title": "home"
            }
        ]
}
```



### Required

Requeired recebe um objeto com três parâmetros de configuração scripts, links e partialViews.

script  e links recebem um array de string cada, que contem o 'src' a serem inseridos na página.

PartialViews recebe um array de objeto de configuração para as partialView:

- view: url na qual a 'engine' ira recuperar o HTML da partialVIew.
- name: o nome da partialView.
- ids: os ids que serão segregados os seus respectivos elementos em módulos dentro da partialview.

```json
{
	"required": {
            "scripts": [
                "./vendor/bootstrap/dist/js/bootstrap.js"
            ],
            "links": [
                "./vendor/bootstrap/dist/css/bootstrap.min.css"
            ],
            "partialViews": [
                {
                    "view": "./html/partialViews/commom.html",
                    "name": "commom",
                    "ids": [ "card" ]
                }
            ]
    	}
}
```



### Securança

Configuração para função de criptografia.

- Key recebe a chave de criptografia
- in recebe uma função de criptograia
- out recebe uma função de descriptografia
- cfg recebe um objeto de configuração para criptografia/descriptografia.

```json
{ 
	"securyte": {
    	"key" : "123" , 
        "in"  : "securyte.encrypt",
        "out" : "securyte.decrypt",
        "cfg" : {
        	"on": "AES",
            "key": "123",
            "enc": "Utf8"
        }
   }
}
```



### Root url

Url root da aplicação. Urls são formatadas por padrão quando são './url' ou '/url' para urlRoot + './url'.

Uso caso, a aplicação seja executada fora do servidor nativo da aplicação. 

```json
{ "root": "http://localhost:3000/" }
```



### Módulos externos

Possível configurar e importar módulos externos:

```json
{ "modulesJson": "./js/atlas-engine/resources/modules.json" }
```

 

