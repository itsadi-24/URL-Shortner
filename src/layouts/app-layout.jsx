import Header from '@/components/Header';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <main className='container min-h-screen '>
        <Header />
        <Outlet />
        {/* body */}
      </main>
      {/* footer */}
      <div className='p-10 mt-10 font-mono text-center bg-gray-800 '>
        <a href='/' className=' hover:underline decoration-dotted'>
          Made with 💖.By Adi 😎
        </a>
      </div>
    </div>
  );
};

export default AppLayout;
