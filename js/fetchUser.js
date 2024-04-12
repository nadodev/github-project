import { USER_NAME } from "./fetchRepositories";


// Função para buscar dados do usuário na API e salvar no localStorage
export async function fetchUserDataAndSave(username) {
    const userUrl = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(userUrl);
        const userData = await response.json();

        const starredResponse = await fetch(`https://api.github.com/users/${username}/starred`);
        const starredData = await starredResponse.json();
        
        const totalStars = starredData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        
        const userDataWithTimestamp = {
            data: userData,
            starred: totalStars,
            timestamp: Date.now()
        };


        // Limpar todas as entradas relacionadas à aplicação no localStorage
        clearAplicationDataInStorage();

        location.reload();

        const existingUserData = localStorage.getItem(`userData_${username}`);
        if (existingUserData) {
            localStorage.removeItem(`userData_${username}`);
        }

     
        localStorage.setItem(`userData_${username}`, JSON.stringify(userDataWithTimestamp));
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        throw error;
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
function getUserDataFromStorage() {
    const userDataJSON = localStorage.getItem(`userData_${USER_NAME}`);

    if (userDataJSON) {
        const userDataWithTimestamp = JSON.parse(userDataJSON);

     
        // Verificar se os dados estão dentro do limite de tempo (15 minutos)
        const timeDiffLimitFifteenMinutes  = Date.now() - userDataWithTimestamp.timestamp;
        const timeOutCacheExpiration = 15 * 60 * 1000; 
        if (timeDiffLimitFifteenMinutes  < timeOutCacheExpiration) {
            return userDataWithTimestamp.data;
        } else {
            localStorage.removeItem(`userData_${USER_NAME}`);
        }
    }
    return null;
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