import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import Error from './error';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import useFetch from '@/hooks/use-fetch';
import { login } from '@/db/apiAuth';
import { LogInIcon } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UrlState } from '@/context';

const Login = () => {
  // used for navigating to dashboard after login
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log('typed');
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      // name is the identifier of the input box and value is the content u typed,eg on info.md
    }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);

  const { fetchUser } = UrlState();

  useEffect(() => {
    // console.log(data);
    if (error === null && data) {
      fetchUser();
      // if data is there then --> dashboard
      // if longlink is there then createNew=${longLink}
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  const handleLogin = async () => {
    setErrors([]);
    //validation
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      });

      await schema.validate(formData, { abortEarly: false });
      // if validation passes
      console.log('Form is valid. Proceeding with login...');
      //api call
      await fnLogin();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className='flex gap-1'>
            Login
            <LogInIcon size={25} className='text-blue-500 ' />{' '}
          </CardTitle>
          <CardDescription>
            to your account if you already have one
          </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className='flex flex-col gap-2 space-y-2'>
          <div className='space-y-1'>
            <Input
              name='email'
              type='email'
              placeholder='Enter Email'
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <Error message={errors.email} />}
          {/* <Error message='err' /> */}
          <div className='space-y-1'>
            <Input
              name='password'
              type='password'
              placeholder='Enter Password'
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
        </CardContent>
        <CardFooter>
          <Button variant='secondary' onClick={handleLogin} className='w-full '>
            {loading ? <BeatLoader size={10} color='blue' /> : 'Login'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
// for validation we use yup library
