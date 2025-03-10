const Footer = () => {
    return (
      <footer className="bg-[var(--color4)] text-[var(--foreground)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© {new Date().getFullYear()} Prod by GUS. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--foreground-muted)] hover:text-[var(--color1)] transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;