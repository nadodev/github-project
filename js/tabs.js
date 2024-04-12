import { USER_NAME, displayRepositories, fetchRepositoriesAndSave } from "./fetchRepositories";
import { displayStarredRepositories, getStarredRepositories } from "./starredRepositories";

export function activeTabs() {
    const tabs = document.querySelectorAll('.tabs__item');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            const clickedTabName = this.dataset.tab;
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
            this.classList.add('active');
            showTab(clickedTabName);
            hideOtherTab(clickedTabName); 
        });
    });
}

export function showTab(tabName) {
    console.log('tabName', tabName);
    const tabs = document.querySelectorAll('[data-id="tab_content"]');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelector("[data-tab='" + tabName + "']").classList.add('active');
}

export function hideOtherTab(selectedTabName) {
    const tabs = document.querySelectorAll('[data-id="tab_content"]');
    tabs.forEach(tab => {

        if (tab.dataset.tab !== selectedTabName) {
            tab.style.display = 'none';
        } else {
            tab.style.display = 'flex'; 
        }

        if (tab.dataset.tab === 'starred') {
            const username = USER_NAME;

            getStarredRepositories(username)
                .then(repos => {
                    displayStarredRepositories(repos);
                 
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        }
        

        if (tab.dataset.tab === 'repositories' && tab.classList.contains('active')) {
            if (repositoriesData) {
                displayRepositories(repositoriesData);
            } else {
                // Se os dados não estiverem no cache ou estiverem expirados, buscar da API
                fetchRepositoriesAndSave(USER_NAME)
                    .catch(error => console.error('Erro ao buscar e exibir repositórios:', error));
            }
        }
    });
}