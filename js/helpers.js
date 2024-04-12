import { fetchRepositoriesAndSave } from "./fetchRepositories";

export function hideFilter(element) {
    element.classList.remove('active');
}

export function showFilter(element) {
    element.classList.add('active');
}

export function initializeFilterButton(button, filterToShow, filterToHide) {
    button.addEventListener('click', function (e) {
        showFilter(filterToShow);
        hideFilter(filterToHide);
    });
    

}



export function initializeCloseButton(button, filter) {
    button.addEventListener('click', function () {
        hideFilter(filter);
    });
}

export function returnRepositoriesMock(mock) {
    mock.forEach(repo => {
        const ItemRepository = document.createElement('div');
        ItemRepository.classList.add('repositories__item');
        ItemRepository.innerHTML = `
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
        ItemRepository.querySelector('h3').addEventListener('click', function() {
            document.getElementById('repoName').textContent = repo.name;
            document.getElementById('repoDescription').textContent = repo.description;
            document.getElementById('repoStars').textContent = `Stars: ${repo.stargazers_count}`;
            document.getElementById('repoForks').textContent = `Forks: ${repo.forks_count}`;
            document.getElementById('repoLink').href = repo.html_url; 
            document.getElementById('myModal').style.display = 'block';
            document.getElementById('modalOverlay').style.display = 'block';
        });

        repositoriesSection.appendChild(ItemRepository);
    });
}