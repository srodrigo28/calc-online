Git Essencial
Essential Git
100 comandos para seu sucesso
100 commands for your success
Autor: Sebastião Rodrigo Nascimento Sousa


Author: Sebastião Rodrigo Nascimento Sousa

Sobre o Autor
About the Author
Sebastião Rodrigo Nascimento Sousa é um profissional multifacetado com uma sólida base acadêmica e paixão por tecnologia. Com formação em Matemática pela Universidade Vale do Acarú, Análise e Desenvolvimento de Sistemas pela FASAM, e Engenharia de Software pela Estácio, ele possui uma visão ampla e integrada do mundo do desenvolvimento de software.


Sebastião Rodrigo Nascimento Sousa is a multifaceted professional with a solid academic foundation and a passion for technology. With degrees in Mathematics from Universidade Vale do Acarú, Systems Analysis and Development from FASAM, and Software Engineering from Estácio, he has a broad and integrated view of the software development world.

Natural de Aparecida de Goiânia, no coração de Goiás, Brasil, Sebastião equilibra sua dedicação à tecnologia com os valores da família.


A native of Aparecida de Goiânia, in the heart of Goiás, Brazil, Sebastião balances his dedication to technology with family values.

Dedicatória
Dedication
Para minha amada esposa, Briany Cris Sousa Luis, meu pilar e inspiração. E para meus filhos, Edson Emanoel e Valentina, que são a razão do meu futuro e a alegria do meu presente. Que este trabalho seja um pequeno reflexo do amor e da dedicação que aprendo com vocês todos os dias.


For my beloved wife, Briany Cris Sousa Luis, my pillar and inspiration. And for my children, Edson Emanoel and Valentina, who are the reason for my future and the joy of my present. May this work be a small reflection of the love and dedication I learn from you every day.

Introdução: Por que Git?
Introduction: Why Git?
No mundo do desenvolvimento de software moderno, o controle de versão não é um luxo, é uma necessidade absoluta. E quando se fala em controle de versão, o Git é o rei indiscutível. Ele permite que equipes colaborem em projetos complexos, que você rastreie cada mudança em seu código, que experimente novas funcionalidades sem medo e que volte no tempo se algo der errado.


In the world of modern software development, version control isn't a luxury; it's an absolute necessity. And when it comes to version control, Git is the undisputed king. It allows teams to collaborate on complex projects, lets you track every change in your code, experiment with new features without fear, and go back in time if something goes wrong.

Este guia não é um romance. É um manual de campo, um arsenal com 100 comandos e conceitos essenciais que você usará no dia a dia. Nesta edição prática, cada comando é acompanhado por um exemplo real, mostrando o que você digita e o que espera ver no terminal. O objetivo é claro: transformar a teoria em habilidade.


This guide is not a novel. It's a field manual, an arsenal of 100 essential commands and concepts that you will use day-to-day. In this practical edition, each command is accompanied by a real-world example, showing what you type and what you expect to see in the terminal. The goal is clear: to turn theory into skill.

Use este livro como uma referência rápida. Mantenha-o por perto e, com a prática, esses comandos se tornarão uma segunda natureza. Vamos começar.


Use this book as a quick reference. Keep it nearby, and with practice, these commands will become second nature. Let's get started.

Capítulo 1: Configuração Inicial
Chapter 1: Initial Setup
Antes de tudo, você precisa se apresentar ao Git. Esta configuração é feita apenas uma vez por máquina e é fundamental para identificar a autoria dos seus trabalhos.


First of all, you need to introduce yourself to Git. This setup is done only once per machine and is essential to identify the authorship of your work.

1. git config --global user.name "Seu Nome"
O que faz: Define o nome que será exibido como autor em todos os commits que você fizer nesta máquina.


What it does: Sets the name that will be displayed as the author for every commit you make on this machine.

Quando usar: Imediatamente após instalar o Git, antes de fazer qualquer outra coisa.


