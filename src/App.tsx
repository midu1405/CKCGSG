/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import LOGO_APP from './assets/LOGO_MAIN_W.png';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Youtube, 
  Heart, 
  Music, 
  Calendar, 
  Mail, 
  ChevronRight, 
  ChevronLeft,
  Image as ImageIcon,
  ExternalLink,
  Users,
  Star,
  Handshake
} from 'lucide-react';
import { PLAYS, CHARITY, OTHER_PROGRAMS } from './constants';
import { Project } from './types';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', href: '#home' },
    { name: 'Ca Kịch', href: '#plays' },
    { name: 'Thiện Nguyện', href: '#charity' },
    { name: 'Các Chương Trình Khác', href: '#other' },
    { name: 'Liên Hệ', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <img 
    src={LOGO_APP} 
    alt="CKCGSG Logo" 
    className="h-20 w-auto object-contain filter drop-shadow(0 0 5px rgba(255,215,0,0.3))"// Chỉnh h-20 (độ cao) cho to hehe
  />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-t border-white/10 py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Modal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const allImages = project.images ? [project.imageUrl, ...project.images] : [project.imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-card border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white z-20 bg-black/50 p-2 rounded-full backdrop-blur-md"
        >
          <X size={24} />
        </button>
        
        <div className="aspect-video w-full overflow-hidden relative group bg-black/20">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={allImages[currentImageIndex]} 
              alt={`${project.title} - ${currentImageIndex + 1}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {allImages.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-black z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-black z-10"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-gold w-6' : 'bg-white/30'}`}
                  />
                ))}
              </div>

              <div className="absolute top-6 left-6 bg-black/50 px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-widest uppercase backdrop-blur-md z-10">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}
        </div>
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">Dự án CKCGSG</span>
            {project.date && <span className="text-white/30 text-xs font-mono">{project.date}</span>}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold serif mb-8 text-gold">{project.title}</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-white/80 leading-relaxed mb-8 font-light italic border-l-4 border-gold pl-6">
              {project.description}
            </p>
            <div className="text-white/60 leading-relaxed space-y-6 text-lg">
              {project.content?.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          
          <div className="mt-12 pt-12 border-t border-white/5 flex flex-wrap gap-4">
            {project.youtubeUrl && (
              <a 
                href={project.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all flex items-center gap-2"
              >
                <Youtube size={20} />
                XEM TRÊN YOUTUBE
              </a>
            )}
            <button className="bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-all">
              CHIA SẺ BÀI VIẾT
            </button>
            <button 
              onClick={onClose}
              className="border border-white/10 px-8 py-3 rounded-full font-bold hover:bg-white/5 transition-all"
            >
              QUAY LẠI
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  key?: string | number;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onClick={() => onClick(project)}
      className="group relative bg-card border border-white/5 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm group-hover:opacity-40"
          referrerPolicy="no-referrer"
        />
        
        {/* Gallery Indicator */}
        {project.images && project.images.length > 0 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-lg text-gold flex items-center gap-2 z-10 border border-white/10 group-hover:scale-110 transition-transform">
            <ImageIcon size={16} />
            <span className="text-[10px] font-bold tracking-widest">+{project.images.length}</span>
          </div>
        )}

        {/* Overlay Info on Hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="text-gold text-xs font-bold uppercase tracking-widest mb-2">Xem chi tiết</div>
          <h3 className="text-2xl font-bold serif text-white mb-3">{project.title}</h3>
          <p className="text-white/70 text-sm line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex items-center text-gold text-sm font-bold gap-2">
            ĐỌC BÀI VIẾT <ChevronRight size={16} />
          </div>
        </div>

        {/* Default Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
        
        {/* Static Title (Visible when not hovered) */}
        <div className="absolute bottom-0 left-0 w-full p-8 group-hover:opacity-0 transition-opacity duration-500">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-gold/60 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">CKCGSG</div>
              <h3 className="text-xl font-bold serif text-white">{project.title}</h3>
            </div>
            {project.date && <span className="text-[10px] text-white/30 font-mono">{project.date}</span>}
          </div>
        </div>

        {project.status === 'upcoming' && (
          <div className="absolute top-4 left-4 bg-gold text-black px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter z-10">
            Sắp ra mắt
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, subtitle, icon: Icon }: { title: string, subtitle?: string, icon?: any }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="text-gold" size={24} />}
      <span className="text-gold uppercase tracking-[0.3em] text-xs font-bold">CKCGSG</span>
    </div>
    <h2 className="text-4xl md:text-5xl font-bold serif mb-4">{title}</h2>
    {subtitle && <p className="text-white/50 max-w-2xl text-lg leading-relaxed">{subtitle}</p>}
  </div>
);

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedYear, setSelectedYear] = useState('2024');
  const years = Array.from({ length: 2026 - 2014 + 1 }, (_, i) => (2014 + i).toString()).reverse();

  const filteredOtherPrograms = OTHER_PROGRAMS.filter(p => p.date === selectedYear);

  return (
    <div className="min-h-screen selection:bg-gold selection:text-black">
      <Navbar />

      <AnimatePresence>
        {selectedProject && (
          <Modal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/theater/1920/1080?blur=2" 
            alt="Theater Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.5em] text-sm font-bold mb-6 block">Hành trình 10 năm +</span>
            <h1 className="text-6xl md:text-8xl font-bold serif mb-8 leading-tight">
              Mang Tin Mừng Qua <br />
              <span className="text-gold italic">Nghệ Thuật Ca Kịch</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Nhóm Ca Kịch Công Giáo Sài Gòn lan tỏa tình yêu và đức tin thông qua những vở diễn đầy ý nghĩa, hoàn toàn miễn phí cho cộng đồng.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="#plays" className="w-full sm:w-auto bg-gold text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 shadow-lg shadow-gold/20">
                KHÁM PHÁ VỞ DIỄN
              </a>
              <a href="#contact" className="w-full sm:w-auto border border-white/20 hover:border-gold px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                THAM GIA CÙNG CHÚNG TÔI
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section (Stats) */}
      <section className="py-24 bg-card/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Năm thành lập', value: '2014', icon: Calendar },
              { label: 'Thành viên', value: '120+', icon: Users },
              { label: 'Vở diễn', value: '15+', icon: Music },
              { label: 'Sứ mệnh', value: 'Loan Báo', icon: Star },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="mx-auto text-gold/50 mb-4" size={32} />
                <div className="text-4xl font-bold serif mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader 
                title="Câu Chuyện Của Chúng Tôi" 
                subtitle="Hành trình hơn 10 năm mang Tin Mừng đến với mọi người thông qua nghệ thuật ca kịch."
              />
              <div className="space-y-6 text-white/70 leading-relaxed font-light">
                <p>
                  Nhóm Ca Kịch Công Giáo Sài Gòn được thành lập vào tháng 5 năm 2014 bởi anh Jean Kiệt, bắt đầu với 33 thành viên đầy nhiệt huyết. Với sứ mệnh mang Tin Mừng của Chúa đến với mọi người thông qua nghệ thuật ca kịch, nhóm hy vọng có thể lan tỏa tình yêu và đức tin đến khắp nơi.
                </p>
                <p>
                  Điều đặc biệt của nhóm là các buổi diễn hoàn toàn miễn phí, không bán vé và không có cát xê. Tất cả thành viên đều tham gia trên tinh thần tự nguyện và cống hiến, với mong muốn mang đến niềm vui và cảm hứng cho cộng đồng qua những vở diễn đầy ý nghĩa.
                </p>
                <p>
                  Bước sang cột mốc 10 năm, nhóm đã có hơn 120 thành viên - là những con người nhiệt thành, yêu nghệ thuật, và cùng chia sẻ niềm tin vào sứ mệnh của nhóm.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                <img 
                  src="https://picsum.photos/seed/ckcgsg-story/800/1000" 
                  alt="Our Story"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-gold p-8 rounded-2xl text-black hidden md:block">
                <div className="text-5xl font-bold serif mb-1">10+</div>
                <div className="text-sm font-bold uppercase tracking-widest">Năm Hành Trình</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plays Section */}
      <section id="plays" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Các Vở Ca Kịch" 
            subtitle="Kể những câu chuyện hùng vĩ của Kinh Thánh thông qua hình thức nghệ thuật nhạc kịch."
            icon={Music}
          />

          {/* Upcoming */}
          <div className="mb-20">
            <h3 className="text-2xl font-semibold serif mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gold" />
              Dự án sắp ra mắt
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {PLAYS.filter(p => p.status === 'upcoming').map(project => (
                <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
              ))}
            </div>
          </div>

          {/* Archive */}
          <div>
            <h3 className="text-2xl font-semibold serif mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gold" />
              Kho lưu trữ vở diễn
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PLAYS.filter(p => p.status === 'archived').map(project => (
                <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Charity Section */}
      <section id="charity" className="py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Thiện Nguyện" 
            subtitle="Hành trình lan tỏa yêu thương đến những mảnh đời khó khăn thông qua các hoạt động cộng đồng."
            icon={Heart}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CHARITY.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects Section */}
      <section id="other" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Các Chương Trình Khác" 
            subtitle="Các hoạt động văn hóa, nghệ thuật và cộng đồng khác của nhóm CKCGSG qua các năm."
            icon={Star}
          />
          
          {/* Year Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedYear === year 
                    ? 'bg-gold text-black shadow-lg shadow-gold/20 scale-110' 
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredOtherPrograms.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredOtherPrograms.map(project => (
                    <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-3xl p-16 text-center">
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
                    <Calendar size={40} />
                  </div>
                  <h3 className="text-2xl font-bold serif mb-4">Đang cập nhật nội dung năm {selectedYear}</h3>
                  <p className="text-white/50 max-w-md mx-auto">
                    Chúng tôi đang chuẩn bị tư liệu cho các chương trình trong năm này. Vui lòng quay lại sau để cập nhật những hoạt động mới nhất.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Đồng Hành & Cộng Tác" 
            subtitle="Tri ân những đơn vị truyền thông, ân nhân và đối tác đã luôn sát cánh cùng chúng tôi trong mọi dự án."
            icon={Handshake}
          />
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 mt-16">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: (i % 5) * 0.1 }}
                viewport={{ once: true }}
                className="aspect-square bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center p-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:border-gold/30 transition-all duration-500 group"
              >
                <div className="text-[10px] font-bold text-white/20 group-hover:text-gold/50 tracking-widest uppercase">
                  Partner Logo {i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <SectionHeader 
                title="Liên Hệ & Ủng Hộ" 
                subtitle="Chúng tôi luôn trân trọng mọi sự đóng góp và đồng hành từ quý ân nhân để tiếp tục sứ vụ."
                icon={Mail}
              />
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-white/40 uppercase tracking-widest font-bold mb-1">Email</div>
                    <div className="text-xl">ckcgsg@gmail.com</div>
                  </div>
                </div>

                <div className="p-8 bg-white/5 rounded-2xl border border-white/5">
                  <h4 className="text-lg font-bold serif text-gold mb-4 uppercase tracking-widest">Thông tin chuyển khoản</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/40">Chủ tài khoản</span>
                      <span className="font-bold">DINH NGUYEN NHA THANH</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-white/40">Số tài khoản</span>
                      <span className="font-bold text-gold">41353947</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Nội dung</span>
                      <span className="font-bold">[HO TEN]_UNG HO CKCGSG</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black p-10 rounded-3xl border border-white/5 shadow-2xl">
              <h3 className="text-2xl font-bold serif mb-8">Gửi tin nhắn cho chúng tôi</h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-white/40">Họ và tên</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-white/40">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="example@gmail.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Chủ đề</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="Hợp tác / Ủng hộ / Tham gia" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40">Tin nhắn</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors" placeholder="Nội dung tin nhắn..." />
                </div>
                <button className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-lg shadow-gold/10">
                  GỬI TIN NHẮN
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black font-bold text-sm serif">CK</div>
            <span className="text-sm font-semibold tracking-wider serif">CKCGSG</span>
          </div>
          <div className="text-white/30 text-xs uppercase tracking-widest font-medium">
            © 2024 Nhóm Ca Kịch Công Giáo Sài Gòn. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-gold transition-colors"><Youtube size={20} /></a>
            <a href="#" className="text-white/40 hover:text-gold transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
