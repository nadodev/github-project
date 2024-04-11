
import { displayUserData, fetchUserDataAndSave, userData } from './js/fetchUser.js';
import { fetchRepositoriesAndSave, displayRepositories } from './js/fetchRepositories.js';
import { closeModal } from './js/closeModal.js';
import { activeTabs } from './js/tabs.js';

const additionalInfo = document.getElementById('additionalInfo');
const additionalUserInfo = document.getElementById('additionalUserInfo');
const repositoriesData = fetchRepositoriesAndSave('diego3g');

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

