import LOGO_APP from '../assets/LOGO_MAIN_W.png';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Trang Chủ', href: '/', section: null },
  { name: 'Ca Kịch', href: '/#plays', section: 'plays' },
  { name: 'Thiện Nguyện', href: '/#charity', section: 'charity' },
  { name: 'Các Chương Trình Khác', href: '/#other', section: 'other' },
  { name: 'Liên Hệ', href: '/#contact', section: 'contact' },
];

const NavItem = ({ link, onClick, className }: { link: typeof navLinks[0], onClick: () => void, className: string }) => {
  return (
    <a href={link.href} onClick={onClick} className={className}>
      {link.name}
    </a>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (link: typeof navLinks[0]) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      if (link.section === null) {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (location.pathname === '/') {
        const el = document.getElementById(link.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        const sectionId = link.section;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };
  };

  const navClass = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'
  }`;

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={LOGO_APP} alt="CKCGSG Logo" className="h-20 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavItem
              key={link.name}
              link={link}
              onClick={handleClick(link)}
              className="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 font-medium cursor-pointer"
            />
          ))}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-t border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <NavItem
                key={link.name}
                link={link}
                onClick={handleClick(link)}
                className="text-lg uppercase tracking-widest hover:text-gold transition-colors cursor-pointer"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;