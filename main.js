
import { displayUserData, fetchUserDataAndSave, userData } from './js/fetchUser.js';
import { fetchRepositoriesAndSave, displayRepositories, getArrayFromLocalStorage, USER_NAME } from './js/fetchRepositories.js';
import { closeModal } from './js/closeModal.js';
import { activeTabs } from './js/tabs.js';
import { initializeCloseButton, initializeFilterButton } from './js/helpers.js';



const additionalInfo = document.getElementById('additionalInfo');
const additionalUserInfo = document.getElementById('additionalUserInfo');
const btn_search = document.getElementById('btn_search');
const input__search = document.getElementById('input_search');
const searchInput = document.getElementById('search');
const arrow = document.querySelector('#additionalInfo img');


export function handleKeyPress(event) {
    // Verifica se a tecla pressionada é "Enter"
    if (event.key === 'Enter') {
        fetchRepositoriesAndSave(USER_NAME, event.target.value);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const repositoriesData = getArrayFromLocalStorage(USER_NAME);
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

    // Adiciona a classe 'active' ao input de busca quando o botão de busca é clicado
    btn_search.addEventListener('click', function () {
        input__search.classList.toggle('active');
    })


    searchInput.addEventListener('keypress', handleKeyPress);


    // Mostra os repositorios na página, utilizando cache se disponível
    if (repositoriesData) {
        displayRepositories(repositoriesData);
    } else {
        // Se não houver dados no armazenamento local, buscar da API e salvar no localStorage
        fetchRepositoriesAndSave(USER_NAME);
    }


    // Exibir os dados do usuário na página, utilizando cache se disponível
    if (userData) {
        displayUserData(userData);
    } else {
        // Se os dados não estiverem no cache ou estiverem expirados, buscar da API
        fetchUserDataAndSave(USER_NAME)
            .then(userData => displayUserData(userData))
            .catch(error => console.error('Erro ao buscar e exibir dados do usuário:', error));
    }

    // Initialize the close button for the additional user info
    additionalInfo.addEventListener('click', function () {
        if (!additionalUserInfo.classList.contains('active')) {
            additionalUserInfo.classList.add('active');
            arrow.style.transform = 'rotate(180deg)';
        } else {
            additionalUserInfo.classList.remove('active');
            arrow.style.transform = 'rotate(0deg)';
        }
    });

    // Exibir os repositórios na página, utilizando cache se disponível
    activeTabs('repositories');
    // displayRepositories(repositoriesData);

    // Fechar a modal quando o usuário clica no botão 'X'
    document.getElementsByClassName('modal__close')[0].addEventListener('click', function () {
        closeModal()
    });

});








