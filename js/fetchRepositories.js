export const USER_NAME = 'diego3g';

// Função para buscar os repositórios do usuário e salvá-los no localStorage
function searchRepositories() {
    const searchInput = document.getElementById('searchInput').value;
    fetchRepositoriesAndSave('username', searchInput);
}

export async function fetchRepositoriesAndSave(username, query = '') {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositoriesData = await response.json();

        // Filtrar os repositórios com base no nome
        const filteredRepositories = repositoriesData.filter(repo => repo.name.includes(query));

        // Salvar os repositórios filtrados no localStorage
        localStorage.setItem(username, JSON.stringify(filteredRepositories));

        displayRepositories(filteredRepositories);

    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        throw error;
    }
}

export function getArrayFromLocalStorage(key) {
    console.log('getArrayFromLocalStorage', key)
    const storedData = localStorage.getItem(key);
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            if (Array.isArray(parsedData)) {
                return parsedData;
            } else {
                console.error(`Os dados armazenados em ${key} não são um array.`);
                return null;
            }
        } catch (error) {
            console.error(`Erro ao analisar os dados armazenados em ${key}:`, error);
            return null;
        }
    } else {
        console.error(`Nenhum dado armazenado em ${key}.`);
        return null;
    }
}

export function clearAndFetchRepositories(username, query = '') {
    // Limpar os dados antigos do armazenamento local
    localStorage.removeItem(username);
    // Buscar e salvar os repositórios do novo usuário
    return fetchRepositoriesAndSave(username, query);
}
// Função para exibir os repositórios na página
export function displayRepositories(repositoriesData) {
    const repositoriesSection = document.getElementById('repositoriesSection');
    repositoriesSection.innerHTML = '';
    const savedRepositories = getArrayFromLocalStorage(USER_NAME);

    if (Array.isArray(savedRepositories)) {
        savedRepositories.forEach(repo => {
            const repoItem = document.createElement('div');
            repoItem.classList.add('repositories__item');
            repoItem.innerHTML = `
                <h3>${repo.name} / <span>${repo.default_branch}</span></h3>
                <p>${repo.description || 'Nenhum resumo encontrado'}</p>
                <div class="repositories__info">
                    <div class="repositories__stars">
                        <img src="./assets/star_fill.svg" alt="book"><p>${repo.stargazers_count}</p>
                    </div>
                    <div class="repositories__fork">
                        <img src="./assets/three.svg" alt="three"><p>${repo.forks_count}</p>
                    </div>
                </div>
            `;

            // Adicionar evento de clique para abrir a modal com informações do repositório
            repoItem.querySelector('h3').addEventListener('click', function() {
                document.getElementById('repoName').textContent = repo.name;
                document.getElementById('repoDescription').textContent = repo.description;
                document.getElementById('repoStars').textContent = `Stars: ${repo.stargazers_count}`;
                document.getElementById('repoForks').textContent = `Forks: ${repo.forks_count}`;
                document.getElementById('repoLink').href = repo.html_url; 
                document.getElementById('myModal').style.display = 'block';
                document.getElementById('modalOverlay').style.display = 'block';
            });

            repositoriesSection.appendChild(repoItem);
        });
    } else {
        console.error("Nenhum repositório salvo encontrado no localStorage.");
    }
}
