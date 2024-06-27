import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '@/context';
import useFetch from '@/hooks/use-fetch';
import { logout } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';

const Header = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();
  const { loading, fn: fnLogout } = useFetch(logout);
  return (
    <>
      {loading && <BarLoader className='' width={'100%'} color='#36d7b7' />}
      <nav className='flex items-center justify-between py-4 '>
        <Link to='/'>
          <h1 className='p-5 font-mono text-xl '>URL Shortner</h1>
        </Link>

        <div>
          {/* conditional rendering on user login */}
          {!user ? (
            <Button
              variant='secondary'
              className='rounded-3xl hover:bg-blue-500'
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className='object-contain '
                  />
                  <AvatarFallback className='text-3xl '>😎</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-blue-400 cursor-pointer'>
                  <Link to='/dashboard' className='flex'>
                    <LinkIcon className='w-4 h-4 mr-2 ' />
                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='text-red-500 cursor-pointer '>
                  <LogOut className='w-4 h-4 mr-2 ' />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate('/');
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
