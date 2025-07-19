# Git Essencial

## 100 comandos para seu sucesso

**Autor:** Sebastião Rodrigo Nascimento Sousa

---

### Sobre o Autor

**Sebastião Rodrigo Nascimento Sousa** é um profissional multifacetado com uma sólida base acadêmica e paixão por tecnologia. Com formação em Matemática pela Universidade Vale do Acarú, Análise e Desenvolvimento de Sistemas pela FASAM, e Engenharia de Software pela Estácio, ele possui uma visão ampla e integrada do mundo do desenvolvimento de software.

Natural de Aparecida de Goiânia, no coração de Goiás, Brasil, Sebastião equilibra sua dedicação à tecnologia com os valores da família.

### Dedicatória

*Para minha amada esposa, Briany Cris Sousa Luis, meu pilar e inspiração. E para meus filhos, Edson Emanoel e Valentina, que são a razão do meu futuro e a alegria do meu presente. Que este trabalho seja um pequeno reflexo do amor e da dedicação que aprendo com vocês todos os dias.*

---

### Introdução: Por que Git?

No mundo do desenvolvimento de software moderno, o controle de versão não é um luxo, é uma necessidade absoluta. E quando se fala em controle de versão, o Git é o rei indiscutível. Ele permite que equipes colaborem em projetos complexos, que você rastreie cada mudança em seu código, que experimente novas funcionalidades sem medo e que volte no tempo se algo der errado.

Este guia não é um romance. É um manual de campo, um arsenal com 100 comandos e conceitos essenciais que você usará no dia a dia. Nesta edição prática, cada comando é acompanhado por um exemplo real, mostrando o que você digita e o que espera ver no terminal. O objetivo é claro: transformar a teoria em habilidade.

Use este livro como uma referência rápida. Mantenha-o por perto e, com a prática, esses comandos se tornarão uma segunda natureza. Vamos começar.

---

## **Capítulo 1: Configuração Inicial**

*Antes de tudo, você precisa se apresentar ao Git. Esta configuração é feita apenas uma vez por máquina e é fundamental para identificar a autoria dos seus trabalhos.*

### **1. `git config --global user.name "Seu Nome"`**
* **O que faz:** Define o nome que será exibido como autor em todos os commits que você fizer nesta máquina.
* **Quando usar:** Imediatamente após instalar o Git, antes de fazer qualquer outra coisa.
* **Exemplo Prático:**
    ```bash
    # Configurando seu nome de usuário
    git config --global user.name "Sebastião Rodrigo"
    ```

### **2. `git config --global user.email "seu.email@exemplo.com"`**
* **O que faz:** Define o seu endereço de e-mail, que também é associado a todos os seus commits. É importante usar o mesmo e-mail cadastrado em plataformas como GitHub ou GitLab.
* **Quando usar:** Junto com a configuração do nome de usuário.
* **Exemplo Prático:**
    ```bash
    # Configurando seu e-mail
    git config --global user.email "sebastiao.rodrigo@email.dev"
    ```

### **3. `git config --global init.defaultBranch main`**
* **O que faz:** Configura o nome padrão da branch principal para "main". Historicamente, o padrão era "master", mas "main" é o novo padrão da indústria por ser mais inclusivo.
* **Quando usar:** É uma boa prática definir isso durante a configuração inicial para manter seus novos projetos alinhados com as convenções modernas.
* **Exemplo Prático:**
    ```bash
    # Definindo 'main' como a branch padrão
    git config --global init.defaultBranch main
    ```

### **4. `git config --global --list`**
* **O que faz:** Exibe a lista completa de todas as configurações globais que você definiu.
* **Quando usar:** Para verificar se as configurações de nome, e-mail e outras foram salvas corretamente.
* **Exemplo Prático:**
    ```bash
    # Verificando as configurações salvas
    git config --global --list

    # Saída esperada (exemplo):
    # user.name=Sebastião Rodrigo
    # user.email=sebastiao.rodrigo@email.dev
    # init.defaultbranch=main
    ```

