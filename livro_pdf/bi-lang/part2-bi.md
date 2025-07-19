Capítulo 5: Sincronizando com o Mundo (Remotes)
Chapter 5: Syncing with the World (Remotes)
Seu trabalho não deve viver apenas na sua máquina. É hora de colaborar, fazer backups e interagir com serviços como GitHub, GitLab e Bitbucket.


Your work shouldn't live only on your machine. It's time to collaborate, make backups, and interact with services like GitHub, GitLab, and Bitbucket.

41. git remote -v
O que faz: Lista todos os repositórios remotos configurados para o seu projeto, junto com suas URLs. O -v (verbose) mostra as URLs para fetch (baixar) e push (enviar).


What it does: Lists all remote repositories configured for your project, along with their URLs. The -v (verbose) flag shows the URLs for both fetch and push.

Quando usar: Sempre que você precisar verificar para onde seu código está sendo enviado ou de onde está sendo baixado.


When to use: Whenever you need to check where your code is being pushed to or pulled from.

Exemplo Prático:


Practical Example:

Bash

# Após clonar um repositório, este comando mostrará o 'origin'
# After cloning a repository, this command will show the 'origin'
git remote -v

# Saída esperada:
# Expected output:
# origin  https://github.com/YOUR_USER/MySite.git (fetch)
# origin  https://github.com/YOUR_USER/MySite.git (push)
42. git remote add [nome] [url]
O que faz: Adiciona um novo repositório remoto ao seu projeto. [nome] é um apelido que você dá ao remoto (o padrão mais comum é origin).


What it does: Adds a new remote repository to your project. [name] is a nickname you give to the remote (the most common default is origin).

Quando usar: Quando você inicia um projeto com git init na sua máquina e depois cria um repositório vazio no GitHub para hospedar seu código. Você usa este comando para "conectar" os dois.


When to use: When you start a project with git init on your machine and then create an empty repository on GitHub to host your code. You use this command to "connect" the two.

Exemplo Prático:


Practical Example:

Bash

# Adicionando o remoto principal chamado 'origin'
# Adding the main remote named 'origin'
git remote add origin https://github.com/YOUR_USER/MySite.git

# Verifique com 'git remote -v' para confirmar.
# Check with 'git remote -v' to confirm.
43. git remote show [nome]
O que faz: Mostra informações detalhadas sobre um remoto específico, incluindo quais branches locais estão rastreando quais branches remotas.


What it does: Shows detailed information about a specific remote, including which local branches are tracking which remote branches.

Quando usar: Para ter uma visão completa do estado de um remoto, saber quais branches estão desatualizadas e o que acontecerá quando você rodar git pull ou git push.


When to use: To get a complete overview of a remote's state, see which branches are outdated, and what will happen when you run git pull or git push.

Exemplo Prático:


Practical Example:

Bash

git remote show origin

# Saída esperada (exemplo):
# Expected output (example):
# * remote origin
#   Fetch URL: https://github.com/YOUR_USER/MySite.git
#   Push  URL: https://github.com/YOUR_USER/MySite.git
#   HEAD branch: main
#   Remote branch:
#     main tracked
#   Local branch configured for 'git pull':
#     main merges with remote main
44. git remote rename [nome-antigo] [nome-novo]
O que faz: Renomeia um apelido de um remoto.


What it does: Renames the nickname of a remote.

Quando usar: Se você adicionou um remoto com um nome que não faz mais sentido e quer organizá-lo melhor (ex: renomear heroku para producao).


When to use: If you've added a remote with a name that no longer makes sense and you want to organize it better (e.g., renaming heroku to production).

Exemplo Prático:


Practical Example:

Bash

# Renomeando 'origin' para 'github'
# Renaming 'origin' to 'github'
git remote rename origin github
45. git remote remove [nome]
O que faz: Remove a conexão com um repositório remoto. Isso não afeta o repositório remoto, apenas a sua conexão local com ele.


What it does: Removes the connection to a remote repository. This does not affect the remote repository itself, only your local connection to it.

