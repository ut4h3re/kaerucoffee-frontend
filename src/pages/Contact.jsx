import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageCircle, HelpCircle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
 
    toast.success("Pesan terkirim!", {
      description: "Tim Kopi Kirkan akan segera menghubungi Anda.",
      duration: 5000,
    });
    e.target.reset();
  };

  const faqs = [
    {
      q: "Apakah bisa reservasi tempat?",
      a: "Tentu! Untuk kegiatan komunitas atau meeting, silakan hubungi nomor telepon outlet terdekat kami minimal 24 jam sebelumnya."
    },
    {
      q: "Apakah tersedia biji kopi (beans) untuk dibawa pulang?",
      a: "Ya, kami menyediakan berbagai pilihan Whole Beans (Arabica & House Blend) yang dipanggang secara fresh di roastery kami."
    },
    {
      q: "Apakah Kopi Kirkan membuka peluang franchise?",
      a: "Saat ini kami fokus pada pengembangan outlet internal, namun kami sangat terbuka untuk kolaborasi event. Hubungi kami melalui form ini!"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="pt-36 pb-20 bg-[#FDFBF7] min-h-screen"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-10">
              <span className="text-gold font-bold tracking-[0.3em] text-xs uppercase mb-3 block">Connect With Us</span>
              <h2 className="text-5xl font-serif text-coffee-dark mb-6">Let's Talk Coffee</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Punya pertanyaan tentang menu kami, kerjasama bisnis, atau sekadar ingin menyapa? Kami selalu senang mendengar cerita Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-coffee-dark/5">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                  <Input 
                    placeholder="Nama Lengkap" 
                    className="rounded-full bg-beige/20 border-none py-7 px-6 focus-visible:ring-gold" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="email@example.com" 
                    className="rounded-full bg-beige/20 border-none py-7 px-6 focus-visible:ring-gold" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4">Your Message</label>
                <textarea 
                  className="w-full h-40 p-6 rounded-[2rem] border-none bg-beige/20 focus:ring-2 focus:ring-gold outline-none transition-all resize-none" 
                  placeholder="Ceritakan pesan Anda di sini..."
                  required
                ></textarea>
              </div>

              <Button 
                type="submit"
                className="w-full bg-coffee-dark text-beige py-8 rounded-full text-sm font-black tracking-[0.2em] hover:bg-gold hover:text-coffee-dark transition-all shadow-lg flex gap-3 group"
              >
                SEND MESSAGE <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:pt-10"
          >
            <div className="bg-coffee-dark p-12 rounded-[3rem] text-beige mb-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <MessageCircle size={120} />
              </div>
              <h3 className="text-2xl font-serif mb-4 flex items-center gap-3">
                Quick Response <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
              </h3>
              <p className="text-beige/60 text-sm mb-8 leading-relaxed">
                Kami biasanya merespons pesan dalam waktu kurang dari 24 jam kerja.
              </p>
              <div className="space-y-4">
                <a href="mailto:hello@kopikirkan.com" className="flex items-center gap-4 text-gold hover:text-white transition-colors">
                  <Mail size={20} /> hello@kopikirkan.com
                </a>
              </div>
            </div>

            <div className="px-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gold/10 p-2 rounded-lg text-gold">
                  <HelpCircle size={24} />
                </div>
                <h3 className="text-2xl font-serif text-coffee-dark">Pertanyaan Populer</h3>
              </div>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-none bg-white rounded-2xl px-6 shadow-sm">
                    <AccordionTrigger className="hover:no-underline hover:text-gold text-left font-serif text-coffee-dark py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Contact;