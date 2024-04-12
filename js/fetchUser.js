import { USER_NAME } from "./fetchRepositories";


// Função para buscar dados do usuário na API e salvar no localStorage
// Função para buscar dados do usuário na API e salvar no localStorage
export async function fetchUserDataAndSave(username) {
    const userDataFromStorage = getUserDataFromStorage(username);

    // Verificar se os dados do usuário já estão no armazenamento local
    if (userDataFromStorage) {
        console.log('Dados do usuário encontrados no armazenamento local.');
        displayUserData(userDataFromStorage); // Exibir os dados do usuário do armazenamento local
        return userDataFromStorage;
    }

    try {
        const userUrl = `https://api.github.com/users/${username}`;
        const response = await fetch(userUrl);

        // Verificar se a resposta da API é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const userData = await response.json();

        const starredResponse = await fetch(`https://api.github.com/users/${username}/starred`);

        // Verificar se a resposta da API é bem-sucedida
        if (!starredResponse.ok) {
            throw new Error(`Erro na API: ${starredResponse.statusText}`);
        }

        const starredData = await starredResponse.json();
        
        const totalStars = starredData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        
        const userDataWithTimestamp = {
            data: userData,
            starred: totalStars,
            timestamp: Date.now()
        };

        // Salvar dados no armazenamento local
        saveUserDataToStorage(username, userDataWithTimestamp);

        // Exibir os dados do usuário
        displayUserData(userDataWithTimestamp);

        return userDataWithTimestamp;
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);

        // Dados mocado
        const mocadoData = {
            login: 'usuário mocado',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
            bio: 'Descrição mocado',
            public_repos: 10,
            company: 'Empresa mocado',
            location: 'Local mocado',
            blog: 'Blog mocado',
            twitter_username: 'Twitter mocado'
        };
        
        // Exibir os dados mocado
        displayUserData(mocadoData);

        return mocadoData;
    }
}


// Função para limpar todas as entradas relacionadas à aplicação no localStorage

function clearAplicationDataInStorage() {

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('userData_')) {
           
            localStorage.removeItem(key);
        }
    }
}


// Função para recuperar os dados do usuário do localStorage
function getUserDataFromStorage(username) {
    const userDataJSON = localStorage.getItem(`userData_${username}`);

    if (userDataJSON) {
        const userDataWithTimestamp = JSON.parse(userDataJSON);
     
        // Verificar se os dados estão dentro do limite de tempo (15 minutos)
        const timeDiffLimitFifteenMinutes = Date.now() - userDataWithTimestamp.timestamp;
        const timeOutCacheExpiration = 15 * 60 * 1000; 
        if (timeDiffLimitFifteenMinutes < timeOutCacheExpiration) {
            return userDataWithTimestamp.data;
        } else {
            // Remover dados expirados do armazenamento local
            localStorage.removeItem(`userData_${username}`);
        }
    }
    return null;
}

function saveUserDataToStorage(username, userDataWithTimestamp) {
    localStorage.setItem(`userData_${username}`, JSON.stringify(userDataWithTimestamp));
}

// Função para recuperar a contagem de repositórios favoritos do localStorage
export function getStarredCountFromStorage(username) {
    const userDataJSON = localStorage.getItem(username);

    if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);

        return userData.starred || 0;
    } else {
        console.error(`Nenhum dado armazenado para o usuário ${username}.`);
        return 0;
    }
}

// Função para exibir os dados do usuário na página
export const userData = getUserDataFromStorage();
console.log(userData)
export function displayUserData(userData) {

    const starredCount = getStarredCountFromStorage(`userData_${USER_NAME}`);
    

    document.getElementById('avatar').src = userData.avatar_url;
    document.getElementById('username').textContent = userData.login;
    document.getElementById('userDescription').textContent = userData.bio || 'Nenhum resumo encontrado';
    document.getElementById('repositories_total').textContent = userData.public_repos || '0';
    document.getElementById('starred_total').textContent = starredCount || '0';

    additionalUserInfo.innerHTML = `
    <p> <img src="./assets/icon_enterprise.svg" alt="three"> ${userData.company || 'Não cadastrado'}</p>
    <p> <img src="./assets/icon_location.svg" alt="three"> ${userData.location || 'Não cadastrado'}</p>
    <p> <img src="./assets/icon_link.svg" alt="three"> ${userData.blog || 'Não cadastrado'}</p>
    <p> <img src="./assets/icons_instagram.svg" alt="three"> ${userData.twitter_username || 'Não cadastrado'}</p>
     `;
    
}