Quando usar: Se um repositório remoto foi descontinuado ou você não precisa mais interagir com ele.


When to use: If a remote repository has been discontinued or you no longer need to interact with it.

Exemplo Prático:


Practical Example:

Bash

# Removendo a conexão com o remoto 'github'
# Removing the connection to the 'github' remote
git remote remove github
46. git push [remoto] [branch]
O que faz: Envia os commits da sua branch local para a branch correspondente no repositório remoto.


What it does: Pushes the commits from your local branch to the corresponding branch on the remote repository.

Quando usar: Após fazer um ou mais commits locais, você usa push para compartilhar seu trabalho com a equipe ou fazer um backup na nuvem.


When to use: After making one or more local commits, you use push to share your work with the team or create a backup in the cloud.

Exemplo Prático:


Practical Example:

Bash

# Enviando os commits da sua branch 'main' local para o remoto 'origin'
# Pushing the commits from your local 'main' branch to the 'origin' remote
git push origin main
47. git push -u origin main
O que faz: O -u (ou --set-upstream) faz duas coisas: envia seus commits e "conecta" sua branch local à branch remota.


What it does: The -u (or --set-upstream) flag does two things: it pushes your commits and "links" your local branch to the remote branch.

Quando usar: No primeiro push de uma nova branch. Após usar -u uma vez, nas próximas vezes você pode simplesmente digitar git push e o Git saberá para onde enviar.


When to use: On the first push of a new branch. After using -u once, for subsequent pushes you can simply type git push, and Git will know where to send the changes.

Exemplo Prático:


Practical Example:

Bash

git checkout -b feature/new-page
# ... make commits ...
git push -u origin feature/new-page
48. git push --force
O que faz: Força o push, sobrescrevendo o histórico da branch remota com o seu histórico local. É um comando DESTRUTIVO.


What it does: Forces the push, overwriting the remote branch's history with your local history. This is a DESTRUCTIVE command.

Quando usar: AVOID AT ALL COSTS on shared branches. Use it only on personal branches if you are absolutely sure you need to rewrite the remote history (e.g., after a rebase). It can cause work loss for other team members.


When to use: AVOID AT ALL COSTS on shared branches. Use it only on personal branches if you are absolutely sure you need to rewrite the remote history (e.g., after a rebase). It can cause work loss for other team members.

Dica de Mestre: Prefira sempre o comando a seguir.


Pro Tip: Always prefer the next command.

49. git push --force-with-lease
O que faz: Uma versão mais segura do force push. Ele só permite sobrescrever a branch remota se ninguém mais tiver enviado commits para ela desde a última vez que você a baixou.


What it does: A safer version of force push. It only allows overwriting the remote branch if no one else has pushed commits to it since the last time you fetched from it.

Quando usar: Sempre que você achar que precisa de um --force. Ele protege você de sobrescrever o trabalho de outra pessoa sem querer.


When to use: Whenever you think you need --force. It protects you from unintentionally overwriting someone else's work.

Exemplo Prático:


Practical Example:

Bash

# Após um rebase local para limpar seus commits
# After a local rebase to clean up your commits
git push --force-with-lease origin your-feature-branch
50. git push [remoto] --delete [branch]
O que faz: Deleta uma branch no repositório remoto.


What it does: Deletes a branch on the remote repository.

Quando usar: Após uma branch de feature ter sido mesclada na main, você pode deletá-la tanto localmente (git branch -d) quanto remotamente para manter o repositório limpo.


When to use: After a feature branch has been merged into main, you can delete it both locally (git branch -d) and remotely to keep the repository clean.

Exemplo Prático:


Practical Example:

Bash

# Deletando a branch 'feature/login-antigo' no remoto 'origin'
# Deleting the 'feature/old-login' branch on the 'origin' remote
git push origin --delete feature/old-login
51. git pull [remoto] [branch]
O que faz: Baixa as alterações de uma branch remota e as mescla (merge) automaticamente na sua branch local atual. É um atalho para git fetch seguido de git merge.


