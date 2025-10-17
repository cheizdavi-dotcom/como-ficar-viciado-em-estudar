# Design Guidelines: Clone Exato da Página de Vendas Kiwify

## Abordagem de Design
**Clonagem Fiel**: Replicar com precisão máxima o design, layout e estrutura da página original de vendas da Kiwify, mantendo todos os elementos visuais e hierarquia de informações.

## Paleta de Cores
**Fundo**: Branco puro (0 0% 100%)
**Texto Principal**: Preto/cinza escuro (0 0% 10%)
**Accent/CTA**: Verde vibrante para checkmarks e destaques (142 71% 45%)
**Botão Principal**: Verde escuro/azul esverdeado para o botão de pagamento (158 64% 52%)
**Alertas**: Vermelho/laranja para avisos de urgência (0 84% 60%)
**Bordas**: Cinza claro (0 0% 90%)

## Tipografia
**Fonte Principal**: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
**Títulos**: Bold, tamanhos variados (text-2xl a text-4xl)
**Corpo**: Regular, text-base a text-lg
**Listas/Benefícios**: text-sm a text-base com checkmarks verdes (✅)
**Ênfase**: Negrito e maiúsculas para palavras-chave

## Sistema de Layout
**Container**: max-w-4xl centralizado
**Espaçamento**: py-8 a py-12 entre seções principais
**Grid de Produtos Upsell**: 1 coluna com cards compactos
**Formulário**: Layout vertical tradicional de checkout

## Estrutura de Seções

### 1. Hero Section
- Título grande e impactante com texto emocional
- 3 imagens empilhadas verticalmente (full width dentro do container)
- Sem navegação superior

### 2. Lista de Benefícios
- Background levemente colorido ou branco
- Checkmarks verdes (✅) seguidos de texto
- 10-12 itens em lista vertical
- Texto em negrito para palavras-chave

### 3. Galeria de Imagens de Prova
- 2-3 imagens lado a lado ou empilhadas
- Legendas descritivas abaixo

### 4. Seção de Perguntas
- Ícone de livro (📒) antes de cada pergunta
- Lista vertical de perguntas retóricas
- 15-20 perguntas para criar identificação

### 5. Transformação/Pitch
- Título com emojis (🎯, 🚀)
- Subtítulos em negrito
- Checkmarks verdes com benefícios
- Call-to-action destacado
- Imagem de impacto

### 6. Galeria de Testemunhos Visuais
- 4-5 imagens em grid ou empilhadas
- Imagens quadradas ou retangulares

### 7. Alerta de Urgência
- Background vermelho/laranja claro
- Texto em negrito sobre escassez e preço temporário
- Emojis de alerta (🚨)

### 8. Formulário de Checkout
- Campo: Nome (text input)
- Campo: Email (text input)
- Campo: Confirmar Email (text input)
- Campo: Telefone com dropdown de país
- Dropdown: Estado (para Brasil/EUA)
- Seção de Cartão:
  - Número do cartão
  - Mês/Ano (dropdowns lado a lado)
  - CVC
- Badge de segurança/criptografia

### 9. Upsell de Produtos
- Título: "💎PRODUTO EXCLUSIVO - SÓ AQUI"
- Checkbox à esquerda
- Miniatura do produto (64px)
- Título em negrito
- Descrição do produto
- Preço à direita ($2.50)
- 5 produtos listados verticalmente

### 10. Botão de Pagamento
- Full width, verde escuro
- Texto: "Pay $5.90" (ou valor em reais)
- Altura generosa (h-14)
- Texto branco e bold

### 11. Footer/Termos
- Logo da Kiwify (cinza)
- Texto legal pequeno sobre termos
- Links para políticas
- Badge reCAPTCHA
- Badge "7 DIAS DE GARANTIA"

## Componentes Específicos

**Checkmarks Verdes**: ✅ emoji ou SVG verde antes do texto
**Ícones de Livro**: 📒 emoji para perguntas
**Emojis Decorativos**: Usar generosamente (🚀, 💥, 🎯, 🔥, etc)
**Cards de Upsell**: Border sutil, padding interno, checkbox funcional
**Alertas de Escassez**: Background colorido, padding generoso, texto centralizado

## Imagens
**Hero**: 3 imagens empilhadas verticalmente (largura completa)
**Prova Social**: 2-3 imagens demonstrando o produto/resultados
**Galeria de Depoimentos**: 4-5 imagens de testemunhos/screenshots
**Produtos Upsell**: Miniaturas 64x64px para cada produto adicional
**Footer**: Logo Kiwify em cinza

## Interações
**Hover em Botões**: Leve escurecimento
**Focus em Inputs**: Border azul
**Checkboxes**: Estilo padrão mas visível
**Validação**: Bordas vermelhas para erros

## Responsividade
**Mobile First**: Stack tudo verticalmente
**Tablet/Desktop**: Manter layout vertical, aumentar max-width
**Imagens**: Sempre full-width dentro do container
**Formulário**: Sempre 1 coluna, nunca dividir campos