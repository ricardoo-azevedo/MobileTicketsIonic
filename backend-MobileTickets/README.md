# MobileTicketsIonic

```mermaid
erDiagram

    TICKETS {
        int id PK
        string codigo
        enum tipo
        datetime data_emissao
        datetime data_chamada
        enum status
    }

    GUICHES {
        int id PK
        string nome
        boolean ativo
    }

    ATENDIMENTOS {
        int id PK
        int ticket_id FK
        int guiche_id FK
        datetime data_inicio
        datetime data_fim
        int tempo_previsto
        int tempo_real
    }

    TICKETS ||--o| ATENDIMENTOS : "1 ticket gera 0 ou 1 atendimento"
    GUICHES ||--o{ ATENDIMENTOS : "1 guichê realiza 0..N atendimentos"




```
### 
SISTEMA DE CONTROLE DE ATENDIMENTO

INTRODUÇÃO

Sistemas de “tickets” são ferramentas utilizadas para apoiar a gestão do atendimento ao usuário. Também são conhecidos como sistemas de “chamados”, especialmente no contexto de suporte técnico em TI.

Esses sistemas permitem organizar o atendimento por meio de filas, que podem seguir regras de priorização.

Este documento foi elaborado a partir de uma entrevista conduzida por um Analista de Negócios com um cliente fictício, tendo como objetivo definir os requisitos iniciais para o desenvolvimento de um sistema de gestão de tickets de serviço.

No contexto deste projeto acadêmico, será desenvolvido um aplicativo para controle de atendimento em filas de laboratórios médicos.

AGENTES DO SISTEMA

O sistema contará com três agentes principais:

AS – Agente Sistema
Responsável por emitir senhas e responder aos comandos da atendente.

AA – Agente Atendente
Responsável por chamar o próximo da fila e realizar o atendimento no guichê.

AC – Agente Cliente
Interage com o totem para emitir sua senha e aguarda ser chamado no painel, onde será informado o guichê de atendimento.

Todos os agentes contribuem para a execução do Serviço de Atendimento (SA).

TIPOS DE SENHA

A fila de atendimento será composta por três tipos de senhas:

SP - Senha Prioritária
SG - Senha Geral
SE - Senha para Retirada de Exames

TEMPO MÉDIO DE ATENDIMENTO (TM)

Senha Prioritária (SP):
Tempo médio: 15 minutos
Variação: ±5 minutos
Intervalo: 10 a 20 minutos
Possui maior prioridade no atendimento.

Senha Geral (SG):
Tempo médio: 5 minutos
Variação: ±3 minutos
Intervalo: 2 a 8 minutos
Possui menor prioridade no atendimento.

Senha de Exames (SE):
95% dos atendimentos: até 1 minuto
5% dos atendimentos: até 5 minutos
Não possui prioridade formal, mas entra no fluxo após uma SP.

REGRA DE PRIORIDADE

A ordem de atendimento deve seguir a seguinte lógica:

SP → (SE ou SG) → SP → (SE ou SG) → ...

Regras:

* Sempre atender uma SP primeiro, se disponível.
* Em seguida:

  * atender uma SE, se existir;
  * caso contrário, atender uma SG.
* Nunca repetir o mesmo tipo consecutivamente, se houver outros disponíveis.

GUICHÊS

* Não há especialização de guichês.
* Qualquer guichê pode atender qualquer tipo de senha.

SENHAS NÃO ATENDIDAS

* 5% das senhas emitidas não são atendidas.
* Devem ser descartadas.
* Não geram atendimento.

HORÁRIO DE FUNCIONAMENTO

* Início: 07:00
* Encerramento: 17:00

Regras:

* Não é permitido emitir senhas fora do horário.
* Ao final do expediente, todas as senhas ainda não atendidas devem ser descartadas.

PAINEL DE CHAMADOS

* Deve exibir as 5 últimas senhas chamadas.
* Não deve exibir a próxima senha.
* Deve informar o número da senha e o guichê correspondente.

FORMATO DA SENHA

Cada senha deve seguir o padrão:

YYMMDD-PPSQ

Onde:

YY – Ano da emissão (2 dígitos)
MM – Mês da emissão (2 dígitos)
DD – Dia da emissão (2 dígitos)
PP – Tipo da senha (SP, SG, SE)
SQ – Sequência por tipo (reinício diário)

RELATÓRIOS

O sistema deve gerar relatórios diários e mensais contendo:

* Quantitativo geral de senhas emitidas.
* Quantitativo geral de senhas atendidas.
* Quantitativo de senhas emitidas por tipo.
* Quantitativo de senhas atendidas por tipo.
* Relatório detalhado contendo:

  * número da senha
  * tipo
  * data e hora de emissão
  * data e hora de atendimento
  * guichê responsável
  * (caso não atendida, campos de atendimento ficam em branco)
* Relatório de tempo médio de atendimento (TM), considerando variações.

INFRAESTRUTURA

O cliente informa que já possui suporte para:

* Banco de dados MySQL 8.0
* Backend em Node.js
* Frontend em React, Angular ou Vue

Outras tecnologias poderão ser utilizadas, desde que devidamente justificadas.