What it does: Downloads changes from a remote branch and automatically merges (merge) them into your current local branch. It's a shortcut for git fetch followed by git merge.

Quando usar: No dia a dia, para manter sua branch local atualizada com o trabalho da equipe.


When to use: On a daily basis, to keep your local branch up-to-date with the team's work.

Exemplo Prático:


Practical Example:

Bash

# Estando na branch 'main', para atualizar com as últimas mudanças do servidor
# While on the 'main' branch, to update with the latest changes from the server
git pull origin main
52. git pull --rebase
O que faz: Em vez de usar merge, ele baixa as alterações remotas e, em seguida, reaplica seus commits locais "por cima" delas.


What it does: Instead of using merge, it downloads the remote changes and then reapplies your local commits "on top" of them.

Quando usar: Para manter um histórico de commits linear e limpo, evitando os "commits de merge" que o git pull padrão pode criar. É uma preferência de fluxo de trabalho.


When to use: To maintain a linear and clean commit history, avoiding the "merge commits" that a standard git pull can create. It's a workflow preference.

Exemplo Prático:


Practical Example:

Bash

# Atualizando sua feature-branch de forma linear
# Updating your feature-branch in a linear way
git pull --rebase origin main
53. git fetch [remoto]
O que faz: Baixa todas as informações (novas branches, novos commits, novas tags) de um repositório remoto, mas não modifica seus arquivos locais. Ele apenas atualiza sua "visão" do que está no servidor.


What it does: Downloads all information (new branches, new commits, new tags) from a remote repository, but does not modify your local files. It only updates your "view" of what is on the server.

Quando usar: Quando você quer ver o que a equipe fez, mas sem integrar as mudanças ao seu trabalho imediatamente. Permite que você inspecione as alterações antes de mesclá-las.


When to use: When you want to see what the team has done, but without immediately integrating the changes into your work. It allows you to inspect the changes before merging them.

Exemplo Prático:


Practical Example:

Bash

# Baixando as últimas informações do 'origin'
# Fetching the latest information from 'origin'
git fetch origin

# Agora você pode comparar sua 'main' com a 'origin/main'
# Now you can compare your 'main' with 'origin/main'
git diff main origin/main
54. git fetch --prune
O que faz: Executa um fetch, mas também remove as referências a branches remotas que não existem mais no servidor (porque foram deletadas).


What it does: Performs a fetch, but also removes references to remote branches that no longer exist on the server (because they were deleted).

Quando usar: Para manter sua lista de branches remotas (git branch -a) limpa e atualizada, sem "branches fantasma".


When to use: To keep your list of remote branches (git branch -a) clean and up-to-date, without "ghost branches".

Exemplo Prático:


Practical Example:

Bash

git fetch --prune origin
55. git remote set-url [nome] [nova-url]
O que faz: Altera a URL de um repositório remoto existente.


What it does: Changes the URL of an existing remote repository.

Quando usar: Se a URL do projeto mudou (ex: migração de um servidor para outro, ou de HTTP para SSH).


When to use: If the project's URL has changed (e.g., migration from one server to another, or from HTTP to SSH).

Exemplo Prático:


Practical Example:

Bash

# Mudando a URL do 'origin' para usar SSH em vez de HTTPS
# Changing the 'origin' URL to use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR_USER/MySite.git
Capítulo 8: Ferramentas Avançadas do Mestre Git
Chapter 8: Advanced Tools of the Git Master
Comandos para otimizar seu fluxo de trabalho e resolver problemas complexos.


Commands to optimize your workflow and solve complex problems.

93. git rebase -i HEAD~3
O que faz: Inicia um "rebase interativo" dos seus últimos 3 commits. Abre um editor de texto onde você pode reordenar, editar, juntar (squash), ou remover commits antes de enviá-los.


What it does: Starts an "interactive rebase" of your last 3 commits. It opens a text editor where you can reorder, edit, squash, or remove commits before pushing them.

