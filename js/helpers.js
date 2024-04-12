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

export function handleKeyPress(event) {
    // Verifica se a tecla pressionada é "Enter"
    if (event.key === 'Enter') {
        fetchRepositoriesAndSave(USER_NAME, event.target.value);
    }
}



export function initializeCloseButton(button, filter) {
    button.addEventListener('click', function () {
        hideFilter(filter);
    });
}