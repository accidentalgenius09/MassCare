import HomePage from '@/components/sections/Homepage/Home';
import AboutUsPage from './about-us/page';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HomePage/>
        <AboutUsPage/>
      </main>
    </div>
  );
}
