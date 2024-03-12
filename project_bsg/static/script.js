// script2.js

document.addEventListener('DOMContentLoaded', function () {
  const keywordButtons = document.querySelectorAll('.keyword-botton');
  const submitButton = document.querySelector('.submit-button');
  const selectedKeywordsContainer = document.querySelector('.selected-keywords');
  const resetButton = document.querySelector('.reset-button');

  keywordButtons.forEach(button => {
      button.addEventListener('click', () => {
          toggleButton(button);
          updateButtonStyle(button);
          const selectedKeywords = getSelectedKeywords();
          displaySelectedKeywords(selectedKeywords);
      });
  });

  submitButton.addEventListener('click', () => {
      const selectedKeywords = getSelectedKeywords();
      displaySelectedKeywords(selectedKeywords);
  });

  resetButton.addEventListener('click', () => {
      resetAllKeywords();
      keywordButtons.forEach(button => updateButtonStyle(button));
      const selectedKeywords = getSelectedKeywords();
      displaySelectedKeywords(selectedKeywords);
  });

  selectedKeywordsContainer.addEventListener('click', function (event) {
      const clickedKeywordElement = event.target.closest('span');
      if (clickedKeywordElement) {
          const clickedKeyword = clickedKeywordElement.textContent.trim();
          keywordButtons.forEach(button => {
              if (button.textContent === clickedKeyword) {
                  button.setAttribute('data-selected', 'false');
                  updateButtonStyle(button);
              }
          });
          const selectedKeywords = getSelectedKeywords();
          displaySelectedKeywords(selectedKeywords);
      }
  });

  function toggleButton(button) {
      const isSelected = button.getAttribute('data-selected') === 'true';
      button.setAttribute('data-selected', String(!isSelected));
  }

  function updateButtonStyle(button) {
      const isSelected = button.getAttribute('data-selected') === 'true';
      button.style.backgroundColor = isSelected ? '#ff9c00' : '#8d8a8a';
      button.style.transform = isSelected ? 'skewX(-14deg) scale(1.3)' : 'skewX(-14deg)';
      button.style.zIndex = isSelected ? '1' : '0';
      button.style.color = isSelected ? '#4d479f' : '#2a07aa';
      button.style.fontWeight = isSelected ? 'bold' : 'normal';
  }

  function getSelectedKeywords() {
      const selectedButtons = document.querySelectorAll('.keyword-botton[data-selected="true"]');
      const selectedKeywords = Array.from(selectedButtons).map(button => button.textContent);
      return selectedKeywords;
  }

  function displaySelectedKeywords(keywords) {
      selectedKeywordsContainer.innerHTML = keywords.map(keyword => `<span>${keyword}</span>`).join(', ');
  }

  function resetAllKeywords() {
      keywordButtons.forEach(button => {
          button.setAttribute('data-selected', 'false');
      });
  }
});