When to use: Immediately after installing Git, before you do anything else.

Exemplo Prático:


Practical Example:

Bash

# Configurando seu nome de usuário
# Setting up your username
git config --global user.name "Sebastião Rodrigo"
2. git config --global user.email "seu.email@exemplo.com"
O que faz: Define o seu endereço de e-mail, que também é associado a todos os seus commits. É importante usar o mesmo e-mail cadastrado em plataformas como GitHub ou GitLab.


What it does: Sets your email address, which is also associated with all your commits. It's important to use the same email registered on platforms like GitHub or GitLab.

Quando usar: Junto com a configuração do nome de usuário.


When to use: Along with the username setup.

Exemplo Prático:


Practical Example:

Bash

# Configurando seu e-mail
# Setting up your email
git config --global user.email "sebastiao.rodrigo@email.dev"
3. git config --global init.defaultBranch main
O que faz: Configura o nome padrão da branch principal para "main". Historicamente, o padrão era "master", mas "main" é o novo padrão da indústria por ser mais inclusivo.


What it does: Sets the default name for the main branch to "main". Historically, the default was "master", but "main" is the new industry standard for being more inclusive.

Quando usar: É uma boa prática definir isso durante a configuração inicial para manter seus novos projetos alinhados com as convenções modernas.


When to use: It's good practice to set this during the initial setup to keep your new projects aligned with modern conventions.

Exemplo Prático:


Practical Example:

Bash

# Definindo 'main' como a branch padrão
# Setting 'main' as the default branch
git config --global init.defaultBranch main
4. git config --global --list
O que faz: Exibe a lista completa de todas as configurações globais que você definiu.


What it does: Displays the complete list of all the global configurations you have set.

Quando usar: Para verificar se as configurações de nome, e-mail e outras foram salvas corretamente.


When to use: To verify if your name, email, and other settings have been saved correctly.

Exemplo Prático:


Practical Example:

Bash

# Verificando as configurações salvas
# Verifying the saved settings
git config --global --list

# Saída esperada (exemplo):
# Expected output (example):
# user.name=Sebastião Rodrigo
# user.email=sebastiao.rodrigo@email.dev
# init.defaultbranch=main
5. git config --help
O que faz: Abre a documentação oficial e detalhada para o comando config no seu navegador.


What it does: Opens the official and detailed documentation for the config command in your browser.

Quando usar: Quando você quiser saber sobre opções de configuração mais avançadas ou entender um parâmetro específico em profundidade.


When to use: When you want to learn about more advanced configuration options or understand a specific parameter in depth.

Exemplo Prático:


Practical Example:

Bash

# Abrindo a ajuda para o comando config
# Opening the help for the config command
git config --help
# (Seu navegador irá abrir a página de manual do Git)
# (Your browser will open the Git manual page)
Capítulo 2: Iniciando e Clonando Repositórios
Chapter 2: Starting and Cloning Repositories
Agora que você está configurado, é hora de criar um novo projeto ou começar a trabalhar em um existente.


Now that you're set up, it's time to create a new project or start working on an existing one.

6. git init
O que faz: Transforma o diretório atual em um repositório Git. Ele cria uma pasta oculta chamada .git que conterá todo o histórico e a configuração do seu projeto.


What it does: Turns the current directory into a Git repository. It creates a hidden folder called .git that will contain the entire history and configuration of your project.

Quando usar: No início de um projeto novo que ainda não tem controle de versão.


When to use: At the beginning of a new project that doesn't have version control yet.

Exemplo Prático:


Practical Example:

Bash

# Navegue até a pasta do seu novo projeto
# Navigate to your new project's folder
cd ~/Projetos/MeuSite

# Inicie o repositório
# Initialize the repository
git init

# Saída esperada:
# Expected output:
# Initialized empty Git repository in /home/user/Projetos/MeuSite/.git/
7. git init nome-do-diretorio
O que faz: Cria uma nova pasta com o nome especificado e, em seguida, executa git init dentro dela.


