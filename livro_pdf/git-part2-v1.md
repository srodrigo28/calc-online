## **Capítulo 5: Sincronizando com o Mundo (Remotes)**

*Seu trabalho não deve viver apenas na sua máquina. É hora de colaborar, fazer backups e interagir com serviços como GitHub, GitLab e Bitbucket.*

### **41. `git remote -v`**
* **O que faz:** Lista todos os repositórios remotos configurados para o seu projeto, junto com suas URLs. O `-v` (verbose) mostra as URLs para `fetch` (baixar) e `push` (enviar).
* **Quando usar:** Sempre que você precisar verificar para onde seu código está sendo enviado ou de onde está sendo baixado.
* **Exemplo Prático:**
    ```bash
    # Após clonar um repositório, este comando mostrará o 'origin'
    git remote -v

    # Saída esperada:
    # origin  [https://github.com/SEU_USUARIO/MeuSite.git](https://github.com/SEU_USUARIO/MeuSite.git) (fetch)
    # origin  [https://github.com/SEU_USUARIO/MeuSite.git](https://github.com/SEU_USUARIO/MeuSite.git) (push)
    ```

### **42. `git remote add [nome] [url]`**
* **O que faz:** Adiciona um novo repositório remoto ao seu projeto. `[nome]` é um apelido que você dá ao remoto (o padrão mais comum é `origin`).
* **Quando usar:** Quando você inicia um projeto com `git init` na sua máquina e depois cria um repositório vazio no GitHub para hospedar seu código. Você usa este comando para "conectar" os dois.
* **Exemplo Prático:**
    ```bash
    # Adicionando o remoto principal chamado 'origin'
    git remote add origin [https://github.com/SEU_USUARIO/MeuSite.git](https://github.com/SEU_USUARIO/MeuSite.git)

    # Verifique com 'git remote -v' para confirmar.
    ```

### **43. `git remote show [nome]`**
* **O que faz:** Mostra informações detalhadas sobre um remoto específico, incluindo quais branches locais estão rastreando quais branches remotas.
* **Quando usar:** Para ter uma visão completa do estado de um remoto, saber quais branches estão desatualizadas e o que acontecerá quando você rodar `git pull` ou `git push`.
* **Exemplo Prático:**
    ```bash
    git remote show origin

    # Saída esperada (exemplo):
    # * remote origin
    #   Fetch URL: [https://github.com/SEU_USUARIO/MeuSite.git](https://github.com/SEU_USUARIO/MeuSite.git)
    #   Push  URL: [https://github.com/SEU_USUARIO/MeuSite.git](https://github.com/SEU_USUARIO/MeuSite.git)
    #   HEAD branch: main
    #   Remote branch:
    #     main tracked
    #   Local branch configured for 'git pull':
    #     main merges with remote main
    ```

### **44. `git remote rename [nome-antigo] [nome-novo]`**
* **O que faz:** Renomeia um apelido de um remoto.
* **Quando usar:** Se você adicionou um remoto com um nome que não faz mais sentido e quer organizá-lo melhor (ex: renomear `heroku` para `producao`).
* **Exemplo Prático:**
    ```bash
    # Renomeando 'origin' para 'github'
    git remote rename origin github
    ```

### **45. `git remote remove [nome]`**
* **O que faz:** Remove a conexão com um repositório remoto. Isso não afeta o repositório remoto, apenas a sua conexão local com ele.
* **Quando usar:** Se um repositório remoto foi descontinuado ou você não precisa mais interagir com ele.
* **Exemplo Prático:**
    ```bash
    # Removendo a conexão com o remoto 'github'
    git remote remove github
    ```

### **46. `git push [remoto] [branch]`**
* **O que faz:** Envia os commits da sua branch local para a branch correspondente no repositório remoto.
* **Quando usar:** Após fazer um ou mais commits locais, você usa `push` para compartilhar seu trabalho com a equipe ou fazer um backup na nuvem.
* **Exemplo Prático:**
    ```bash
    # Enviando os commits da sua branch 'main' local para o remoto 'origin'
    git push origin main
    ```

### **47. `git push -u origin main`**
* **O que faz:** O `-u` (ou `--set-upstream`) faz duas coisas: envia seus commits e "conecta" sua branch local à branch remota.
* **Quando usar:** No primeiro `push` de uma nova branch. Após usar `-u` uma vez, nas próximas vezes você pode simplesmente digitar `git push` e o Git saberá para onde enviar.
* **Exemplo Prático:**
    ```bash
    git checkout -b feature/nova-pagina
    # ... faz commits ...
    git push -u origin feature/nova-pagina
    ```