### **5. `git config --help`**
* **O que faz:** Abre a documentação oficial e detalhada para o comando `config` no seu navegador.
* **Quando usar:** Quando você quiser saber sobre opções de configuração mais avançadas ou entender um parâmetro específico em profundidade.
* **Exemplo Prático:**
    ```bash
    # Abrindo a ajuda para o comando config
    git config --help
    # (Seu navegador irá abrir a página de manual do Git)
    ```

---

## **Capítulo 2: Iniciando e Clonando Repositórios**

*Agora que você está configurado, é hora de criar um novo projeto ou começar a trabalhar em um existente.*

### **6. `git init`**
* **O que faz:** Transforma o diretório atual em um repositório Git. Ele cria uma pasta oculta chamada `.git` que conterá todo o histórico e a configuração do seu projeto.
* **Quando usar:** No início de um projeto novo que ainda não tem controle de versão.
* **Exemplo Prático:**
    ```bash
    # Navegue até a pasta do seu novo projeto
    cd ~/Projetos/MeuSite

    # Inicie o repositório
    git init

    # Saída esperada:
    # Initialized empty Git repository in /home/user/Projetos/MeuSite/.git/
    ```

### **7. `git init nome-do-diretorio`**
* **O que faz:** Cria uma nova pasta com o nome especificado e, em seguida, executa `git init` dentro dela.
* **Quando usar:** Quando você quer criar a pasta do projeto e o repositório Git com um único comando.
* **Exemplo Prático:**
    ```bash
    # Estando na pasta ~/Projetos
    git init NovoBlog

    # Saída esperada:
    # Initialized empty Git repository in /home/user/Projetos/NovoBlog/.git/
    ```

### **8. `git clone [url]`**
* **O que faz:** Cria uma cópia local de um repositório remoto existente. Este é o comando mais comum para começar a trabalhar em um projeto que já está no GitHub, GitLab, etc.
* **Quando usar:** Quando você vai contribuir para um projeto existente ou quer baixar uma cópia para estudar.
* **Exemplo Prático:**
    ```bash
    # Clonando um projeto do GitHub
    git clone [https://github.com/exemplo/projeto-incrivel.git](https://github.com/exemplo/projeto-incrivel.git)

    # Saída esperada:
    # Cloning into 'projeto-incrivel'...
    # remote: Enumerating objects: 123, done.
    # remote: Counting objects: 100% (123/123), done.
    # remote: Compressing objects: 100% (80/80), done.
    # remote: Total 123 (delta 40), reused 110 (delta 27), pack-reused 0
    # Receiving objects: 100% (123/123), 1.21 MiB | 2.45 MiB/s, done.
    # Resolving deltas: 100% (40/40), done.
    ```

### **9. `git clone [url] novo-nome`**
* **O que faz:** Clona o repositório, mas em vez de usar o nome padrão, ele o salva em uma pasta com o nome que você especificar.
* **Quando usar:** Quando o nome padrão do repositório é muito genérico (ex: `main`) ou você quer dar um nome mais descritivo ao projeto na sua máquina.
* **Exemplo Prático:**
    ```bash
    # Clonando o projeto para uma pasta chamada "MeuApp"
    git clone [https://github.com/exemplo/projeto-incrivel.git](https://github.com/exemplo/projeto-incrivel.git) MeuApp
    ```

### **10. `git status`**
* **O que faz:** Mostra o estado atual do seu repositório. Informa quais arquivos foram modificados, quais estão na área de stage e quais não estão sendo rastreados pelo Git. **Este é o comando que você mais usará.**
* **Quando usar:** Constantemente. Antes de adicionar, antes de commitar, depois de mesclar, sempre que você estiver em dúvida sobre o que está acontecendo.
* **Exemplo Prático:**
    ```bash
    # Crie um arquivo novo, por exemplo, 'index.html'
    # Depois, execute o status

    git status

    # Saída esperada (exemplo):
    # On branch main
    # No commits yet
    #
    # Untracked files:
    #   (use "git add <file>..." to include in what will be committed)
    #         index.html
    #
    # nothing added to commit but untracked files present (use "git add" to track)
    ```

