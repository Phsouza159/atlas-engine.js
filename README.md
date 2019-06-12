# Atlas Engine

Atlas engine, é uma biblioteca de **estudos pessoal** sobre javascript e manipulação de elementos na árvore DOM.

## objetivo:

A ideia da biblioteca é da suporte a aplicações web, através de uma arquitetura SPA( single page aplication), juntamente com algumas funções nativas da biblioteca com chamadas através de data-atributos no HTML via javascript.

novamente, **uma biblioteca de estudos**.



## Funcionamento:

Atlas-engine para um suporte SPA, faz requisições GET em páginas HTML e recupera este HTML e armazena em memória. Uma vez todo as página do sistema em memória, a 'engine' fica responsável por atualizar/substituir o HTML correspondente na tela pelo HTML armazenado em memória, eliminando a necessidade de fazer uma nova requisição, atualização e/ou redirecionamento de tela (características de uma SPA).



Demais arquivos (CSS , JS , less e etc), inseridos via inserte no DOM.



Módulos: a 'engine' da suporte a modularização de componentes HTML gerando assim, reaproveitamento de código.



Funções: A biblioteca da 'engine' possui funções nativas, com chamadas através de data-atributos no HTML via javascript.

são funções nativas:

- Requisições GET/POST. Possível fazer requisições POST com criptografia, conforme configuração.
- Condicionais (IF).
- Laços de repetição ( for(arg1 , arg2 , ar3) ou for(var ag1 of ag2 )).
- Criação de objetos com base em um formulário, assim como alimentação deste.



Possível executar aplicação fora do servidor nativo. jogando toda aplicação para o front-end do usuário.







