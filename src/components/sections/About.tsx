import Image from 'next/image';

const About = () => {
  return (
    <section className="py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--foreground)] sm:text-4xl">
            Sobre Mim
          </h2>
          <div className="mt-2 w-24 h-1 bg-[var(--color1)] mx-auto"></div>
        </div>

        {/* Conteúdo principal - layout flexível que muda com o tamanho de tela */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Coluna da foto - responsiva */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-[var(--color3)] shadow-lg">
              {/* Substitua pelo caminho da sua foto */}
              <Image
                src="/images/profile.jpg"
                alt="Gustavo - Desenvolvedor Web"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          
          {/* Coluna de informações */}
          <div className="lg:w-3/5">
            <h3 className="text-2xl font-semibold text-[var(--color1)] mb-4">
              Desenvolvedor Web & Designer
            </h3>
            
            <p className="text-[var(--foreground-muted)] mb-6">
              Olá! Sou apaixonado por criar experiências digitais bonitas e funcionais que vivem na web.
              Com foco em design responsivo e desenvolvimento frontend moderno, trabalho para criar 
              soluções elegantes que combinam estética e funcionalidade.
            </p>
            
            <p className="text-[var(--foreground-muted)] mb-6">
              Minha jornada no desenvolvimento web começou com [sua história pessoal] e 
              desde então tenho aprimorado minhas habilidades em React, Next.js, TypeScript e 
              design de interfaces.
            </p>
            
            {/* Habilidades */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-[var(--foreground)] mb-3">
                Minhas Habilidades
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX Design', 'Responsive Design', 'Node.js'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-[var(--color4)] text-[var(--foreground)] rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Chamada para ação */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="/contact"
                className="px-6 py-3 bg-[var(--color1)] text-[var(--background)] rounded-md font-medium hover:bg-[var(--color3)] transition-colors"
              >
                Entre em contato
              </a>
              <a 
                href="/files/resume.pdf" 
                className="px-6 py-3 border border-[var(--color1)] text-[var(--color1)] rounded-md font-medium hover:bg-[var(--color4)] transition-colors"
                download
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
        
        {/* Seção de detalhes adicionais */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {/* Educação */}
          <div className="bg-[var(--color4)] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">Educação</h3>
            <ul className="space-y-4">
              <li>
                <p className="font-medium text-[var(--color1)]">2018 - 2022</p>
                <p className="text-[var(--foreground)]">Bacharel em Ciência da Computação</p>
                <p className="text-sm text-[var(--foreground-muted)]">Universidade XYZ</p>
              </li>
              <li>
                <p className="font-medium text-[var(--color1)]">2016 - 2018</p>
                <p className="text-[var(--foreground)]">Técnico em Desenvolvimento Web</p>
                <p className="text-sm text-[var(--foreground-muted)]">Instituto de Tecnologia ABC</p>
              </li>
            </ul>
          </div>
          
          {/* Experiência */}
          <div className="bg-[var(--color4)] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">Experiência</h3>
            <ul className="space-y-4">
              <li>
                <p className="font-medium text-[var(--color1)]">2022 - Presente</p>
                <p className="text-[var(--foreground)]">Desenvolvedor Frontend Senior</p>
                <p className="text-sm text-[var(--foreground-muted)]">Empresa Tech Ltda</p>
              </li>
              <li>
                <p className="font-medium text-[var(--color1)]">2020 - 2022</p>
                <p className="text-[var(--foreground)]">UI/UX Designer</p>
                <p className="text-sm text-[var(--foreground-muted)]">Estúdio Digital</p>
              </li>
            </ul>
          </div>
          
          {/* Hobbies/Interesses */}
          <div className="bg-[var(--color4)] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">Interesses</h3>
            <ul className="space-y-2 text-[var(--foreground-muted)]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color1)] rounded-full"></span>
                <span>Música e produção musical</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color1)] rounded-full"></span>
                <span>Fotografia</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color1)] rounded-full"></span>
                <span>Novas tecnologias</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color1)] rounded-full"></span>
                <span>Desenvolvimento de jogos</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color1)] rounded-full"></span>
                <span>Esportes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