What it does: Creates a new folder with the specified name and then runs git init inside it.

Quando usar: Quando você quer criar a pasta do projeto e o repositório Git com um único comando.


When to use: When you want to create the project folder and the Git repository with a single command.

Exemplo Prático:


Practical Example:

Bash

# Estando na pasta ~/Projetos
# Being in the ~/Projetos folder
git init NovoBlog

# Saída esperada:
# Expected output:
# Initialized empty Git repository in /home/user/Projetos/NovoBlog/.git/
8. git clone [url]
O que faz: Cria uma cópia local de um repositório remoto existente. Este é o comando mais comum para começar a trabalhar em um projeto que já está no GitHub, GitLab, etc.


What it does: Creates a local copy of an existing remote repository. This is the most common command to start working on a project that is already on GitHub, GitLab, etc.

Quando usar: Quando você vai contribuir para um projeto existente ou quer baixar uma cópia para estudar.


When to use: When you are going to contribute to an existing project or want to download a copy to study.

Exemplo Prático:


Practical Example:

Bash

# Clonando um projeto do GitHub
# Cloning a project from GitHub
git clone https://github.com/exemplo/projeto-incrivel.git

# Saída esperada:
# Expected output:
# Cloning into 'projeto-incrivel'...
# remote: Enumerating objects: 123, done.
# ...
9. git clone [url] novo-nome
O que faz: Clona o repositório, mas em vez de usar o nome padrão, ele o salva em uma pasta com o nome que você especificar.


What it does: Clones the repository, but instead of using the default name, it saves it into a folder with the name you specify.

Quando usar: Quando o nome padrão do repositório é muito genérico (ex: main) ou você quer dar um nome mais descritivo ao projeto na sua máquina.


When to use: When the default repository name is too generic (e.g., main) or you want to give the project a more descriptive name on your machine.

Exemplo Prático:


Practical Example:

Bash

# Clonando o projeto para uma pasta chamada "MeuApp"
# Cloning the project into a folder called "MyApp"
git clone https://github.com/exemplo/projeto-incrivel.git MeuApp
10. git status
O que faz: Mostra o estado atual do seu repositório. Informa quais arquivos foram modificados, quais estão na área de stage e quais não estão sendo rastreados pelo Git. Este é o comando que você mais usará.


What it does: Shows the current state of your repository. It tells you which files have been modified, which are in the staging area, and which are not being tracked by Git. This is the command you will use the most.

Quando usar: Constantemente. Antes de adicionar, antes de commitar, depois de mesclar, sempre que você estiver em dúvida sobre o que está acontecendo.


When to use: Constantly. Before adding, before committing, after merging, whenever you're in doubt about what's happening.

Exemplo Prático:


Practical Example:

Bash

# Crie um arquivo novo, por exemplo, 'index.html'
# Create a new file, for example, 'index.html'
# Depois, execute o status
# Then, run status

git status

# Saída esperada (exemplo):
# Expected output (example):
# On branch main
# No commits yet
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#         index.html
#
# nothing added to commit but untracked files present (use "git add" to track)
Capítulo 3: O Fluxo de Trabalho Básico
Chapter 3: The Basic Workflow
Este é o ciclo fundamental do Git: modificar, preparar e salvar. Dominar este fluxo é essencial para o uso efetivo do Git.


This is the fundamental Git cycle: modify, stage, and save. Mastering this flow is essential for the effective use of Git.

11. git add [arquivo]
O que faz: Adiciona um arquivo específico à "Área de Stage" (ou "Índice"). A área de stage é uma preparação para o seu próximo commit. Você só "fotografa" (commita) o que está nela.


What it does: Adds a specific file to the "Staging Area" (or "Index"). The staging area is a preparation for your next commit. You only "snapshot" (commit) what is in it.

Quando usar: Depois de criar um novo arquivo ou modificar um existente e você está pronto para incluí-lo no próximo "pacote" de alterações (commit).


