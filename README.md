# Portfolio Prod by GUS

![Logo](public/LogoRoxaSemFundo.png)

Um portfólio profissional moderno e responsivo desenvolvido com Next.js 15, React 19, TypeScript e Tailwind CSS 4. O site apresenta um design cyberpunk com cursor personalizado, efeitos visuais avançados, animações fluidas e um formulário de contato funcional usando Nodemailer.

**URL do Projeto:** [https://portfolio-prodbygus.vercel.app/](https://portfolio-prodbygus.vercel.app/)

## 🚀 Tecnologias

- **Frontend:**

  - [Next.js 15.2](https://nextjs.org/) - Framework React com App Router
  - [React 19](https://react.dev/) - Biblioteca para interfaces de usuário
  - [TypeScript 5](https://www.typescriptlang.org/) - Tipagem estática para JavaScript
  - [Tailwind CSS 4](https://tailwindcss.com/) - Framework CSS utility-first
  - [Framer Motion 12](https://www.framer.com/motion/) - Biblioteca de animações avançadas
  - [React Icons 5.5](https://react-icons.github.io/react-icons/) - Biblioteca de ícones
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - Biblioteca 3D para React
  - [Three.js](https://threejs.org/) - Biblioteca 3D para JavaScript
  - [GSAP](https://greensock.com/gsap/) - Biblioteca de animações de alta performance

- **Backend:**

  - [Nodemailer 6.10](https://nodemailer.com/) - Módulo para envio de emails
  - [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Backend serverless
  - [Zod](https://zod.dev/) - Validação de dados em tempo de execução
  - [Resend](https://resend.com/) - API de email moderna

- **Ferramentas de Desenvolvimento:**

  - [ESLint 9](https://eslint.org/) - Linter para JavaScript/TypeScript
  - [Prettier 3.5](https://prettier.io/) - Formatador de código
  - [Turbopack](https://turbo.build/pack) - Bundler para desenvolvimento rápido
  - [PNPM 10.6](https://pnpm.io/) - Gerenciador de pacotes rápido e eficiente
  - [Husky](https://typicode.github.io/husky/) - Git hooks
  - [Commitlint](https://commitlint.js.org/) - Linter de mensagens de commit
  - [Lint-staged](https://github.com/okonet/lint-staged) - Execução de linters em arquivos staged

- **Infraestrutura:**
  - [Vercel](https://vercel.com/) - Plataforma de hospedagem e deploy
  - [Cloudflare](https://www.cloudflare.com/) - CDN e proteção DDoS
  - [Vercel Analytics](https://vercel.com/analytics) - Análise de performance e métricas

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
  - Componente ScrollAnimationWrapper para gerenciar animações de scroll

## 🛠️ Configuração do Projeto

### Pré-requisitos

- Node.js 18.17.0 ou superior
- PNPM 10.6.5 ou superior (recomendado)

### Instalação

1. Clone o repositório

   ```bash
   git clone https://github.com/seu-usuario/portfolio-prodbygus.git
   cd portfolio-prodbygus
   ```

2. Instale as dependências

   ```bash
   pnpm install
   # ou
   npm install
   # ou
   yarn install
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
   pnpm dev
   # ou
   npm run dev
   # ou
   yarn dev
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
│   │   ├── sitemap.ts    # Configuração de sitemap dinâmico
│   │   └── page.tsx      # Página inicial
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── layout/       # Componentes de layout (Header, Footer)
│   │   ├── sections/     # Seções das páginas
│   │   └── ui/           # Componentes de UI
│   │       ├── GlobalBackground.tsx # Fundo interativo com partículas
│   │       ├── CustomCursor.tsx    # Cursor personalizado cyberpunk
│   │       ├── ParticlesEffect.tsx # Sistema de partículas interativas
│   │       ├── ImageGallery.tsx    # Galeria de imagens com modal
│   │       ├── ImageModal.tsx      # Modal para visualização de imagens
│   │       ├── ProjectCard.tsx     # Card para exibição de projetos
│   │       ├── ScrollAnimationWrapper.tsx # Wrapper para animações de scroll
│   │       ├── Map.tsx             # Componente de mapa interativo
│   │       └── ...                 # Outros componentes UI
│   └── middleware.ts     # Middleware para CORS e segurança
├── .env.local            # Variáveis de ambiente locais
├── vercel.json           # Configurações da Vercel
├── next.config.mjs       # Configuração do Next.js
└── tailwind.config.js    # Configuração do Tailwind CSS
```

## 🔍 Melhorias Implementadas

### Sistema Visual e UI/UX

- **Tema Cyberpunk**: Design completo com efeitos de glitch, linhas de grade, e gradientes neon
- **Cursor Personalizado**: Cursor interativo avançado com partículas e efeitos visuais
- **Fundo Interativo**: Canvas dinâmico com partículas e ondas que reagem ao movimento do mouse
- **Tipografia Avançada**: Uso de fontes monospace com ligaduras para uma estética tech/terminal
- **Efeitos Glassmorphism**: Elementos com efeito de vidro usando backdrop-filter e blur
- **Animações Otimizadas**: Sistema baseado em Framer Motion 12 com renderização client-side
- **Galeria de Imagens**: Implementação de galeria com modal para visualização detalhada
- **Componentes Esqueleto**: Sistema de skeletons para carregamento progressivo

### Otimizações de Performance

- **Renderização Client-side**: Componentes visuais pesados isolados no cliente
- **Lazy Loading**: Dynamic imports com SSR desativado para componentes interativos complexos
- **Otimização de Canvas**: Animações em canvas com requestAnimationFrame e debounce
- **Gestão de Recursos**: Limpeza apropriada de timers e event listeners
- **Throttling de Eventos**: Otimização de eventos de mouse para reduzir sobrecarga
- **Turbopack**: Uso do Turbopack para desenvolvimento rápido

### SEO e Metadados

- **Sitemap Dinâmico**: Geração automática de sitemap.xml para melhor indexação
- **Metadados Avançados**: Open Graph e Twitter Cards para compartilhamento em redes sociais
- **Robots.txt**: Configuração otimizada para crawlers
- **Schema.org**: Marcações JSON-LD estruturadas para melhor compreensão por motores de busca
- **Progressive Web App (PWA)**: Configuração para funcionalidades de PWA

### Segurança e Otimizações

- **Middleware Personalizado**: Configurações avançadas de CORS e segurança
- **Cabeçalhos de Segurança**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Cache Otimizado**: Configurações de cache para arquivos estáticos
- **Cross-Origin Policies**: Configurações de Cross-Origin-Resource-Policy e Cross-Origin-Embedder-Policy

### Formulário de Contato

- **Nodemailer**: Configuração segura para envio de emails
- **Validação**: Validação de campos obrigatórios no frontend e backend
- **Feedback Visual**: Indicadores de status durante o envio do formulário
- **Template HTML**: Email formatado com HTML para melhor apresentação

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

## 📄 Licença e Direitos Autorais

Este projeto é propriedade intelectual de Gustavo Lopes Nomelini, também conhecido como "<PROD/BYGUS>". Todos os direitos reservados.

O código fonte deste projeto está licenciado sob os termos da licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

### Termos de Uso

- O código pode ser usado livremente para fins pessoais e comerciais
- A atribuição ao autor original é obrigatória
- O código pode ser modificado e distribuído
- O autor não se responsabiliza por qualquer dano causado pelo uso do código

## 📧 Contato

- **Gustavo Lopes Nomelini (PROD/BYGUS)**
- Email: gustavolnomelini@gmail.com
- LinkedIn: [Gustavo Lopes Nomelini](https://linkedin.com/in/gustavo-lopes-nomelini-144bb1212)
- GitHub: [gustavo-nomelini](https://github.com/gustavo-nomelini)
- Instagram: [@prodbygus](https://instagram.com/prodbygus)

---

Desenvolvido com ❤️ por <PROD/BYGUS>
