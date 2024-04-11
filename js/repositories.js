const CACHE_EXPIRATION_TIME = 600000; // Tempo de expiração do cache em milissegundos (10 minutos)

// Função para obter os dados do cache ou da API
async function fetchDataWithCache(cacheKey, fetchData) {
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
      return data;
    }
  }

  const data = await fetchData();
  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
}

// Função para obter dados do usuário com cache
export async function getUser(username) {
  const cacheKey = `user_${username}`;
  return fetchDataWithCache(cacheKey, async () => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do usuário');
    }
    return await response.json();
  });
}

// Função para obter repositórios do usuário com cache
export async function getRepositories(username) {
  const cacheKey = `repositories_${username}`;
  return fetchDataWithCache(cacheKey, async () => {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      throw new Error('Erro ao buscar repositórios');
    }
    return await response.json();
  });
}

// Função para pesquisar repositórios do usuário com cache
export async function searchRepositoriesWithCache(username, searchQuery) {
  const cacheKey = `search_${username}_${searchQuery}`;
  return fetchDataWithCache(cacheKey, async () => {
    const response = await fetch(`https://api.github.com/search/repositories?q=user:${username}+${searchQuery}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar repositórios');
    }
    return await response.json();
  });
}