When to use: After creating a new file or modifying an existing one, and you are ready to include it in the next "package" of changes (commit).

Exemplo Prático:


Practical Example:

Bash

# Adicione o arquivo à área de stage
# Add the file to the staging area
git add index.html

# Verifique o status novamente
# Check the status again
git status

# Saída esperada após o add:
# Expected output after add:
# ...
# Changes to be committed:
#   (use "git rm --cached <file>..." to unstage)
#         new file:   index.html
12. git add .
O que faz: Adiciona todos os arquivos novos e modificados no diretório de trabalho atual e subdiretórios à área de stage. O . representa o diretório atual.


What it does: Adds all new and modified files in the current working directory and subdirectories to the staging area. The . represents the current directory.

Quando usar: Quando você fez várias alterações em múltiplos arquivos e quer incluir todas elas no próximo commit. É um atalho muito comum.


When to use: When you've made several changes to multiple files and want to include all of them in the next commit. It's a very common shortcut.

Exemplo Prático:


Practical Example:

Bash

# Crie dois arquivos novos
# Create two new files
touch style.css script.js

# Adicione ambos de uma vez
# Add both at once
git add .
13. git add -p
O que faz: Inicia um modo interativo que permite adicionar "pedaços" (patches) de um arquivo à área de stage, em vez do arquivo inteiro. O Git mostrará cada bloco de alteração e perguntará se você quer adicioná-lo (y), ignorá-lo (n), dividi-lo (s), etc.


What it does: Starts an interactive mode that allows you to add "patches" of a file to the staging area, instead of the entire file. Git will show each block of changes and ask if you want to stage it (y), ignore it (n), split it (s), etc.

Quando usar: Quando você fez múltiplas alterações lógicas em um único arquivo, mas quer separá-las em commits diferentes.


When to use: When you've made multiple logical changes in a single file but want to separate them into different commits.

Exemplo Prático:


Practical Example:

Bash

git add -p funcoes.js

# O Git mostrará o primeiro bloco de alteração (correção da variável)
# Git will show the first block of changes (variable fix)
# Stage this hunk [y,n,q,a,d,s,e,?]?
# Você digita 'y' para adicionar.
# You type 'y' to stage it.

# Em seguida, o Git mostrará o segundo bloco (a nova função)
# Next, Git will show the second block (the new function)
# Stage this hunk [y,n,q,a,d,s,e,?]?
# Você digita 'n' para não adicionar.
# You type 'n' to not stage it.
14. git commit
O que faz: Salva permanentemente as alterações que estão na área de stage no seu histórico local. Este comando abrirá o editor de texto configurado no seu terminal para que você escreva uma mensagem de commit detalhada.


What it does: Permanently saves the changes from the staging area to your local history. This command will open your configured text editor in the terminal for you to write a detailed commit message.

Quando usar: Quando você precisa escrever uma mensagem de commit longa e explicativa, com título e corpo.


When to use: When you need to write a long and explanatory commit message, with a title and body.

Exemplo Prático:


Practical Example:

Bash

git add .
git commit
# Seu editor de texto (Vim, Nano, etc.) será aberto.
# Your text editor (Vim, Nano, etc.) will open.
15. git commit -m "Sua mensagem de commit"
O que faz: Cria um commit com a mensagem fornecida diretamente na linha de comando, sem abrir o editor de texto.


What it does: Creates a commit with the message provided directly on the command line, without opening the text editor.

Quando usar: Para a maioria dos commits do dia a dia, quando a mensagem é curta e direta. É o uso mais comum.


When to use: For most day-to-day commits, when the message is short and to the point. This is the most common usage.

Exemplo Prático:


Practical Example:

Bash

git add index.html
git commit -m "feat: Adiciona estrutura inicial da página HTML"
# The message in English would be: "feat: Add initial HTML page structure"
16. git commit -a
O que faz: É um atalho que adiciona automaticamente todos os arquivos que já estão sendo rastreados pelo Git (tracked files) e que foram modificados, e em seguida abre o editor de texto para a mensagem de commit. Ele não adiciona arquivos novos (untracked files).


