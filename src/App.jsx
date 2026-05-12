import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Dashboard from '@/pages/Dashboard';
import Menu from '@/pages/Menu';
import About from '@/pages/About'; 
import News from '@/pages/News';
import Store from '@/pages/Store';
import Contact from '@/pages/Contact';

function App() {
  return (
    <Router>
      <div className="bg-beige min-h-screen font-sans text-coffee-dark">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/store" element={<Store />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;