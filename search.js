const xhr = new XMLHttpRequest();
xhr.open('GET', 'steam_data.json', true);
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const suggestions = data.applist.apps;
    
    const searchInput = document.getElementById('search-input');
    const suggestionsList = document.getElementById('suggestions-list');
    let selectedAppId;

    searchInput.addEventListener('input', () => {
      const userInput = searchInput.value.toLowerCase();
      const filteredSuggestions = suggestions.filter(suggestion => suggestion.name.toLowerCase().startsWith(userInput));

      suggestionsList.innerHTML = '';

      limitedSuggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion.name;
        li.addEventListener('click', () => {
          searchInput.value = suggestion.name;
          selectedAppId = suggestion.appid;
          suggestionsList.innerHTML = '';
        });
        suggestionsList.appendChild(li);
      });
    });
  }
};
xhr.send();

const xhrH = new XMLHttpRequest();
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  xhrH.open('GET', `https://steamspy.com/api.php?request=appdetails&appid=${selectedAppId}`, true);
  xhrH.onload = function() {
    if (xhrH.status === 200) {
      const appDetails = JSON.parse(xhrH.responseText);

      // Получите ссылку на первый блок в HTML
      const firstInfoBlock = document.querySelector('.info-blocks .info-block');

      // Очистите содержимое первого блока
      firstInfoBlock.innerHTML = '';

      // Создайте элементы для отображения информации
      const title = document.createElement('h2');
      title.textContent = appDetails.name;
      const description = document.createElement('p');
      description.textContent = appDetails.description;

      // Добавьте элементы в первый блок
      firstInfoBlock.appendChild(title);
      firstInfoBlock.appendChild(description);
    }
  };
  xhrH.send();
});