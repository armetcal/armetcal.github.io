fetch('https://armetcal.github.io/1000_words/word_lists/english.html')
  .then(response => response.json())
  .then(data => console.log(data));