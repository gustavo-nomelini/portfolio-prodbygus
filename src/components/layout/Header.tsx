import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-[var(--background)] shadow-md shadow-[var(--color2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[var(--color1)]">Prod by GUS</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-[var(--foreground)] hover:text-[var(--color1)] transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-[var(--foreground)] hover:text-[var(--color1)] transition-colors">
              About
            </Link>
            <Link href="/projects" className="text-[var(--foreground)] hover:text-[var(--color1)] transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="text-[var(--foreground)] hover:text-[var(--color1)] transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;