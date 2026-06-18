import { Check, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const packages = [
  {
    name: 'Starter Package',
    description: 'Perfect for small offices, shops, or startups getting started.',
    features: [
      'Basic Digital Management System',
      'High-Speed Wi-Fi Setup',
      'Branding Starter (Logo + Business Cards)',
      '1–2 Smart CCTV Cameras',
      '1 Month Remote Support',
      'Basic Email Setup'
    ],
    price: 'Starter',
    highlight: false
  },
  {
    name: 'Growth Package',
    description: 'Ideal for medium-sized businesses looking to optimize operations.',
    features: [
      'Full Operational System Integration',
      'Professional Networking (Fiber Optic Ready)',
      'Advanced Security (4–8 CCTV Cameras)',
      'Premium Responsive Website',
      'Full Brand Identity Design',
      '6 Months Priority Support',
      'Employee Training Session'
    ],
    price: 'Recommended',
    highlight: true
  },
  {
    name: 'Smart Operations Package',
    description: 'Enterprise-grade solutions for large organizations.',
    features: [
      'Custom Software/APP Development',
      'Full Infrastructure Architecture',
      'End-to-End Workflow Automation',
      'Advanced Analytics Dashboards',
      'Biometric & Smart Access Control',
      '24/7 Dedicated Account Manager',
      'Quarterly Performance Audits'
    ],
    price: 'Enterprise',
    highlight: false
  }
];

export default function Packages() {
  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Header with Background */}
      <section className="relative py-24 overflow-hidden mb-20 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
            alt="Packages Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-secondary/85" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50"
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Execution Plans
          </motion.h1>
          <motion.p 
            className="text-slate-300 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Strategic technology bundles designed to take your business to the next level.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-24">

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative bg-white rounded-3xl p-10 border flex flex-col transition-all ${pkg.highlight ? 'border-primary shadow-premium mt-[-10px]' : 'border-slate-100 shadow-soft hover:shadow-premium'}`}
            >
              {pkg.highlight && (
                <motion.div 
                  className="absolute -top-5 left-1/2 -ml-20 bg-primary text-white text-[10px] tracking-widest uppercase font-bold px-8 py-2 rounded-full shadow-lg"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Most Popular
                </motion.div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3 text-secondary">{pkg.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pkg.description}</p>
              </div>

              <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                 <span className="text-primary font-bold text-3xl">{pkg.price}</span>
              </div>

              <div className="flex-grow mb-10">
                <h4 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">Service Inclusions</h4>
                <ul className="space-y-4">
                  {pkg.features.map((feat, j) => (
                    <motion.li 
                      key={j} 
                      className="flex items-start gap-3 text-sm text-slate-700"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.05 }}
                    >
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="text-primary" />
                      </div>
                      {feat}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full">
                <Link 
                  to="/contact" 
                  className={`block w-full py-4 rounded-2xl font-bold text-center transition-all ${pkg.highlight ? 'teal-gradient text-white shadow-xl shadow-primary/30 hover:shadow-2xl' : 'bg-secondary text-white hover:bg-opacity-95'}`}
                >
                  {pkg.highlight ? 'Get Started' : 'Inquire Now'}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 p-8 rounded-3xl bg-secondary text-white flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ boxShadow: "0 20px 40px rgba(15, 185, 177, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-6">
            <motion.div 
              className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0"
              whileHover={{ scale: 1.1, rotate: 6 }}
            >
               <Info size={32} className="text-primary" />
            </motion.div>
            <div>
              <h4 className="text-xl font-bold">Need a Custom Bundle?</h4>
              <p className="text-slate-400">All our services can be customized to fit your specific operational scale.</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link to="/contact" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all whitespace-nowrap">
              Build Custom Plan
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
