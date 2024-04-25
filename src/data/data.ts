import axios from 'axios';

const URL_BASE = 'https://api.github.com/users';

export const getUser = async (username: string | null) => {
  const response = await axios.get(`${URL_BASE}/${username}`);
  const user = response.data;
  return user;
  //   console.log(user);
};

export const getRepos = async (username: string) => {
  const response = await axios.get(`${URL_BASE}/${username}/repos`);
  const recentRepos = response.data.slice(0, 5);
  console.log(recentRepos);
};
