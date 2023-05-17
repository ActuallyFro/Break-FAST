// Darkmode
(() => {
    'use strict'
  
    const storedDarkMode = localStorage.getItem('GraphBuilderDarkMode') === 'true'
    const toggleButton = document.getElementById('toggleDarkMode');
  
    const setDarkMode = (isDarkMode) => {
      if (isDarkMode) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        toggleButton.checked = true;
      } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        toggleButton.checked = false;
      }
    }
  
    setDarkMode(storedDarkMode)
  
    const showActiveTheme = (isDarkMode) => {
      const themeSwitcherText = isDarkMode ? "Dark Mode" : "Light Mode";
      toggleButton.setAttribute('aria-label', themeSwitcherText);
    }
  
    window.addEventListener('DOMContentLoaded', () => {
      showActiveTheme(storedDarkMode)
  
      toggleButton.addEventListener('change', function () {
        const isContentDarkMode = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  
        setDarkMode(!isContentDarkMode);
        localStorage.setItem('GraphBuilderDarkMode', !isContentDarkMode);
        showActiveTheme(!isContentDarkMode);
      });
    })
  })()
