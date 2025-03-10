import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-[var(--background)]">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
            <span className="block">Hi, I'm Gustavo</span>
            <span className="block text-[var(--color1)]">Web Developer & Designer</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-[var(--foreground-muted)] sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            I create beautiful, responsive websites and applications using modern technologies.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/projects"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[var(--background)] bg-[var(--color1)] hover:bg-[var(--color3)] transition-colors md:py-4 md:text-lg md:px-10"
              >
                View My Work
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/contact"
                className="w-full flex items-center justify-center px-8 py-3 border border-[var(--color1)] text-base font-medium rounded-md text-[var(--color1)] bg-[var(--background)] hover:bg-[var(--color4)] transition-colors md:py-4 md:text-lg md:px-10"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;