Quando usar: Antes de enviar uma feature para revisão (Pull Request). Permite que você limpe seu histórico local, juntando commits pequenos ("WIP", "corrigindo typo") em um único commit coeso e significativo.


When to use: Before submitting a feature for review (Pull Request). It allows you to clean up your local history, combining small commits ("WIP," "fix typo") into a single, cohesive, and meaningful commit.

Exemplo Prático:


Practical Example:

Bash

# Inicia o rebase interativo dos seus 3 últimos commits
# Start the interactive rebase of your last 3 commits
git rebase -i HEAD~3

# O editor abrirá com algo assim:
# The editor will open with something like this:
# pick 1a2b3c4 feat: Add base functionality
# pick 4d5e6f7 fix: Correct typo in title
# pick 7g8h9i0 style: Adjust indentation

# Para juntar os 3 em um só, você edita o texto para:
# To join all 3 into one, you edit the text to:
# pick 1a2b3c4 feat: Add base functionality
# squash 4d5e6f7 fix: Correct typo in title
# squash 7g8h9i0 style: Adjust indentation

# Salve e feche. O Git abrirá outro editor para você escrever a nova mensagem do commit único.
# Save and close. Git will open another editor for you to write the new, single commit message.
94. git tag -a v1.0 -m "Versão 1.0"
O que faz: Cria uma "tag anotada", que é um marcador permanente para um commit específico, ideal para marcar versões de lançamento (releases).


What it does: Creates an "annotated tag," which is a permanent marker for a specific commit, ideal for marking release versions.

Quando usar: Quando você finaliza uma versão estável do seu software (v1.0, v1.1, v2.0).


When to use: When you finalize a stable version of your software (v1.0, v1.1, v2.0).

Exemplo Prático:


Practical Example:

Bash

# Certifique-se de estar no commit que representa a versão final
# Make sure you are on the commit that represents the final version
git tag -a v1.0 -m "Initial release of the platform with registration and storefront features."
95. git tag
O que faz: Lista todas as tags existentes no seu repositório.


What it does: Lists all existing tags in your repository.

Quando usar: Para ver todas as versões que já foram lançadas.


When to use: To see all the versions that have already been released.

Exemplo Prático:


Practical Example:

Bash

git tag
# Saída esperada:
# Expected output:
# v1.0
96. git push --tags
O que faz: Envia todas as suas tags locais que ainda não estão no repositório remoto. Por padrão, git push não envia tags.


What it does: Pushes all your local tags that are not yet on the remote repository. By default, git push does not send tags.

Quando usar: Após criar uma tag de versão, você precisa usar este comando para que ela fique visível para toda a equipe no GitHub/GitLab.


When to use: After creating a version tag, you need to use this command to make it visible to the entire team on GitHub/GitLab.

Exemplo Prático:


Practical Example:

Bash

git push --tags origin
97. git cherry-pick [hash-do-commit]
O que faz: Pega um commit específico de outra branch e o aplica na sua branch atual.


What it does: Takes a specific commit from another branch and applies it to your current branch.

Quando usar: Quando você precisa de uma correção de bug ou uma pequena feature que está em outra branch, mas não quer mesclar a branch inteira.


When to use: When you need a bug fix or a small feature that is on another branch, but you don't want to merge the entire branch.

Exemplo Prático:


Practical Example:

Bash

# Imagine que na branch 'hotfix/bug-urgente' existe o commit '5f6g7h8' que corrige um problema.
# Imagine that on the 'hotfix/urgent-bug' branch there is a commit '5f6g7h8' that fixes a problem.
# Você está na 'main' e precisa apenas daquela correção, sem o resto da branch 'hotfix'.
# You are on 'main' and need only that fix, without the rest of the 'hotfix' branch.
git cherry-pick 5f6g7h8
98. git bisect start
O que faz: Inicia o modo bisect, uma ferramenta poderosa para encontrar exatamente qual commit introduziu um bug no sistema.