### **48. `git push --force`**
* **O que faz:** Força o `push`, sobrescrevendo o histórico da branch remota com o seu histórico local. **É um comando DESTRUTIVO.**
* **Quando usar:** **EVITE AO MÁXIMO em branches compartilhadas.** Use apenas em branches pessoais se você tiver certeza absoluta de que precisa reescrever o histórico remoto (ex: após um `rebase`). Pode causar perda de trabalho para outros membros da equipe.
* **Dica de Mestre:** Prefira sempre o comando a seguir.

### **49. `git push --force-with-lease`**
* **O que faz:** Uma versão mais segura do `force push`. Ele só permite sobrescrever a branch remota se ninguém mais tiver enviado commits para ela desde a última vez que você a baixou.
* **Quando usar:** Sempre que você achar que precisa de um `--force`. Ele protege você de sobrescrever o trabalho de outra pessoa sem querer.
* **Exemplo Prático:**
    ```bash
    # Após um rebase local para limpar seus commits
    git push --force-with-lease origin sua-feature-branch
    ```

### **50. `git push [remoto] --delete [branch]`**
* **O que faz:** Deleta uma branch no repositório remoto.
* **Quando usar:** Após uma branch de feature ter sido mesclada na `main`, você pode deletá-la tanto localmente (`git branch -d`) quanto remotamente para manter o repositório limpo.
* **Exemplo Prático:**
    ```bash
    # Deletando a branch 'feature/login-antigo' no remoto 'origin'
    git push origin --delete feature/login-antigo
    ```

### **51. `git pull [remoto] [branch]`**
* **O que faz:** Baixa as alterações de uma branch remota e as mescla (`merge`) automaticamente na sua branch local atual. É um atalho para `git fetch` seguido de `git merge`.
* **Quando usar:** No dia a dia, para manter sua branch local atualizada com o trabalho da equipe.
* **Exemplo Prático:**
    ```bash
    # Estando na branch 'main', para atualizar com as últimas mudanças do servidor
    git pull origin main
    ```

### **52. `git pull --rebase`**
* **O que faz:** Em vez de usar `merge`, ele baixa as alterações remotas e, em seguida, reaplica seus commits locais "por cima" delas.
* **Quando usar:** Para manter um histórico de commits linear e limpo, evitando os "commits de merge" que o `git pull` padrão pode criar. É uma preferência de fluxo de trabalho.
* **Exemplo Prático:**
    ```bash
    # Atualizando sua feature-branch de forma linear
    git pull --rebase origin main
    ```

### **53. `git fetch [remoto]`**
* **O que faz:** Baixa todas as informações (novas branches, novos commits, novas tags) de um repositório remoto, mas **não modifica seus arquivos locais**. Ele apenas atualiza sua "visão" do que está no servidor.
* **Quando usar:** Quando você quer ver o que a equipe fez, mas sem integrar as mudanças ao seu trabalho imediatamente. Permite que você inspecione as alterações antes de mesclá-las.
* **Exemplo Prático:**
    ```bash
    # Baixando as últimas informações do 'origin'
    git fetch origin

    # Agora você pode comparar sua 'main' com a 'origin/main'
    git diff main origin/main
    ```

### **54. `git fetch --prune`**
* **O que faz:** Executa um `fetch`, mas também remove as referências a branches remotas que não existem mais no servidor (porque foram deletadas).
* **Quando usar:** Para manter sua lista de branches remotas (`git branch -a`) limpa e atualizada, sem "branches fantasma".
* **Exemplo Prático:**
    ```bash
    git fetch --prune origin
    ```

### **55. `git remote set-url [nome] [nova-url]`**
* **O que faz:** Altera a URL de um repositório remoto existente.
* **Quando usar:** Se a URL do projeto mudou (ex: migração de um servidor para outro, ou de HTTP para SSH).
* **Exemplo Prático:**
    ```bash
    # Mudando a URL do 'origin' para usar SSH em vez de HTTPS
    git remote set-url origin git@github.com:SEU_USUARIO/MeuSite.git
    ```

*(... e assim por diante, para todos os 100 comandos)*

### **...**

## **Capítulo 8: Ferramentas Avançadas do Mestre Git**

*Comandos para otimizar seu fluxo de trabalho e resolver problemas complexos.*

### **...**

### **93. `git rebase -i HEAD~3`**
* **O que faz:** Inicia um "rebase interativo" dos seus últimos 3 commits. Abre um editor de texto onde você pode reordenar, editar, juntar (`squash`), ou remover commits antes de enviá-los.
* **Quando usar:** Antes de enviar uma feature para revisão (Pull Request). Permite que você limpe seu histórico local, juntando commits pequenos ("WIP", "corrigindo typo") em um único commit coeso e significativo.
* **Exemplo Prático:**
    ```bash
    # Inicia o rebase interativo dos seus 3 últimos commits
    git rebase -i HEAD~3

    # O editor abrirá com algo assim:
    # pick 1a2b3c4 feat: Adiciona funcionalidade base
    # pick 4d5e6f7 fix: Corrige typo no título
    # pick 7g8h9i0 style: Ajusta identação

    # Para juntar os 3 em um só, você edita o texto para:
    # pick 1a2b3c4 feat: Adiciona funcionalidade base
    # squash 4d5e6f7 fix: Corrige typo no título
    # squash 7g8h9i0 style: Ajusta identação

    # Salve e feche. O Git abrirá outro editor para você escrever a nova mensagem do commit único.
    ```

