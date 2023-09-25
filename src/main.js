// Функция при старте для назначения события для кнопки "Поиск"
const start = () => {
    const searchButton = document.getElementById("search__button");
    searchButton.addEventListener("click", () => findSubstring());
}


// Общая функция для поиска подстроки в строке, где происходят все вызовы
const findSubstring = () => {
    removeRedColorElements(); // убираем красное выделение от результата прошлого поиска

    const substringToFind = document.getElementById("search__input").value.toLowerCase();
    if (!substringToFind) {  // Проверка на пустую подстроку
        printResultOfSearch("Введите текст для поиска");
        return;
    }

    const elementsFound = getElementsWithSubstring(substringToFind);
    if (!elementsFound.length) { // Результат неудачного поиска
        printResultOfSearch("Ничего не найдено");
        return;
    }
    printResultOfSearch(`Совпадений: ${elementsFound.length}`);
    colorElementsWithSubstring(elementsFound);
}


// Поиск по необходимому столбцу подстроки
const getElementsWithSubstring = (substr) => {
    const elements = document.querySelectorAll(".cell");

    // Фильтрует и возвращает элементы, у которых в загаловке указано "Марка" и присутствует искомая подстрока
    return Array.from(elements).filter(elem => (elem.querySelector(".cell__header")?.innerHTML == "Марка") && (elem.querySelector(".cell__text")?.innerHTML.toLowerCase().includes(substr)));
}


// Выделение красным найденных ячеек с подстрокой
const colorElementsWithSubstring = (elements) => {
    elements.map(elem => elem.querySelector(".cell__text").classList.add("found-cell"));
} 


// Возвращаем изменения от прошлого поиска
const removeRedColorElements = () => {
    const elements = document.querySelectorAll(".found-cell");
    elements.forEach(elem => elem.classList.remove("found-cell"));
}


// Функция для вывода результата поиска
const printResultOfSearch = (text) => document.querySelector(".search__result").querySelector("span").innerHTML = text;


start();