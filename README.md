<p align=center>
    <img src="src/assets/gofit_logo_white.svg" width="200">
</p>

## Introdução

O GO!FIT System é uma solução de gerenciamento projetada para atender às necessidades dos instrutores de academia. O sistema foi desenvolvido com o objetivo de simplificar e otimizar as tarefas diárias desses profissionais, tornando o processo de gerenciamento de alunos, treinos e exercícios em uma experiência organizada e eficiente.

## Demo

A demonstração pode ser acessada através do link:

https://gofitsystem.vercel.app

Para acessar o sistema você pode utilizar o login de visitante:

```
email: guest@admin.com
senha: 12345678
```

Ou se cadastrar através da [página signup](https://gofitsystem.vercel.app/signup).

**Atenção: Como o vercel possui armazenamento efêmero, os dados cadastrados são temporários.**

<p align=center>
<img src= "mockup.png" height="400">
</p>

## Dependências do sistema

- npm 9.5.1
- node v18.16.1
- vue: 3.3.4

### Configuração IDE recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Setup local

### Back-end

Navegue até o diretório onde o projeto back-end se encontra.

Execute os comandos:

```bash
npm install
npm run start
```

API pode ser acessada através de http://localhost:3000.

### Front-end

#### Clone o projeto

```bash
git clone https://github.com/CarolineSampaio/projeto-final-modulo1
cd projeto-final-modulo1
```

#### Instale as dependências

```bash
npm install
```

#### Compila e inicializa o servidor de desenvolvimento

```sh
npm run dev
```

#### Compila e minifica para produção

```sh
npm run build
```

#### Formata código com [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Melhorias

- **Implementar testes unitários**: A aplicação, embora tenha sido testada manualmente, pode se beneficiar da criação de testes unitários automatizados com o Cypress, pois garantiria uma verificação E2E de todas as funcionalidades, contribuindo para a robustez e a detecção de problemas.

- **Aprimorar o comportamento da API em relação às datas:** A estrutura da API separa os dados com base nos dias da semana, limitando a capacidade de manter informações consistentes após uma semana de uso.
- **Confirmação de execução de exercícios:** Atualmente, a API não fornece informações sobre se um exercício já foi realizado ou não, em um determinado dia.
- **Localizar aluno diretamente via API:** O projeto foi desenvolvido com base na busca de um aluno em uma lista de alunos, porém em cenários com grande quantidade de usuários, isso pode causar lentidão na aplicação.
- **Implementar separação de alunos por instrutor:** Atualmente, a API não diferencia os cadastros de alunos com base nos instrutores, resultando no compartilhamento de informações de todos os alunos entre todos os instrutores cadastrados no backend.

- **Habilitar edição e remoção de dados:** No momento, após cadastrar um usuário, aluno, exercício ou treino, não existe a opção de editar ou remover esses dados. Em um contexto real, é crucial permitir essas modificações para manter a flexibilidade e precisão das informações.
- **Adicionar acompanhamento de progresso do aluno:** O sistema atual não oferece uma funcionalidade para acompanhar o progresso dos alunos, que seria importante para otimizar treinos e metas.
- **Lista de exercícios comuns:** Disponibilizar os exercícios mais comuns previamente no sistema, de modo a otimizar o processo de cadastro de exercícios e treinos.
- **Cadastro simplificado de séries:** Implementar opção para definir a quantidade de séries para cada exercício, eliminando a necessidade de cadastrar o mesmo exercício repetidas vezes, já que é comum realizar 3 ou mais séries do mesmo exercício em uma única sessão de treino.