What it does: Starts bisect mode, a powerful tool to find exactly which commit introduced a bug into the system.

Quando usar: Quando você sabe que em uma versão antiga tudo funcionava e na versão atual algo está quebrado, mas você não sabe qual dos 50 commits no meio causou o problema.


When to use: When you know that everything worked in an old version and something is broken in the current version, but you don't know which of the 50 commits in between caused the problem.

Exemplo Prático:


Practical Example:

Bash

# Inicia o processo de "caça ao bug"
# Starts the "bug hunt" process
git bisect start
99. git bisect good [commit] / git bisect bad [commit]
O que faz: Durante o bisect, você informa ao Git um commit antigo que você sabe que era "bom" (sem o bug) e o commit atual que está "ruim". O Git então faz um checkout no meio do caminho e você testa. Se estiver bom, você digita git bisect good. Se estiver ruim, git bisect bad. O Git repete o processo, diminuindo o escopo pela metade a cada passo, até encontrar o commit exato do problema.


What it does: During a bisect, you tell Git an old commit that you know was "good" (without the bug) and the current commit that is "bad". Git then checks out a commit halfway between them, and you test it. If it's good, you type git bisect good. If it's bad, you type git bisect bad. Git repeats the process, halving the scope with each step, until it finds the exact commit that caused the problem.

Quando usar: Após git bisect start.


When to use: After git bisect start.

Exemplo Prático:


Practical Example:

Bash

# Informa o último commit bom conhecido
# Mark the last known good commit
git bisect good v1.0

# Informa o commit atual que está com problema (HEAD)
# Mark the current commit that has the problem (HEAD)
git bisect bad HEAD

# O Git fará checkout em um commit no meio. Você testa.
# Git will check out a commit in the middle. You test.
# Se o bug não acontecer:
# If the bug doesn't happen:
git bisect good
# Se o bug acontecer:
# If the bug does happen:
git bisect bad
# ... repita até o Git apontar o culpado.
# ... repeat until Git points out the culprit.
100. gh pr create
O que faz: Este é um comando do GitHub CLI (gh), uma ferramenta separada que se integra ao Git. Ele inicia um processo interativo no seu terminal para criar um Pull Request no GitHub a partir da sua branch atual.


What it does: This is a command from the GitHub CLI (gh), a separate tool that integrates with Git. It starts an interactive process in your terminal to create a Pull Request on GitHub from your current branch.

Quando usar: Como um atalho moderno e poderoso para agilizar a criação de Pull Requests sem precisar sair do terminal para ir ao site do GitHub.


When to use: As a modern and powerful shortcut to speed up the creation of Pull Requests without having to leave the terminal and go to the GitHub website.

Exemplo Prático:


Practical Example:

Bash

# Após enviar sua branch de feature com 'git push'
# After pushing your feature branch with 'git push'
gh pr create

# O CLI perguntará pelo título, corpo do PR, revisores, etc., de forma interativa.
# The CLI will interactively ask for the title, body of the PR, reviewers, etc.
Conclusão
Conclusion
Dominar o Git é uma jornada contínua. Os 100 comandos e conceitos neste guia representam o arsenal que você precisa para enfrentar os desafios diários do desenvolvimento. A verdadeira maestria, no entanto, vem da prática constante.


Mastering Git is a continuous journey. The 100 commands and concepts in this guide represent the arsenal you need to face the daily challenges of development. True mastery, however, comes from constant practice.

Não tenha medo de experimentar. Crie branches, faça commits, desfaça alterações. Use o git log para entender o que aconteceu. Com o tempo, você desenvolverá uma intuição poderosa sobre como o Git funciona.
<br>
Don't be afraid to experiment. Create branches, make commits, undo changes. Use git log to understand what happened. Over time, you will develop a powerful intuition for how Git works.

Continue aprendendo, continue construindo e que seu histórico de commits seja sempre claro e significativo.


Keep learning, keep building, and may your commit history always be clear and meaningful.

Boas codificações!


Happy coding!