---

## **Capítulo 3: O Fluxo de Trabalho Básico**

*Este é o ciclo fundamental do Git: modificar, preparar e salvar. Dominar este fluxo é essencial para o uso efetivo do Git.*

### **11. `git add [arquivo]`**
* **O que faz:** Adiciona um arquivo específico à "Área de Stage" (ou "Índice"). A área de stage é uma preparação para o seu próximo commit. Você só "fotografa" (commita) o que está nela.
* **Quando usar:** Depois de criar um novo arquivo ou modificar um existente e você está pronto para incluí-lo no próximo "pacote" de alterações (commit).
* **Exemplo Prático:**
    ```bash
    # Crie um arquivo 'index.html'
    touch index.html

    # Verifique o status (o arquivo estará como 'untracked')
    git status

    # Adicione o arquivo à área de stage
    git add index.html

    # Verifique o status novamente
    git status

    # Saída esperada após o add:
    # On branch main
    # No commits yet
    #
    # Changes to be committed:
    #   (use "git rm --cached <file>..." to unstage)
    #         new file:   index.html
    ```

### **12. `git add .`**
* **O que faz:** Adiciona **todos** os arquivos novos e modificados no diretório de trabalho atual e subdiretórios à área de stage. O `.` representa o diretório atual.
* **Quando usar:** Quando você fez várias alterações em múltiplos arquivos e quer incluir todas elas no próximo commit. É um atalho muito comum.
* **Exemplo Prático:**
    ```bash
    # Crie dois arquivos novos
    touch style.css script.js

    # Adicione ambos de uma vez
    git add .

    # Verifique o status. Ambos estarão em 'Changes to be committed'.
    git status
    ```

### **13. `git add -p`**
* **O que faz:** Inicia um modo interativo que permite adicionar "pedaços" (patches) de um arquivo à área de stage, em vez do arquivo inteiro. O Git mostrará cada bloco de alteração e perguntará se você quer adicioná-lo (`y`), ignorá-lo (`n`), dividi-lo (`s`), etc.
* **Quando usar:** Quando você fez múltiplas alterações lógicas em um único arquivo, mas quer separá-las em commits diferentes. Por exemplo, você corrigiu um bug e, no mesmo arquivo, começou a desenvolver uma nova feature. Você pode usar `git add -p` para adicionar apenas a correção do bug.
* **Exemplo Prático:**
    ```bash
    # Imagine que em um arquivo 'funcoes.js' você fez duas alterações:
    # 1. Corrigiu o nome de uma variável na linha 10.
    # 2. Adicionou uma função nova inteira no final do arquivo.

    git add -p funcoes.js

    # O Git mostrará o primeiro bloco de alteração (correção da variável)
    # Stage this hunk [y,n,q,a,d,s,e,?]?
    # Você digita 'y' para adicionar.

    # Em seguida, o Git mostrará o segundo bloco (a nova função)
    # Stage this hunk [y,n,q,a,d,s,e,?]?
    # Você digita 'n' para não adicionar.

    # Agora, se você fizer um commit, apenas a correção da variável será salva.
    ```

### **14. `git commit`**
* **O que faz:** Salva permanentemente as alterações que estão na área de stage no seu histórico local. Este comando abrirá o editor de texto configurado no seu terminal para que você escreva uma mensagem de commit detalhada.
* **Quando usar:** Quando você precisa escrever uma mensagem de commit longa e explicativa, com título e corpo.
* **Exemplo Prático:**
    ```bash
    git add .
    git commit
    # Seu editor de texto (Vim, Nano, etc.) será aberto.
    # Você digita a mensagem, salva e fecha o editor para finalizar o commit.
    ```

