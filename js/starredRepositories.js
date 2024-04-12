export async function getStarredRepositories(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/starred`);
        if (!response.ok) {
            throw new Error('Erro ao obter os repositórios starred');
        }
        const data = await response.json();
        return data.map(repo => repo.full_name);
    } catch (error) {
        console.error('Erro:', error);

        const starredMocado = [
            'usuario/repo1',
            'usuario/repo2',
            'usuario/repo3',
            'usuario/repo4',
            'usuario/repo5',
        ]

        return starredMocado;
    }
}


export function displayStarredRepositories(element) {
    const repositoryList = document.getElementById('starredSection');
    element.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('starred__card');
      const item = document.createElement('p');
      item.innerHTML = `
         <img src="./assets/star.svg" alt="three"> ${repo}
      `;
      card.appendChild(item);
      repositoryList.appendChild(card);
    });
  }
