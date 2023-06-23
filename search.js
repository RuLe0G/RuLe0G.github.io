const xhr = new XMLHttpRequest();
xhr.open('GET', 'steam_data.json', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const suggestions = data.applist.apps;
    
    // Получите ссылку на элементы в HTML
    const searchInput = document.getElementById('search-input');
    const suggestionsList = document.getElementById('suggestions-list');

    // Слушайте событие ввода текста в поле input
    searchInput.addEventListener('input', () => {
      console.log("in!");
      const userInput = searchInput.value.toLowerCase();
      const filteredSuggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().startsWith(userInput));

      // Очистите список подсказок
      suggestionsList.innerHTML = '';

      // Добавьте отфильтрованные подсказки в список
      filteredSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion.name;
        li.addEventListener('click', () => {
          // Установите выбранную подсказку в поле ввода
          searchInput.value = suggestion.name;
          suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(li);
      });
    });
  }
};
xhr.send();
