import { createContext, useContext, useEffect } from 'react';
import useFetch from './hooks/use-fetch';
import { getCurrentUser } from './db/apiAuth';

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  // to check if user is authenticated or not
  const isAuthenticated = user?.role === 'authenticated';

  // whenever our app loads it will run every single time
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

//whenever we call this function it will return the state
export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