### **94. `git tag -a v1.0 -m "Versão 1.0"`**
* **O que faz:** Cria uma "tag anotada", que é um marcador permanente para um commit específico, ideal para marcar versões de lançamento (releases).
* **Quando usar:** Quando você finaliza uma versão estável do seu software (v1.0, v1.1, v2.0).
* **Exemplo Prático:**
    ```bash
    # Certifique-se de estar no commit que representa a versão final
    git tag -a v1.0 -m "Lançamento inicial da plataforma com funcionalidades de cadastro e vitrine."
    ```

### **95. `git tag`**
* **O que faz:** Lista todas as tags existentes no seu repositório.
* **Quando usar:** Para ver todas as versões que já foram lançadas.
* **Exemplo Prático:**
    ```bash
    git tag
    # Saída esperada:
    # v1.0
    ```

### **96. `git push --tags`**
* **O que faz:** Envia todas as suas tags locais que ainda não estão no repositório remoto. Por padrão, `git push` não envia tags.
* **Quando usar:** Após criar uma tag de versão, você precisa usar este comando para que ela fique visível para toda a equipe no GitHub/GitLab.
* **Exemplo Prático:**
    ```bash
    git push --tags origin
    ```

### **97. `git cherry-pick [hash-do-commit]`**
* **O que faz:** Pega um commit específico de outra branch e o aplica na sua branch atual.
* **Quando usar:** Quando você precisa de uma correção de bug ou uma pequena feature que está em outra branch, mas não quer mesclar a branch inteira.
* **Exemplo Prático:**
    ```bash
    # Imagine que na branch 'hotfix/bug-urgente' existe o commit '5f6g7h8' que corrige um problema.
    # Você está na 'main' e precisa apenas daquela correção, sem o resto da branch 'hotfix'.
    git cherry-pick 5f6g7h8
    ```

### **98. `git bisect start`**
* **O que faz:** Inicia o modo `bisect`, uma ferramenta poderosa para encontrar exatamente qual commit introduziu um bug no sistema.
* **Quando usar:** Quando você sabe que em uma versão antiga tudo funcionava e na versão atual algo está quebrado, mas você não sabe qual dos 50 commits no meio causou o problema.
* **Exemplo Prático:**
    ```bash
    # Inicia o processo de "caça ao bug"
    git bisect start
    ```

### **99. `git bisect good [commit]` / `git bisect bad [commit]`**
* **O que faz:** Durante o `bisect`, você informa ao Git um commit antigo que você sabe que era "bom" (sem o bug) e o commit atual que está "ruim". O Git então faz um checkout no meio do caminho e você testa. Se estiver bom, você digita `git bisect good`. Se estiver ruim, `git bisect bad`. O Git repete o processo, diminuindo o escopo pela metade a cada passo, até encontrar o commit exato do problema.
* **Quando usar:** Após `git bisect start`.
* **Exemplo Prático:**
    ```bash
    # Informa o último commit bom conhecido
    git bisect good v1.0

    # Informa o commit atual que está com problema (HEAD)
    git bisect bad HEAD

    # O Git fará checkout em um commit no meio. Você testa.
    # Se o bug não acontecer:
    git bisect good
    # Se o bug acontecer:
    git bisect bad
    # ... repita até o Git apontar o culpado.
    ```

### **100. `gh pr create`**
* **O que faz:** Este é um comando do **GitHub CLI** (`gh`), uma ferramenta separada que se integra ao Git. Ele inicia um processo interativo no seu terminal para criar um Pull Request no GitHub a partir da sua branch atual.
* **Quando usar:** Como um atalho moderno e poderoso para agilizar a criação de Pull Requests sem precisar sair do terminal para ir ao site do GitHub.
* **Exemplo Prático:**
    ```bash
    # Após enviar sua branch de feature com 'git push'
    gh pr create

    # O CLI perguntará pelo título, corpo do PR, revisores, etc., de forma interativa.
    ```

---

### **Conclusão**

Dominar o Git é uma jornada contínua. Os 100 comandos e conceitos neste guia representam o arsenal que você precisa para enfrentar os desafios diários do desenvolvimento. A verdadeira maestria, no entanto, vem da prática constante.

Não tenha medo de experimentar. Crie branches, faça commits, desfaça alterações. Use o `git log` para entender o que aconteceu. Com o tempo, você desenvolverá uma intuição poderosa sobre como o Git funciona.

Continue aprendendo, continue construindo e que seu histórico de commits seja sempre claro e significativo.

**Boas codificações!**