import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Send, Globe } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import emailjs from '@emailjs/browser';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Save to Database (Firebase)
      await addDoc(collection(db, 'inquiries'), {
        ...formState,
        createdAt: serverTimestamp(),
      });

      // 2. Send Email (Optional - requires environment variables)
      // We wrap this in another try-catch so it doesn't block the UI if email fails
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
          await emailjs.send(
            serviceId,
            templateId,
            {
              full_name: formState.name,
              email: formState.email,
              phone: formState.phone,
              service: formState.service,
              message: formState.message,
              to_email: 'sincerahtech@gmail.com',
            },
            publicKey
          );
        }
      } catch (emailErr) {
        console.error('Email failed to send but data was saved:', emailErr);
      }

      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      setErrorMessage('Failed to send inquiry. Please check your connection or try again later.');
      handleFirestoreError(error, OperationType.CREATE, 'inquiries');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-hex">
      {/* Header with Background */}
      <section className="relative py-24 overflow-hidden mb-20 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2070&auto=format&fit=crop" 
            alt="Contact Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-secondary/85" />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-white"
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
            Let's Talk Tech
          </motion.h1>
          <motion.p 
            className="text-slate-300 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Have a project in mind or need a professional consultation? Reach out today.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-24">

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"
                whileHover={{ scale: 1.1, rotate: 6 }}
              >
                <Phone size={24} />
              </motion.div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-secondary">Call Us Anywhere</h4>
                <a href="tel:+265899816745" className="text-slate-600 hover:text-primary transition-colors text-lg tracking-wide">+265 899 816 745</a>
                <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">Mon - Fri • 8:00 AM - 5:00 PM</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <motion.div 
                className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0"
                whileHover={{ scale: 1.1, rotate: 6 }}
              >
                <Mail size={24} />
              </motion.div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-secondary">Email Support</h4>
                <a href="mailto:sincerahtech@gmail.com" className="text-slate-600 hover:text-primary transition-colors">sincerahtech@gmail.com</a>
                <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">Always monitoring incoming requests</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4, shadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <motion.div 
                className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0"
                whileHover={{ scale: 1.1, rotate: 6 }}
              >
                <MapPin size={24} />
              </motion.div>
              <div>
                <h4 className="font-bold text-lg mb-1 text-secondary">Our Location</h4>
                <p className="text-slate-600">Lilongwe Area 49, Malawi</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-bold">
                    <Globe size={12} /> View on Local Map
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="rounded-3xl overflow-hidden h-64 shadow-inner border border-slate-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.664421111663!2d33.7667!3d-13.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921f47b97e937d5%3A0x600b3e6b5b5b5b5b!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2s!4v1714040000000!5m2!1sen!2s" 
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white p-8 md:p-12 rounded-[40px] shadow-premium border border-slate-100"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                   <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send size={40} />
                   </div>
                   <h3 className="text-3xl font-bold mb-4">Request Sent!</h3>
                   <p className="text-slate-600 mb-8">Thank you for reaching out. Our team will contact you within the next 24 hours.</p>
                   <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary font-bold hover:underline"
                   >
                     Send another message
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700">Full Name</label>
                       <input 
                        required
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="John Phiri"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-700">Phone Number</label>
                       <input 
                        required
                        type="tel" 
                        value={formState.phone}
                        onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="+265 8..."
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700">Email Address</label>
                     <input 
                      required
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="john@business.co.mw"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700">Interested In</label>
                     <select 
                      value={formState.service}
                      onChange={(e) => setFormState({...formState, service: e.target.value})}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                     >
                       <option value="">Select a service</option>
                       <option value="digital">Digital Systems</option>
                       <option value="networking">Networking & Infrastructure</option>
                       <option value="security">CCTV & Security</option>
                       <option value="branding">Branding & Web</option>
                     </select>
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700">Project Details</label>
                     <textarea 
                       required
                       rows={4}
                       value={formState.message}
                       onChange={(e) => setFormState({...formState, message: e.target.value})}
                       className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                       placeholder="How can we help you grow?"
                     />
                  </div>

                  <motion.button 
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full py-5 teal-gradient text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:shadow-2xl transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={20} />
                        Get a Professional Quote
                      </>
                    )}
                  </motion.button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                    <MessageSquare size={14} className="text-primary" />
                    Or chat with us via the WhatsApp button below
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
