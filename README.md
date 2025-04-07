# Portfolio Prod by GUS

![Logo](public/LogoRoxaSemFundo.png)

Um portfólio profissional moderno e responsivo desenvolvido com Next.js, React, TypeScript e Tailwind CSS. O site está otimizado para SEO, com configurações avançadas de CORS e segurança, e conta com um formulário de contato funcional usando Nodemailer.

**URL do Projeto:** [https://portfolio-prodbygus.vercel.app/](https://portfolio-prodbygus.vercel.app/)

## 🚀 Tecnologias

- **Frontend:**

  - [Next.js 15](https://nextjs.org/) - Framework React com App Router
  - [React 19](https://react.dev/) - Biblioteca para interfaces de usuário
  - [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para JavaScript
  - [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS utility-first
  - [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações

- **Backend:**

  - [Nodemailer](https://nodemailer.com/) - Módulo para envio de emails
  - [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Backend serverless

- **Ferramentas de Desenvolvimento:**

  - [ESLint](https://eslint.org/) - Linter para JavaScript/TypeScript
  - [Prettier](https://prettier.io/) - Formatador de código
  - [Turbopack](https://turbo.build/pack) - Bundler para desenvolvimento rápido

- **Infraestrutura:**
  - [Vercel](https://vercel.com/) - Plataforma de hospedagem e deploy

## 🔮 Efeitos Visuais e Interatividade

- **Fundo Interativo Dinâmico:**

  - Partículas interativas que reagem ao movimento do mouse
  - Grades cyberpunk com efeitos de movimento
  - Gradientes animados que seguem o cursor
  - Ondas animadas com canvas que reagem à velocidade do mouse
  - Glow pulsante que responde à navegação

- **Cursor Personalizado:**

  - Cursor totalmente customizado com efeitos de cyberpunk
  - Efeitos de partículas durante cliques e movimentos
  - Feedback visual em elementos interativos
  - Efeitos de glitch aleatórios durante interações
  - Histórico de movimento com traço visual

- **Animações e Transições:**
  - Sistema de animações baseado em Framer Motion
  - Transições suaves entre páginas e seções
  - Efeitos de paralaxe em backgrounds
  - Animações de fade e slide nas entradas de elementos
  - Componente wrapper para gerenciar animações de scroll

## 🛠️ Configuração do Projeto

### Pré-requisitos

- Node.js 18.17.0 ou superior
- npm, yarn ou pnpm (recomendado)

### Instalação

1. Clone o repositório

   ```bash
   git clone https://github.com/seu-usuario/portfolio-prodbygus.git
   cd portfolio-prodbygus
   ```

2. Instale as dependências

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. Configure as variáveis de ambiente
   Crie um arquivo `.env.local` na raiz do projeto e adicione:

   ```env
   # Configurações do SMTP para o formulário de contato
   SMTP_HOST=seu_host_smtp
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=seu_usuario
   SMTP_PASSWORD=sua_senha
   MAIL_FROM=seu_email@exemplo.com
   MAIL_TO=email_destino@exemplo.com
   ```

4. Inicie o ambiente de desenvolvimento
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

## 📂 Estrutura do Projeto

```
portfolio-prodbygus/
├── public/               # Arquivos estáticos
│   ├── LogoRoxaSemFundo.png  # Logo principal
│   ├── manifest.json     # Manifest para PWA
│   ├── robots.txt        # Configurações para crawlers
│   └── ...               # Outros assets
├── src/                  # Código fonte
│   ├── app/              # App Router do Next.js
│   │   ├── api/          # Rotas da API
│   │   │   └── contact/  # API de contato com Nodemailer
│   │   ├── about/        # Página Sobre
│   │   ├── projects/     # Página de Projetos
│   │   ├── contact/      # Página de Contato
│   │   └── page.tsx      # Página inicial
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── layout/       # Componentes de layout (Header, Footer)
│   │   ├── sections/     # Seções das páginas
│   │   └── ui/           # Componentes de UI
│   │       ├── GlobalBackground.tsx # Fundo interativo com partículas
│   │       ├── CustomCursor.tsx    # Cursor personalizado cyberpunk
│   │       ├── ParticlesEffect.tsx # Sistema de partículas interativas
│   │       └── ...                 # Outros componentes UI
│   └── middleware.ts     # Middleware para CORS e segurança
├── .env.local            # Variáveis de ambiente locais
├── vercel.json           # Configurações da Vercel
├── next.config.mjs       # Configuração do Next.js
└── tailwind.config.js    # Configuração do Tailwind CSS
```

## 🔍 Melhorias Implementadas

### Sistema Visual e UI/UX

- **Tema Cyberpunk**: Implementação completa de um tema cyberpunk com efeitos de glitch, linhas de grade, e gradientes neon
- **Cursor Personalizado**: Substituição do cursor padrão do navegador por uma versão interativa com partículas e efeitos visuais
- **Fundo Interativo**: Camadas dinâmicas que respondem ao movimento do cursor com ondas e partículas animadas
- **Tipografia Avançada**: Uso de fontes monospace (Fira Code) com ligaduras para uma estética de código/terminal
- **Efeitos Glassmorphism**: Elementos com efeito de vidro usando backdrop-filter e blur para sobreposições modernas
- **Animações Otimizadas**: Sistema de animações baseado em keyframes CSS e Framer Motion com renderização client-side

### Otimizações de Performance

- **Renderização Client-side**: Componentes visuais pesados como animações e efeitos de partículas isolados no cliente
- **Lazy Loading**: Uso de dynamic imports com SSR desativado para componentes interativos complexos
- **Otimização de Canvas**: Implementação eficiente de animações em canvas com requestAnimationFrame
- **Gestão de Recursos**: Limpeza apropriada de timers e event listeners para evitar vazamentos de memória
- **Throttling de Eventos**: Otimização de eventos de mouse para reduzir sobrecarga em interações contínuas

### SEO e Metadados

- **Metadados Avançados**: Implementação completa de metadados com Open Graph e Twitter Cards para melhor compartilhamento em redes sociais
- **Sitemap Dinâmico**: Geração de sitemap.xml para melhor indexação em motores de busca
- **Robots.txt**: Configuração otimizada para crawlers
- **Schema.org**: Marcações JSON-LD estruturadas para melhor compreensão por motores de busca
- **Progressive Web App (PWA)**: Configuração de manifest.json para funcionalidades de PWA

### Segurança e Otimizações

- **Configurações CORS**: Middleware personalizado para controle de CORS nas rotas da API
- **Cabeçalhos de Segurança**: Implementação de cabeçalhos como X-Content-Type-Options, X-Frame-Options, etc.
- **Cache Otimizado**: Configurações de cache para arquivos estáticos
- **Verificação Google**: Preparação para verificação do Google Search Console

### Formulário de Contato

- **Nodemailer**: Configuração segura para envio de emails através do formulário de contato
- **Validação**: Validação de campos obrigatórios no frontend e backend
- **Feedback Visual**: Indicadores de status durante o envio do formulário

## 📱 Responsividade

O portfólio é totalmente responsivo, proporcionando uma experiência otimizada em:

- Desktops e laptops
- Tablets
- Smartphones

## 🎨 Tema e Paleta de Cores

O projeto utiliza uma paleta de cores cyberpunk personalizada:

- **Cor Principal**: `#9f70a9` (Roxo)
- **Cor Secundária**: `#544158` (Roxo escuro)
- **Cor Terciária**: `#c2a5c7` (Lilás)
- **Cor de Fundo**: `#2a212c` (Roxo muito escuro)
- **Cor de Texto**: `#e8d7eb` (Branco-lilás)

Esta paleta está disponível como variáveis CSS e é utilizada por todo o projeto via Tailwind CSS.

## 🚀 Deploy

O projeto está configurado para deployment contínuo na Vercel. Cada push para a branch principal desencadeia um novo deploy automático.

### Configurações da Vercel

Um arquivo `vercel.json` personalizado foi criado para:

- Definir cabeçalhos HTTP para segurança
- Configurar regras de CORS para a API
- Otimizar o cache para arquivos estáticos
- Criar redirecionamentos úteis

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

- **Gustavo Lopes Nomelini**
- Email: gustavolnomelini@gmail.com
- LinkedIn: [Gustavo Lopes Nomelini](https://linkedin.com/in/gustavo-lopes-nomelini-144bb1212)
- GitHub: [gustavo-nomelini](https://github.com/gustavo-nomelini)

---

Desenvolvido com ❤️ por Prod by GUS
