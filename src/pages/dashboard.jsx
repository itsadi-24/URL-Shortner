import Error from '@/components/error';
import LinkCard from '@/components/link-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UrlState } from '@/context';
import { getClicksForUrls } from '@/db/apiClicks';
import { getUrls } from '@/db/apiUrls';
import useFetch from '@/hooks/use-fetch';
import { Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = UrlState();

  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  // fetching all ids for urls
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  // as soon as the componet is mounted api call is made
  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  // it returns our searched url
  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-col gap-8 '>
      {loading ||
        (loadingClicks && <BarLoader width={'100%'} color='#36d7b7' />)}
      {/* total links and stats  */}
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created🔗</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='hover:text-blue-500'>
              Links Created🔗
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-extrabold '>My Links</h1>
        <Button variant='secondary'>Create Links</Button>
      </div>
      {/* filtering links */}
      <div className='relative'>
        <Input
          type='text'
          value={searchQuery}
          placeholder='Search your Links'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className='absolute p-1 top-2 right-2' />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
};

export default Dashboard;
