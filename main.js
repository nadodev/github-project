
import { displayUserData, fetchUserDataAndSave, userData } from './js/fetchUser.js';
import { fetchRepositoriesAndSave, displayRepositories, getRepositoriesFromStorage } from './js/fetchRepositories.js';
import { closeModal } from './js/closeModal.js';

const additionalInfo = document.getElementById('additionalInfo');
const additionalUserInfo = document.getElementById('additionalUserInfo');
const repositoriesData = getRepositoriesFromStorage();

const btn_search = document.getElementById('btn_search');

const input__search = document.getElementById('input_search');
const searchInput = document.getElementById('search');

btn_search.addEventListener('click', function () {
    input__search.classList.toggle('active');
})


searchInput.addEventListener('keypress', handleKeyPress);

document.addEventListener('DOMContentLoaded', function () {
    const btnFilterType = document.getElementById('btn_type');
    const btnFilterLanguage = document.getElementById('btn_language');
    const btnCloseFilterLanguage = document.querySelector('#close_language');
    const btnCloseFilterType = document.querySelector('#close_type');
    const filterType = document.getElementById('type');
    const filterLanguage = document.getElementById('language');

    initializeFilterButton(btnFilterLanguage, filterLanguage, filterType);
    initializeFilterButton(btnFilterType, filterType, filterLanguage);
    initializeCloseButton(btnCloseFilterLanguage, filterLanguage);
    initializeCloseButton(btnCloseFilterType, filterType);
});


function hideFilter(element) {
    element.classList.remove('active');
}

function showFilter(element) {
    element.classList.add('active');
}

function initializeFilterButton(button, filterToShow, filterToHide) {
    button.addEventListener('click', function (e) {
        showFilter(filterToShow);
        hideFilter(filterToHide);
       
    });
    
}

function handleKeyPress(event) {
    // Verifica se a tecla pressionada é "Enter"
    if (event.key === 'Enter') {
        fetchRepositoriesAndSave('diego3g', event.target.value);
    }
}


function initializeCloseButton(button, filter) {
    button.addEventListener('click', function () {
        hideFilter(filter);
    });
}

async function getStarredRepositories(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/starred`);
        if (!response.ok) {
            throw new Error('Erro ao obter os repositórios starred');
        }
        const data = await response.json();
        return data.map(repo => repo.full_name);
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}
function displayStarredRepositories(element) {
    const repositoryList = document.getElementById('starredSection');
    element.forEach(repo => {
      const card = document.createElement('div');
      card.classList.add('starredCard');
      const item = document.createElement('p');
      item.innerHTML = `
         <img src="./assets/star.svg" alt="three"> ${repo}
      `;
      card.appendChild(item);
      repositoryList.appendChild(card);
    });
  }

function activeTabs(tabName) {
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

function showTab(tabName) {
    console.log('tabName', tabName);
    const tabs = document.querySelectorAll('[data-id="tab_content"]');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector("[data-tab='" + tabName + "']").classList.add('active');
}

function hideOtherTab(selectedTabName) {
    const tabs = document.querySelectorAll('[data-id="tab_content"]');
    tabs.forEach(tab => {
        if (tab.dataset.tab !== selectedTabName) {
            tab.style.display = 'none';
        } else {
            tab.style.display = 'flex'; // ou outro estilo adequado para mostrar a aba selecionada
        }

        if (tab.dataset.tab === 'starred') {
            const username = 'diego3g'

            getStarredRepositories(username)
                .then(repos => {
                    console.log('Repositórios Starred:', repos);
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
                fetchRepositoriesAndSave('diego35')
                    .catch(error => console.error('Erro ao buscar e exibir repositórios:', error));
            }
        }
    });
}



if (userData) {
    displayUserData(userData);
} else {
    // Se os dados não estiverem no cache ou estiverem expirados, buscar da API
    fetchUserDataAndSave('diego3g')
        .then(userData => displayUserData(userData))
        .catch(error => console.error('Erro ao buscar e exibir dados do usuário:', error));
}


const arrow = document.querySelector('#additionalInfo img');
additionalInfo.addEventListener('click', function () {
    if (!additionalUserInfo.classList.contains('active')) {
        additionalUserInfo. classList.add('active');
        arrow.style.transform = 'rotate(180deg)';
    } else {
        additionalUserInfo.classList.remove('active');
        arrow.style.transform = 'rotate(0deg)';
    }
});


// Exibir os repositórios na página, utilizando cache se disponível
const username = 'diego3g'; // Substitua pelo nome de usuário desejado
await fetchRepositoriesAndSave(username);



activeTabs('repositories');
displayRepositories(repositoriesData);

// Fechar a modal quando o usuário clica no botão 'X'
document.getElementsByClassName('close')[0].addEventListener('click', function () {
    closeModal()
});

