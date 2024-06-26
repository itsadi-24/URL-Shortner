import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from '@/components/login';
import Signup from '@/components/signup';
import { UrlState } from '@/context';
import { useEffect } from 'react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');
  const navigate = useNavigate();

  const { isAuthenticated, loading } = UrlState();
  // runs once when the component mounts
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  // if already logged in then not allowed to /auth
  return (
    <div className='flex flex-col items-center gap-10 mt-36'>
      {/* http://localhost:5173/auth?createNew=xyz
      if user tries to shorten without loggedin  */}
      <h1 className='text-4xl font-extrabold '>
        {searchParams.get('createNew')
          ? "Alright! Let's login first...😅 "
          : 'Login / Signup'}
      </h1>
      <Tabs defaultValue='login' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2 '>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='signup'>Signup</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <Login />
        </TabsContent>
        <TabsContent value='signup'>
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
