import axios from 'axios';

//URL base del usuario de la API de Github
const URL_BASE_USER = 'https://api.github.com/users';

const URL_BASE_REPO = 'https://api.github.com/repos';

//Peticion usuario
export const getUser = async (username: string | null) => {
  const response = await axios.get(`${URL_BASE_USER}/${username}`);
  const user = response.data;
  return user;
  //   console.log(user);
};

//Peticion repositorios
export const getRepos = async (username: string | null) => {
  const response = await axios.get(`${URL_BASE_USER}/${username}/repos`);
  const recentRepos = response.data.slice(0, 5);

  const reposWithLanguages = await Promise.all(
    recentRepos.map(async (repo: any) => {
      const languagesResponse = await axios.get(
        `${URL_BASE_REPO}/${username}/${repo?.name}/languages`
      );
      return { ...repo, languages: languagesResponse.data };
    })
  );
  return reposWithLanguages;
};
