
# Projeto Clone Github
##### Este projeto foi desenvolvido para um teste.



[Documentação com docsify]([https://git-scm.com](https://nadodev.github.io/docs_project/)). 

### Algumas Observação.
- Esta aplicação foi construída com base na API do GitHub. No entanto, a API do GitHub tem um limite de requisições e, para evitar o problema de às vezes não aparecer nada na tela, pensei em usar uma estratégia de cache. Como é apenas frontend, a única forma possível foi salvando no armazenamento local (localStorage). Assim, ele salva todas as informações no armazenamento local e depois as exibe na tela.

- Foi apenas exibido 30 Repositórios e 30 Starred.
- Os Filtros type e language, não tem efeito, é apenas o visual.
- O Conteudo do repositório foi escolhido uma modal.
- css e javascript foi minificado pensando na performace do aplicação.

### Features

- Listagem de repositórios
- Listagem das informações do usuário
- Listagem de Starred
- Busca de repositórios, apertando a tecla enter para dar submit
- Tabs para navegar entre os repositórios e os Starred
- Modal
- Janela lateral para filtros


### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)


### 🎲 Rodando o (servidor)
#### Clone este repositório
```bash
git clone https://github.com/nadodev/github-project.git
```
#### Acesse a pasta do projeto no terminal/cmd
```bash
cd github-project
```
#### Instale as dependências
```bash
npm install
```
#### Execute a build da aplicação 

```bash
npm run build
```

#### Execute a aplicação em modo de desenvolvimento
```bash
npm run dev
```

#### O servidor inciará na porta:5173 - acesse <http://localhost:5173>

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [vitejs](https://vitejs.dev/guide/)
- [Node.js](https://nodejs.org/en/)
- [scss](https://sass-lang.com/)
- [hrml](https://developer.mozilla.org/pt-BR/docs/Web/html)
- [javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

