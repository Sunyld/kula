import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Dashboard() {
  return (
    <main>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center px-6 md:px-20 mt-16">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold">Bem-vindo ao Kula!</h1>
          <p className="text-gray-600 mt-3">Seu hub para parcerias entre canais e marcas.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}



