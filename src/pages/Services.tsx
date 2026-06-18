import { motion } from 'motion/react';
import { Cpu, Globe, Shield, Smartphone, Monitor, CheckCircle } from 'lucide-react';

const services = [
  {
    id: 'digital',
    title: 'Digital Systems & SaaS',
    icon: Cpu,
    desc: 'We build custom software ecosystems tailored for Malawian business workflows. From inventory management to payroll systems, we automate everything.',
    offers: ['Custom SaaS Development', 'Enterprise Resource Planning (ERP)', 'Staff Portals', 'Cloud Hosting Solutions'],
    problemSolved: 'Eliminate manual paperwork, human error, and data bottlenecks in your daily operations.'
  },
  {
    id: 'networking',
    title: 'Networking & Infrastructure',
    icon: Globe,
    desc: 'Build a rock-solid foundation for your business communications with high-speed, secure, and reliable networking solutions.',
    offers: ['Fiber Optic Installation', 'Enterprise Wi-Fi 6 Setup', 'Server Management', 'Structured Cabling'],
    problemSolved: 'Say goodbye to slow internet, dead zones, and dropped video calls during critical meetings.'
  },
  {
    id: 'security',
    title: 'CCTV & Security Systems',
    icon: Shield,
    desc: 'Protect your physical assets with industrial-grade surveillance and smart access control systems integrated with your phone.',
    offers: ['IP Camera Installation', 'Remote Monitoring Setup', 'Biometric Access Control', 'AI-Powered Security Kits'],
    problemSolved: 'Prevent theft and monitor your business from anywhere in the world, 24/7.'
  },
  {
    id: 'telco',
    title: 'Telecommunications',
    icon: Smartphone,
    desc: 'Connect your team across various locations with modern VoIP and unified communication tools designed for efficient collaboration.',
    offers: ['IP-PBX Systems', 'Unified Messaging', 'Video Conferencing Solutions', 'Intercom Setup'],
    problemSolved: 'Reduce high phone bills and improve internal coordination with affordable, modern calling systems.'
  },
  {
    id: 'branding',
    title: 'Branding & Digital Presence',
    icon: Monitor,
    desc: 'Look like the premium brand you are. We craft digital identities that resonate with your customers and drive conversion.',
    offers: ['Logo & UI/UX Design', 'Modern Responsive Websites', 'Social Media Management', 'Search Engine Optimization (SEO)'],
    problemSolved: 'Stand out from competitors and build trust with a professional online identity that converts visitors to clients.'
  }
];

export default function Services() {
  return (
    <div className="pt-20">
      {/* Header with Background */}
      <section className="relative py-24 overflow-hidden mb-20 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2000&auto=format&fit=crop" 
            alt="Services Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-secondary/85 backdrop-blur-[1px]" />
          <motion.div 
            className="absolute inset-0 bg-primary/10 mix-blend-overlay"
            animate={{
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <motion.h1 
            className="text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-slate-300 text-xl max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Professional technology solutions tailored to help businesses in Malawi scale efficiently and securely.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="space-y-32">
          {services.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col lg:row ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''} gap-16 items-center`}
            >
              <div className="lg:w-1/2 space-y-6">
                <motion.div 
                  className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-lg"
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <service.icon size={32} />
                </motion.div>
                <h2 className="text-3xl font-bold text-secondary">{service.title}</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{service.desc}</p>
                
                <div className="space-y-4 pt-4">
                  <h4 className="font-bold text-secondary uppercase tracking-wider text-xs">What We Offer</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.offers.map((offer, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle size={14} className="text-primary" />
                        {offer}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-slate-100 rounded-2xl border-l-4 border-primary mt-6">
                  <h4 className="font-bold text-sm mb-2">Problem it Solves:</h4>
                  <p className="text-slate-600 text-sm italic">"{service.problemSolved}"</p>
                </div>
              </div>

              <div className="lg:w-1/2 bg-slate-200 rounded-3xl overflow-hidden aspect-video shadow-premium hover:shadow-2xl transition-all duration-300 border border-slate-100">
                 <motion.img 
                    src={`https://images.unsplash.com/photo-${i === 0 ? '1551434678-e076c223a692' : i === 1 ? '1558494949-ef010cbdcc51' : i === 2 ? '1558002038-10339d678e60' : i === 3 ? '1520923642038-b4259ace9451' : '1460925895917-afdab827c52f'}?auto=format&fit=crop&q=80&w=800`}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                    whileHover={{ scale: 1.08 }}
                    referrerPolicy="no-referrer"
                 />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
