# Portfólio Autoral - Miguel Oliveira Martins

> **Stack:** HTML5 Semântico, Tailwind CSS, Google Fonts (Syne + Plus Jakarta Sans), CSS3 Custom Variables, JavaScript Modular Vanilla.  
> **Diretrizes Estéticas:** Studio Freight, Pangram Pangram, Linear App Interface e Kasper Lahti Portfolio.

---

## 🚀 Como Executar o Projeto

Você pode abrir o projeto diretamente em qualquer navegador moderno:

1. **Via Navegador Direto:**
   - Dê um duplo clique no arquivo `index.html` ou abra o caminho:
   ```text
   C:\Users\Aluno\.gemini\antigravity\scratch\portfolio-miguel\index.html
   ```

2. **Via Servidor Local (Opcional):**
   No terminal, navegue até a pasta do projeto e inicie um servidor simples:
   ```powershell
   cd C:\Users\Aluno\.gemini\antigravity\scratch\portfolio-miguel
   python -m http.server 3000
   ```
   Em seguida, acesse no navegador: `http://localhost:3000`.

---

## 🎨 Identidade Visual e Design System

- **Tipografia:**
  - `Syne` (700/800) para Títulos e Headings
  - `Plus Jakarta Sans` (400/500/600/700) para o Corpo de Texto
- **Paleta Dark Mode (Linear Inspired):**
  - Fundo principal: `#0F1117`
  - Superfície dos cards: `#161922`
  - Primária (Acento): `#7C3AED` (Violeta Elétrico)
  - Secundária: `#10B981` (Verde Menta)
  - Textos: `#F3F4F6` e `#9CA3AF`
- **Paleta Light Mode:**
  - Fundo: `#FAFAFA`
  - Cards: `#FFFFFF`
  - Textos: `#111827` e `#4B5563`
- **Componentes:**
  - Glassmorphism com `backdrop-blur-md`
  - Cards com bordas sutis (`rgba(255,255,255,0.08)`) e glow effect
  - Status em tempo real com indicador pulsante `🟢 Disponível para projetos`

---

## 🛠️ Recursos Implementados

1. **Header Fixo com Glassmorphism & Menu Mobile:** Navegação suave e responsiva com gaveta mobile animada.
2. **Alternador de Tema (Dark / Light):** Salva e recupera a preferência no `localStorage`.
3. **Hero & Seção Sobre Mim:** Título com gradiente `#7C3AED` -> `#10B981`, card de perfil com status ativo, biografia em 3 parágrafos e tags de skills.
4. **Galeria de Projetos com Filtro Interativo:** Filtre dinamicamente por `Todos`, `Web`, `Mobile` e `UI/UX` com animações suaves de escala e opacidade.
5. **Formulário de Contato com Validação em Tempo Real:** Verificação de campos obrigatórios, estados de foco e mensagem de sucesso inline sem recarregar a página.
6. **Scroll Reveal & Microinterações:** IntersectionObserver para revelar elementos suavemente durante a rolagem, sem rolagem horizontal indesejada (`overflow-x-hidden`).
