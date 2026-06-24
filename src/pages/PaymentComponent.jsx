import React from 'react';
// Import komponen yang baru dibuat (sesuaikan jalurnya/path)
import PaymentComponent from '../components/PaymentComponent'; 

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-8">
      <h1 className="text-2xl font-serif text-[#3E2723] mb-6">Selesaikan Pembayaran Anda</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sisi Kiri: Detail Pesanan */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-bold mb-4">Ringkasan Pesanan</h3>
          {/* ... Detail pesananmu ... */}
        </div>

        {/* Sisi Kanan: Panggil Komponen QR Code */}
        <div>
          <PaymentComponent />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;