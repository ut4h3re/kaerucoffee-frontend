import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#3E2723] text-[#F2E8D5] pt-16 pb-8">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-serif mb-6 text-[#D4AF37]">Kaeru Coffee</h3>
          <p className="text-[#F2E8D5]/60 max-w-sm mb-6 leading-relaxed">
            Menyajikan kualitas kopi artisan terbaik langsung ke tangan Anda. 
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 rounded-full border border-[#F2E8D5]/20 hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all">
              IG
            </a>
            <a href="#" className="p-2 rounded-full border border-[#F2E8D5]/20 hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all">
              FB
            </a>
            <a href="#" className="p-2 rounded-full border border-[#F2E8D5]/20 hover:bg-[#D4AF37] hover:text-[#3E2723] transition-all">
              TT
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-[#F2E8D5]">Kontak Kami</h4>
          <ul className="space-y-4 text-[#F2E8D5]/60 text-sm">
            <li>📧 info@kaerucoffee.com</li>
            <li>📞 +62 812 3456 7890</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-[#F2E8D5]">Jam Operasional</h4>
          <ul className="space-y-2 text-[#F2E8D5]/60 text-sm">
            <li>Senin - Jumat: 08:00 - 22:00</li>
            <li>Sabtu - Minggu: 09:00 - 23:00</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-[#F2E8D5]/10 mt-16 pt-8 text-center text-sm text-[#F2E8D5]/40">
        <p>&copy; {new Date().getFullYear()} Kaeru Coffee. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;