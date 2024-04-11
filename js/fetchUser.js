export async function fetchUserDataAndSave(username) {
    const userUrl = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(userUrl);
        const userData = await response.json();

        // Obter os repositórios marcados como favoritos pelo usuário
        const starredResponse = await fetch(`https://api.github.com/users/${username}/starred`);
        const starredData = await starredResponse.json();
        
        // Adicionar timestamp aos dados do usuário
        const userDataWithTimestamp = {
            data: userData,
            starred: starredData.length, // Número total de repositórios favoritos
            timestamp: Date.now()
        };

        // Salvar os dados do usuário com timestamp no localStorage
        localStorage.setItem('userData', JSON.stringify(userDataWithTimestamp));
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        throw error;
    }
}

// Função para recuperar os dados do usuário do localStorage
function getUserDataFromStorage() {
    const userDataJSON = localStorage.getItem('userData');
    if (userDataJSON) {
        const userDataWithTimestamp = JSON.parse(userDataJSON);
        // Verificar se os dados estão dentro do limite de tempo (15 minutos)
        const timeDiff = Date.now() - userDataWithTimestamp.timestamp;
        const cacheExpiration = 15 * 60 * 1000; // 15 minutos em milissegundos
        if (timeDiff < cacheExpiration) {
            return userDataWithTimestamp.data;
        } else {
            // Limpar o cache se estiver expirado
            localStorage.removeItem('userData');
        }
    }
    return null;
}

// Função para exibir os dados do usuário na página

export const userData = getUserDataFromStorage();

        
export function displayUserData(userData) {
    // Atualizar os elementos HTML com os dados do usuário
    document.getElementById('avatar').src = userData.avatar_url;
    document.getElementById('username').textContent = userData.login;
    document.getElementById('userDescription').textContent = userData.bio || 'Nenhum resumo encontrado';
    document.getElementById('repositories_total').textContent = userData.public_repos || '0';
    document.getElementById('starred_total').textContent = userData.starred || '0';

    additionalUserInfo.innerHTML = `
    <p> <img src="./assets/icon_enterprise.svg" alt="three"> ${userData.company || 'Não cadastrado'}</p>
    <p> <img src="./assets/icon_location.svg" alt="three"> ${userData.location || 'Não cadastrado'}</p>
    <p> <img src="./assets/icon_link.svg" alt="three"> ${userData.blog || 'Não cadastrado'}</p>
    <p> <img src="./assets/icons_instagram.svg" alt="three"> ${userData.twitter_username || 'Não cadastrado'}</p>
     `;
    
}