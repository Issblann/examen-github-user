import { useState } from 'react';
import { Search } from './components/search';
import { getRepos, getUser } from './data/data';
import { useQuery } from '@tanstack/react-query';
import { Loader } from './assets/loader';

function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setUser(value);
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['user', user],
    queryFn: () => getUser(user),
  });

  if (error) return 'An error has occurred: ' + error.message;
  console.log(data);

  // getUser('Issblann');
  getRepos('Issblann');
  return (
    <div className="flex flex-col gap-10 p-5 items-center w-full ">
      <h1 className="lg:text-7xl md:text-4xl text-center text-3xl font-semibold text-[#33272a]">
        Soft gitHub user searcher
      </h1>

      <Search onSearch={handleSearch} />

      <section>
        {(isPending || isFetching) && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
        <div>
          <img src={data?.avatar_url} alt={data?.name} />
        </div>
        <h1>{data?.name}</h1>
        <p>{data?.bio}</p>
      </section>
    </div>
  );
}

export default App;
