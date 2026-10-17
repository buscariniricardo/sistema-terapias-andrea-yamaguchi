# Sistema de Captação e Conversão de Clientes — Andrea Yamaguchi

MVP de um site responsivo para apresentar os serviços de terapias holísticas de Andrea Yamaguchi, organizar as terapias disponíveis e facilitar o contato de pessoas interessadas pelo WhatsApp.

**Repositório:** https://github.com/buscariniricardo/sistema-terapias-andrea-yamaguchi

## Objetivo do projeto

O projeto busca reduzir barreiras entre a descoberta dos serviços e o contato com a terapeuta. A solução reúne informações profissionais, um catálogo de terapias e caminhos diretos para iniciar uma conversa pelo WhatsApp.

O site é destinado a pessoas interessadas em atendimentos presenciais em Yokkaichi, Japão, ou on-line. A ferramenta apoia a divulgação profissional, mas não garante aumento de clientes ou de renda.

## Funcionalidades

- Página inicial com apresentação do serviço.
- Seção “Sobre a terapeuta”.
- Catálogo de terapias com descrição, modalidade e preço.
- Seleção de uma terapia para preparar uma mensagem contextualizada.
- Acesso ao WhatsApp com mensagem pré-preenchida.
- Navegação entre telas pelo menu superior e pela barra inferior.
- Layout responsivo para diferentes larguras de tela.
- Indicações de foco para navegação por teclado e mensagens de status acessíveis.

### Terapias demonstradas no catálogo

| Terapia | Modalidade exibida | Preço exibido |
|---|---|---:|
| Radiestesia | On-line | R$ 120,00 |
| Shiatsu | Presencial em Yokkaichi | R$ 150,00 |
| Reiki | On-line e presencial | R$ 100,00 |

> Os nomes, modalidades, preços e informações de contato são dados configurados diretamente no código e devem ser confirmados com a responsável antes de qualquer uso público.

## Tecnologias utilizadas

- HTML5 — estrutura do conteúdo.
- CSS3 — identidade visual, layout e responsividade.
- JavaScript — navegação entre telas, seleção de terapias, notificações e geração do link do WhatsApp.
- SVG — ícones e ilustrações vetoriais integrados ao HTML.

## Arquitetura e funcionamento

A versão fornecida é uma aplicação front-end estática, concentrada em um arquivo HTML que contém a estrutura, os estilos CSS e a lógica JavaScript. A navegação alterna entre seções da própria página, sem carregar novas páginas do servidor.

O catálogo é definido no HTML. Não há, nesta versão, backend Flask, banco de dados SQLite, autenticação administrativa, agendamento automatizado ou processamento de pagamentos. O contato é encaminhado para o serviço externo WhatsApp; o site não armazena mensagens nem solicitações de agendamento.

## Como executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/buscariniricardo/sistema-terapias-andrea-yamaguchi.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd sistema-terapias-andrea-yamaguchi
   ```

3. Abra o arquivo HTML principal no navegador.

   Se o arquivo principal tiver outro nome, localize o arquivo `.html` correspondente no repositório. Para esta versão estática, não é necessário instalar Python, Flask ou banco de dados.

## Acessibilidade e experiência de uso

O código inclui recursos iniciais de acessibilidade e usabilidade:

- atributo `lang="pt-BR"` e configuração de viewport;
- rótulos acessíveis em controles e navegação;
- destaque visual de foco para navegação por teclado;
- atualização de `aria-expanded` no menu e `aria-current` na navegação;
- mensagens de status com `role="status"` e `aria-live="polite"`;
- ilustrações decorativas ocultadas das tecnologias assistivas quando apropriado;
- ajustes de layout para telas menores.

Esses recursos não equivalem, por si só, a uma certificação de conformidade WCAG. A acessibilidade deve ser verificada com testes manuais e ferramentas apropriadas, incluindo teclado, ampliação de texto, contraste e diferentes larguras de tela.

## Escopo do MVP

**Incluído:** apresentação profissional, catálogo informativo e encaminhamento para contato via WhatsApp.

**Fora do escopo atual:** marcação automática de consultas, calendário, lembretes, pagamentos on-line, chatbot, painel administrativo e persistência de dados em banco.

## Testes e validação

O projeto pode ser avaliado por meio de tarefas como:

1. Encontrar informações sobre a terapeuta.
2. Localizar uma terapia e identificar sua modalidade e preço.
3. Selecionar uma terapia e abrir o fluxo de contato pelo WhatsApp.
4. Navegar usando teclado e verificar foco, leitura e adaptação a telas menores.

Registre os resultados reais de cada rodada de teste, incluindo conclusão das tarefas, tempo, dificuldades observadas, avaliação de satisfação e melhorias aplicadas. Não declare testes automatizados, pipeline de integração contínua ou resultados de validação como concluídos sem evidências correspondentes.

## Possíveis melhorias futuras

- Separar HTML, CSS e JavaScript em arquivos próprios.
- Centralizar e validar os dados de contato e do catálogo.
- Adicionar testes automatizados para a lógica de navegação e seleção.
- Configurar integração contínua para executar as verificações disponíveis.
- Reavaliar contraste, foco, semântica e uso com leitores de tela.
- Considerar backend e banco de dados apenas se a necessidade de manutenção dinâmica do catálogo justificar essa evolução.

## Contexto acadêmico

Projeto desenvolvido no contexto da disciplina de Projeto de Software, com foco na implementação de um MVP para apoiar a divulgação digital de uma profissional autônoma. A proposta relaciona-se ao **ODS 8 — Trabalho Decente e Crescimento Econômico**, especialmente ao apoio ao empreendedorismo, sem pressupor resultados comerciais garantidos.

## Licença

Nenhuma licença foi especificada neste README. Antes de permitir reutilização ou distribuição por terceiros, escolha e inclua uma licença adequada.