What it does: It's a shortcut that automatically stages all files that are already tracked by Git and have been modified, and then opens the text editor for the commit message. It does not add new files (untracked files).

Quando usar: Quando você modificou arquivos que já existiam no repositório e quer commitar todos de uma vez sem usar git add antes.


When to use: When you have modified files that already existed in the repository and want to commit them all at once without using git add first.

Exemplo Prático:


Practical Example:

Bash

# Modifique o arquivo 'index.html' que já foi commitado antes
# Modify the 'index.html' file that has been committed before
git commit -a
17. git commit -am "Sua mensagem"
O que faz: Combina o atalho -a (adicionar arquivos rastreados modificados) com o -m (mensagem na linha de comando).


What it does: Combines the -a shortcut (stage modified tracked files) with the -m shortcut (message on the command line).

Quando usar: Fluxo de trabalho muito rápido para commitar alterações em arquivos existentes.


When to use: A very fast workflow for committing changes to existing files.

Exemplo Prático:


Practical Example:

Bash

# Modifique o 'index.html' e 'style.css'
# Modify 'index.html' and 'style.css'
git commit -am "style: Ajusta margens e cores da página principal"
# The message in English would be: "style: Adjust margins and colors of the main page"
38. git branch --merged
O que faz: Mostra apenas as branches cujas alterações já foram completamente incorporadas (mescladas) na branch em que você está atualmente.


What it does: Shows only the branches whose changes have already been fully incorporated (merged) into the branch you are currently on.

Quando usar: Para limpar seu repositório. É seguro deletar as branches listadas por este comando.


When to use: To clean up your repository. It is safe to delete the branches listed by this command.

Exemplo Prático:


Practical Example:

Bash

# Suponha que você estava na branch 'main' e executou 'git merge feature/login'
# Suppose you were on the 'main' branch and ran 'git merge feature/login'

git branch --merged

# Saída esperada (exemplo):
# Expected output (example):
#   feature/login
# * main 
39. git branch --no-merged
O que faz: O oposto do comando anterior. Mostra as branches que contêm trabalho que ainda não foi mesclado na sua branch atual.


What it does: The opposite of the previous command. It shows the branches that contain work that has not yet been merged into your current branch.

Quando usar: Para verificar quais funcionalidades ou correções ainda estão pendentes de integração. Deletar uma dessas branches sem cuidado (-D) pode significar perda de trabalho.


When to use: To check which features or fixes are still pending integration. Deleting one of these branches carelessly (-D) could mean losing work.

Exemplo Prático:


Practical Example:

Bash

# Imagine que você tem uma branch 'feature/pagamento' que ainda não foi mesclada em 'main'
# Imagine you have a 'feature/payment' branch that has not yet been merged into 'main'
git checkout main
git branch --no-merged

# Saída esperada:
# Expected output:
#   feature/pagamento
40. git checkout -
O que faz: É um atalho extremamente útil que muda para a última branch em que você estava.


What it does: It is an extremely useful shortcut that switches to the last branch you were on.

Quando usar: Quando você está alternando frequentemente entre duas branches (ex: main e uma feature-branch) para comparar ou testar algo.


When to use: When you are frequently switching between two branches (e.g., main and a feature-branch) to compare or test something.

Exemplo Prático:


Practical Example:

Bash

# Você está na branch 'feature/novo-layout'
# You are on the 'feature/new-layout' branch
# Você muda para a branch 'main'
# You switch to the 'main' branch
git checkout main

# Agora, para voltar rapidamente para 'feature/novo-layout' sem digitar o nome todo:
# Now, to quickly switch back to 'feature/new-layout' without typing the full name:
git checkout -

# Saída esperada:
# Expected output:
# Switched to branch 'feature/new-layout'