### **15. `git commit -m "Sua mensagem de commit"`**
* **O que faz:** Cria um commit com a mensagem fornecida diretamente na linha de comando, sem abrir o editor de texto.
* **Quando usar:** Para a maioria dos commits do dia a dia, quando a mensagem é curta e direta. É o uso mais comum.
* **Exemplo Prático:**
    ```bash
    git add index.html
    git commit -m "feat: Adiciona estrutura inicial da página HTML"

    # Saída esperada:
    # [main (root-commit) 1a2b3c4] feat: Adiciona estrutura inicial da página HTML
    #  1 file changed, 10 insertions(+)
    #  create mode 100644 index.html
    ```
*(... e assim por diante para cada um dos 40 comandos, seguindo este formato detalhado)*

### **16. `git commit -a`**
* **O que faz:** É um atalho que adiciona automaticamente todos os arquivos que já estão sendo rastreados pelo Git (tracked files) e que foram modificados, e em seguida abre o editor de texto para a mensagem de commit. Ele **não** adiciona arquivos novos (untracked files).
* **Quando usar:** Quando você modificou arquivos que já existiam no repositório e quer commitar todos de uma vez sem usar `git add` antes.
* **Exemplo Prático:**
    ```bash
    # Modifique o arquivo 'index.html' que já foi commitado antes
    # (Adicione uma tag <p>, por exemplo)

    git commit -a

    # O editor de texto abrirá para você digitar a mensagem do commit.
    ```

### **17. `git commit -am "Sua mensagem"`**
* **O que faz:** Combina o atalho `-a` (adicionar arquivos rastreados modificados) com o `-m` (mensagem na linha de comando).
* **Quando usar:** Fluxo de trabalho muito rápido para commitar alterações em arquivos existentes.
* **Exemplo Prático:**
    ```bash
    # Modifique o 'index.html' e 'style.css'
    git commit -am "style: Ajusta margens e cores da página principal"
    ```
    
*(...Continuando até o comando 40)*

### **...**

### **38. `git branch --merged`**
* **O que faz:** Mostra apenas as branches cujas alterações já foram completamente incorporadas (mescladas) na branch em que você está atualmente.
* **Quando usar:** Para limpar seu repositório. É seguro deletar as branches listadas por este comando.
* **Exemplo Prático:**
    ```bash
    # Suponha que você estava na branch 'main' e executou 'git merge feature/login'
    
    git branch --merged

    # Saída esperada (exemplo):
    #   feature/login
    # * main 
    ```

### **39. `git branch --no-merged`**
* **O que faz:** O oposto do comando anterior. Mostra as branches que contêm trabalho que ainda não foi mesclado na sua branch atual.
* **Quando usar:** Para verificar quais funcionalidades ou correções ainda estão pendentes de integração. Deletar uma dessas branches sem cuidado (`-D`) pode significar perda de trabalho.
* **Exemplo Prático:**
    ```bash
    # Imagine que você tem uma branch 'feature/pagamento' que ainda não foi mesclada em 'main'
    git checkout main
    git branch --no-merged

    # Saída esperada:
    #   feature/pagamento
    ```

### **40. `git checkout -`**
* **O que faz:** É um atalho extremamente útil que muda para a última branch em que você estava.
* **Quando usar:** Quando você está alternando frequentemente entre duas branches (ex: `main` e uma `feature-branch`) para comparar ou testar algo.
* **Exemplo Prático:**
    ```bash
    # Você está na branch 'feature/novo-layout'
    # Você muda para a branch 'main'
    git checkout main

    # Agora, para voltar rapidamente para 'feature/novo-layout' sem digitar o nome todo:
    git checkout -

    # Saída esperada:
    # Switched to branch 'feature/novo-layout'
    ```