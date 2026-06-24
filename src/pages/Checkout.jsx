import React, { useState, useEffect } from 'react';
import { CreditCard, QrCode, CheckCircle, ArrowLeft, Copy, Clock, Upload, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('qris'); // 'qris' atau 'va'
  const [selectedBank, setSelectedBank] = useState('bca');
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // State Data User & Bukti Transaksi
  const [userData, setUserData] = useState({ id: null, name: 'Guest', email: 'guest@mail.com' });
  const [proofOfPayment, setProofOfPayment] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Ambil data keranjang belanja
    const savedCart = JSON.parse(localStorage.getItem('kopikirkan_cart')) || [];
    setCartItems(savedCart);

    // Ambil data user yang login dari sistem Kaeru Coffee
    const savedUser = JSON.parse(localStorage.getItem('kaeru_user'));
    if (savedUser) {
      setUserData({
        id: savedUser.id ? parseInt(savedUser.id) : null,
        name: savedUser.name || 'Pelanggan Kaeru',
        email: savedUser.email || '-'
      });
    }

    // Membersihkan preview URL saat komponen tidak lagi digunakan demi mencegah kebocoran memori
    return () => {
      if (proofPreview) {
        URL.revokeObjectURL(proofPreview);
      }
    };
  }, [proofPreview]);

  // Fungsi pengonversi harga fleksibel (Membaca format angka murni maupun format string 'k')
  const cleanPrice = (priceVal) => {
    if (typeof priceVal === 'number') return priceVal;
    if (typeof priceVal === 'string') {
      let numeric = parseInt(priceVal.replace('k', '').replace(/[^0-9]/g, ''));
      if (priceVal.includes('k')) {
        numeric = numeric * 1000;
      }
      return numeric || 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      return acc + (cleanPrice(item.price) * item.quantity);
    }, 0);
  };

  const handleCopyVA = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handler Upload File Bukti Bayar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi Ekstensi Gambar Dasar di Sisi Klien
      if (!file.type.startsWith('image/')) {
        alert('Format file salah! Silakan pilih berkas gambar berbentuk JPG, JPEG, atau PNG.');
        return;
      }
      setProofOfPayment(file);
      setProofPreview(URL.createObjectURL(file));
    }
  };

  // 🔥 SINKRONISASI UTAMA: Mengemas Form Data & Menormalkan Struktur Objek Item untuk DB order_items
  const handleSimulatePayment = async () => {
    if (isSubmitting) return;

    if (!proofOfPayment) {
      alert('Silakan pilih dan unggah foto bukti transfer terlebih dahulu sebelum menyelesaikan pesanan.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Keranjang belanja Anda kosong.');
      return;
    }

    setIsSubmitting(true);

    // Selaraskan format array item agar properti id, price, dan quantity aman terbaca integer oleh backend
    const normalizedItems = cartItems.map(item => ({
      id: parseInt(item.id.toString().replace(/[^0-9]/g, '')), // Menjamin ID bersih dari noise string
      name: item.name,
      price: cleanPrice(item.price),
      quantity: parseInt(item.quantity)
    }));

    // Membungkus data ke dalam skema FormData (Multipart/Form-Data)
    const formData = new FormData();
    formData.append('userId', userData.id !== null ? userData.id : '');
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('total', calculateTotal());
    formData.append('method', paymentMethod === 'va' ? `VA_${selectedBank.toUpperCase()}` : 'QRIS');
    
    // Kirim array objek items yang telah dinormalisasi
    formData.append('items', JSON.stringify(normalizedItems));
    
    // Harus sinkron dengan: upload.single('paymentProof') di server.js
    formData.append('paymentProof', proofOfPayment);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        body: formData // Kirim langsung data multipart tanpa header Content-Type buatan
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Gagal mengirimkan rincian pesanan ke server.');
      }

      // Bersihkan seluruh berkas simpanan keranjang belanja lokal setelah sukses lunas
      localStorage.removeItem('kopikirkan_cart');
      
      // Mengirim sinyal pembaruan komponen Navbar (jika ada)
      window.dispatchEvent(new Event('cartUpdate'));
      
      // Beralih ke layar nota sukses
      setIsPaid(true);

    } catch (err) {
      console.error('Error pengiriman transaksi:', err);
      alert(`Gagal memproses pesanan: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // TAMPILAN NOTA / RECEIPT (Jika IsPaid === True)
  if (isPaid) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#FDFBF7] flex items-center justify-center px-6">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#3E2723] mb-2">Pembayaran Sukses!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Pesanan Kaeru Coffee milikmu telah diteruskan ke barista dan dicatat di database. Silakan tunggu minuman Anda.
          </p>
          <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-dashed border-gray-200 text-left mb-8 text-sm space-y-2">
            <div className="flex justify-between font-medium">
              <span className="text-gray-400">Nama Pemesan:</span>
              <span className="text-[#3E2723] font-bold">{userData.name}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-gray-400">Metode:</span>
              <span className="uppercase text-[#3E2723] font-bold">
                {paymentMethod} {paymentMethod === 'va' && `(${selectedBank})`}
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-gray-400">Total Bayar:</span>
              <span className="text-[#3E2723] font-bold">Rp {calculateTotal().toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-gray-400">Status File Bukti:</span>
              <span className="text-green-600 font-bold">Berhasil Tersimpan</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-[#3E2723] text-white py-3.5 rounded-full font-bold text-sm hover:bg-[#D4AF37] transition-all"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#FDFBF7] text-[#3E2723] flex justify-center">
      <div className="w-[94%] max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* === SEKSI KIRI: PILIHAN PEMBAYARAN & UPLOAD (65%) === */}
        <div className="lg:col-span-8 space-y-6 w-full">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#3E2723] mb-2 transition-colors">
            <ArrowLeft size={16} /> Kembali ke Keranjang
          </Link>
          
          <h1 className="text-3xl font-serif font-bold text-[#3E2723]">Metode Pembayaran</h1>

          {/* Opsi Tab QRIS / VA */}
          <div className="grid grid-cols-2 gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <button
              onClick={() => setPaymentMethod('qris')}
              className={`flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm transition-all ${
                paymentMethod === 'qris'
                  ? 'bg-[#3E2723] text-white shadow-md'
                  : 'text-gray-500 hover:bg-[#FDFBF7]'
              }`}
            >
              <QrCode size={18} /> QRIS / E-Wallet
            </button>
            <button
              onClick={() => setPaymentMethod('va')}
              className={`flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm transition-all ${
                paymentMethod === 'va'
                  ? 'bg-[#3E2723] text-white shadow-md'
                  : 'text-gray-500 hover:bg-[#FDFBF7]'
              }`}
            >
              <CreditCard size={18} /> Virtual Account (VA)
            </button>
          </div>

          {/* KONTEN METODE */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8">
            
            {/* Tampilan Konten QRIS */}
            {paymentMethod === 'qris' && (
              <div className="text-center space-y-6 max-w-sm mx-auto">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 py-2 px-4 rounded-full w-fit mx-auto">
                  <Clock size={14} /> Bayar dalam waktu 15:00 menit
                </div>
                <div className="p-4 bg-white border-2 border-gray-100 rounded-3xl inline-block shadow-inner">
                  <img 
                    src="src/assets/QR Dana Han.jpeg" 
                    alt="QRIS Kaeru Coffee"
                    className="w-56 h-56 mx-auto rounded-xl object-cover"
                  />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Pindai QRIS di atas menggunakan aplikasi m-banking atau e-wallet milikmu.
                </p>
              </div>
            )}

            {/* Tampilan Konten Virtual Account */}
            {paymentMethod === 'va' && (
              <div className="space-y-6">
                <p className="text-sm text-gray-500 font-medium">Pilih Bank Transfer:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['bca', 'bni', 'mandiri', 'jago'].map((bank) => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`p-4 border-2 rounded-xl text-center uppercase font-black tracking-wider text-sm transition-all ${
                        selectedBank === bank
                          ? 'border-[#D4AF37] bg-amber-50/40 text-[#3E2723]'
                          : 'border-gray-100 hover:border-gray-300 text-gray-400'
                      }`}
                    >
                      {bank} VA
                    </button>
                  ))}
                </div>

                {/* Info Detail Rekening VA */}
                <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gray-200/60 mt-6 space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Nomor Virtual Account</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xl font-mono font-bold tracking-wider text-[#3E2723]">
                        {selectedBank === 'bca' && '8801200506063991'}
                        {selectedBank === 'bni' && '9880050606399124'}
                        {selectedBank === 'mandiri' && '700120506063991'}
                        {selectedBank === 'jago' && '102305060639918'}
                      </span>
                      <button 
                        onClick={() => handleCopyVA(
                          selectedBank === 'bca' ? '8801200506063991' : selectedBank === 'bni' ? '9880050606399124' : selectedBank === 'mandiri' ? '700120506063991' : '102305060639918'
                        )}
                        className="text-gray-400 hover:text-[#3E2723] flex items-center gap-1 text-xs font-bold transition-colors bg-white px-3 py-1.5 border border-gray-200 rounded-lg"
                      >
                        <Copy size={14} /> {copied ? 'Tersalin!' : 'Salin'}
                      </button>
                    </div>
                  </div>
                  <div className="border-t border-gray-200/50 pt-3">
                    <span className="text-xs text-gray-400 block uppercase font-bold tracking-wider">Nama Rekening</span>
                    <span className="text-sm font-bold text-[#3E2723] block mt-0.5">KAERU COFFEE - APP INVOICE</span>
                  </div>
                </div>
              </div>
            )}

            {/* === SEKSI SELESAI BAYAR & UPLOAD BUKTI === */}
            <div className="border-t border-gray-100 pt-8 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#3E2723]">Konfirmasi & Upload Bukti Transfer <span className="text-red-500">*</span></h3>
              <p className="text-xs text-gray-400">
                Silakan unggah tangkapan layar (screenshot) bukti transaksi sukses Anda di bawah ini untuk verifikasi admin:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-6 cursor-pointer hover:bg-gray-50/50 hover:border-[#D4AF37] transition-all group text-center min-h-[140px]">
                  <Upload size={28} className="text-gray-400 group-hover:text-[#D4AF37] transition-colors mb-2" />
                  <span className="text-xs font-bold text-gray-600">
                    {proofOfPayment ? 'Ganti File Bukti' : 'Pilih Gambar Bukti'}
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>

                <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-3 flex items-center justify-center min-h-[140px]">
                  {proofPreview ? (
                    <img 
                      src={proofPreview} 
                      alt="Preview Bukti Pembayaran" 
                      className="max-h-[120px] rounded-xl object-contain border border-gray-200 shadow-sm"
                    />
                  ) : (
                    <span className="text-xs text-amber-600 font-medium italic">Wajib mengunggah bukti bayar</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* === SEKSI KANAN: RINGKASAN & ACTION BUTTON (35%) === */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm w-full space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#3E2723] border-b border-gray-100 pb-3">
            Detail Pembayaran
          </h3>

          <div className="max-h-40 overflow-y-auto space-y-3 pr-2 border-b border-gray-100 pb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-xs">
                <span className="text-gray-500 font-medium truncate max-w-[180px]">{item.name} x{item.quantity}</span>
                <span className="font-bold text-gray-700">Rp {cleanPrice(item.price).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 text-sm pb-4 border-b border-dashed border-gray-200">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span className="font-medium text-[#3E2723]">Rp {calculateTotal().toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Metode Pembayaran</span>
              <span className="font-bold uppercase text-amber-700">{paymentMethod}</span>
            </div>
          </div>

          <div className="flex justify-between items-center my-6">
            <span className="text-sm font-bold text-gray-700">Total Bayar</span>
            <span className="text-2xl font-bold text-[#3E2723]">
              Rp {calculateTotal().toLocaleString('id-ID')}
            </span>
          </div>

          <button 
            onClick={handleSimulatePayment}
            disabled={isSubmitting || cartItems.length === 0}
            className="w-full bg-green-600 text-white py-3.5 px-4 rounded-full font-bold text-sm hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'MEMPROSES PESANAN...' : 'VERIFIKASI & SELESAIKAN PESANAN'} <Send size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;