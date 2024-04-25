import { useState } from 'react';
import { Search } from './components/search';
import { getRepos, getUser } from './data/data';
import { useQuery } from '@tanstack/react-query';
import { Loader } from './assets/loader';
import { UserIcon } from './assets/user';
import { Location } from './assets/location';

function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    setUser(value);
  };

  //Manejo de la apis con tanstack
  const {
    isPending: isPendingUser,
    error: errorUser,
    data: dataUser,
    isFetching: isFetchingUser,
  } = useQuery({
    queryKey: ['user', user],
    queryFn: () => getUser(user),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!user,
  });

  const {
    isPending: isPendingRepo,
    error: errorRepo,
    data: dataRepo,
    isFetching: isFetchingRepo,
  } = useQuery({
    queryKey: ['repos', user],
    queryFn: () => getRepos(user),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!user,
  });

  return (
    <div className="flex flex-col gap-10 p-5 items-center w-full ">
      <h1 className="lg:text-7xl md:text-4xl text-center text-3xl font-semibold text-[#33272a]">
        Soft gitHub user searcher
      </h1>

      <Search onSearch={handleSearch} />

      {!user ? (
        <div className="flex justify-center items-center">
          <p className="text-2xl text-[#594a4e]">Search for a user</p>
        </div>
      ) : (
        <>
          {errorUser ? (
            <div className="flex justify-center items-center">
              <p className="text-2xl text-[#594a4e]">User not found</p>
            </div>
          ) : isPendingUser || isFetchingUser ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <section className="flex md:flex-row flex-col p-4 gap-10 md:gap-4 mt-6 w-full max-w-7xl md:p-10 justify-center border-[#33272a] border-2 items-center">
              <div className="w-full md:w-[40%]">
                <img
                  className="rounded-md object-cover w-[400px] flex mx-auto md:mx-0 h-full "
                  src={dataUser?.avatar_url}
                  alt={dataUser?.name}
                />

                <div className="flex flex-col justify-between mt-7">
                  <p className="text-2xl text-[#33272a] font-medium">
                    {dataUser?.name}
                  </p>
                  <p className=" text-lg text-[#594a4e]">{dataUser?.login}</p>
                </div>
                <p className="text-md mt-6 text-[#594a4e]">{dataUser?.bio}</p>

                <div className="flex gap-3 mt-3">
                  <p className="flex gap-2">
                    <UserIcon />
                    {dataUser?.followers} followers
                  </p>
                  <p className="flex gap-2">
                    <UserIcon />
                    {dataUser?.following} following
                  </p>
                </div>

                <p className="flex gap-2 mt-5">
                  <Location /> {dataUser?.location}
                </p>
              </div>

              <div className="md:w-[50%] flex flex-col w-full">
                {errorRepo && (
                  <div className="flex justify-center items-center">
                    <p className="text-2xl text-[#594a4e]">
                      Error fetching repos
                    </p>
                  </div>
                )}
                {(isPendingRepo || isFetchingRepo) && (
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                )}
                <h2 className="text-2xl text-[#33272a] mb-2 text-center font-medium">
                  Recent repositories
                </h2>
                <ul className=" flex flex-col gap-4 w-full h-full ">
                  <p className="text-xs text-right">
                    Repositories {dataUser?.public_repos}
                  </p>

                  {dataRepo?.length === 0 && (
                    <p className="text-[#594a4e] text-center">
                      No repositories found
                    </p>
                  )}
                  {dataRepo?.map((repo: any) => (
                    <li
                      key={repo?.id}
                      className="flex flex-col w-full bg-[#ffc6c7] p-4 rounded-md"
                    >
                      <div className="flex flex-col">
                        <p className="font-medium">{repo?.name}</p>

                        <p>{repo?.description ?? 'No description'}</p>
                      </div>

                      <p className="flex gap-2 mt-6 flex-wrap">
                        {Object.entries(repo?.languages).map(([language]) => (
                          <span
                            className="bg-[#ff8ba7] p-2 rounded-md text-xs"
                            key={language}
                          >
                            {language}
                            <br />
                          </span>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default App;
