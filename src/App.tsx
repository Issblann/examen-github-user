import { useState } from 'react';
import { Search } from './components/search';
import { getRepos, getUser } from './data/data';
import { useQuery } from '@tanstack/react-query';

function App() {
  const [user, setUser] = useState<string | undefined>('');

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(user),
  });

  getUser('Issblann');
  getRepos('Issblann');
  return (
    <div className="flex flex-col gap-10 p-5 items-center w-full ">
      <h1 className="lg:text-7xl md:text-4xl text-center text-3xl font-semibold text-[#33272a]">
        Soft gitHub user searcher
      </h1>

      <Search />

      <section>CONTAINER SEARCH GITHUB</section>
    </div>
  );
}

export default App;
