import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import HomePage from '@/components/sections/Homepage/Home';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HomePage/>
      </main>
      <Footer />
    </div>
  );
}
