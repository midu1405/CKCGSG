import LOGO_APP from '../assets/LOGO_MAIN_W.png';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, Calendar, Mail, Users, Star, Handshake, Youtube } from 'lucide-react';
import { PLAYS, CHARITY, OTHER_PROGRAMS } from '../constants';
import { Project } from '../types';
import Modal from '../components/Modal';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';
export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const years = Array.from(
    new Set(OTHER_PROGRAMS.map(p => p.date).filter(d => /^\d{4}$/.test(d)))
  ).sort((a, b) => Number(b) - Number(a));

  const [selectedYear, setSelectedYear] = useState(years[0] ?? '2017');
  const filteredOtherPrograms = OTHER_PROGRAMS.filter(p => p.date === selectedYear);

  return (
    <div>
      <AnimatePresence>
        {selectedProject && (
          <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://picsum.photos/seed/theater/1920/1080?blur=2" alt="Theater Background"
            className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20 md:pt-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-gold uppercase tracking-[0.5em] text-sm font-bold mb-6 block">Hành trình 10 năm +</span>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold serif mb-8 leading-tight">
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
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-card/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
            {[
              { label: 'Năm thành lập', value: '2014', icon: Calendar },
              { label: 'Thành viên', value: '120+', icon: Users },
              { label: 'Vở diễn', value: '15+', icon: Music },
              { label: 'Sứ mệnh', value: 'Loan Báo', icon: Star },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <stat.icon className="mx-auto text-gold/50 mb-4" size={32} />
                <div className="text-4xl font-bold serif mb-2">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeader title="Câu Chuyện Của Chúng Tôi"
                subtitle="Hành trình hơn 10 năm mang Tin Mừng đến với mọi người thông qua nghệ thuật ca kịch." />
              <div className="space-y-6 text-white/70 leading-relaxed font-light">
                <p>Nhóm Ca Kịch Công Giáo Sài Gòn được thành lập vào tháng 5 năm 2014 bởi anh Jean Kiệt, bắt đầu với 33 thành viên đầy nhiệt huyết. Với sứ mệnh mang Tin Mừng của Chúa đến với mọi người thông qua nghệ thuật ca kịch, nhóm hy vọng có thể lan tỏa tình yêu và đức tin đến khắp nơi.</p>
                <p>Điều đặc biệt của nhóm là các buổi diễn hoàn toàn miễn phí, không bán vé và không có cát xê. Tất cả thành viên đều tham gia trên tinh thần tự nguyện và cống hiến, với mong muốn mang đến niềm vui và cảm hứng cho cộng đồng qua những vở diễn đầy ý nghĩa.</p>
                <p>Bước sang cột mốc 10 năm, nhóm đã có hơn 120 thành viên - là những con người nhiệt thành, yêu nghệ thuật, và cùng chia sẻ niềm tin vào sứ mệnh của nhóm.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                <img src="https://picsum.photos/seed/ckcgsg-story/800/1000" alt="Our Story"
                  className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
      <section id="plays" className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Các Vở Ca Kịch"
            subtitle="Kể những câu chuyện hùng vĩ của Kinh Thánh thông qua hình thức nghệ thuật nhạc kịch." icon={Music} />
          <div className="mb-20">
            <h3 className="text-2xl font-semibold serif mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Dự án sắp ra mắt
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {PLAYS.filter(p => p.status === 'upcoming').map(project => (
                <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
              ))}
            </div>
            
<div className="mt-8 text-center">
  <Link to="/dac-lo" className="inline-flex items-center gap-2 bg-gold text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-all">
    XEM CHI TIẾT VỞ ĐẮC LỘ
  </Link>
</div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold serif mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Kho lưu trữ vở diễn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {PLAYS.filter(p => p.status === 'archived')
                .sort((a, b) => parseInt(b.date?.toString() ?? '0') - parseInt(a.date?.toString() ?? '0'))
                .map(project => (
                  <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Charity Section */}
      <section id="charity" className="py-16 md:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Thiện Nguyện"
            subtitle="Hành trình lan tỏa yêu thương đến những mảnh đời khó khăn thông qua các hoạt động cộng đồng." icon={Heart} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {CHARITY.map(project => (
              <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Programs Section */}
      <section id="other" className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Các Chương Trình Khác"
            subtitle="Các hoạt động văn hóa, nghệ thuật và cộng đồng khác của nhóm CKCGSG qua các năm." icon={Star} />
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {years.map(year => (
              <button key={year} onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedYear === year ? 'bg-gold text-black shadow-lg shadow-gold/20 scale-110' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                }`}>
                {year}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={selectedYear} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {filteredOtherPrograms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                  <p className="text-white/50 max-w-md mx-auto">Chúng tôi đang chuẩn bị tư liệu. Vui lòng quay lại sau.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-20">
            <div>
              <SectionHeader title="Liên Hệ & Ủng Hộ"
                subtitle="Chúng tôi luôn trân trọng mọi sự đóng góp và đồng hành từ quý ân nhân để tiếp tục sứ vụ." icon={Mail} />
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
                <button type="button" className="w-full bg-gold text-black font-bold py-4 rounded-xl hover:bg-white transition-all duration-300">
                  GỬI TIN NHẮN
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}