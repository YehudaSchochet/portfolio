import './css/index.css';
import $ from 'jquery';
import wordlist from 'an-array-of-english-words'

//get list of engish five letter words
let words = wordlist.filter(word => word.length === 5);

$('#done').on('click', () => {
  let filteredList = words;
  //filters out letters that you want excluded
  let excludedLetters = $('#excluded').val();
  console.log(excludedLetters);
  for (let i = 0; i < excludedLetters.length; i++) {
    const letter = excludedLetters[i];
    console.log(letter);
   filteredList= filteredList.filter(word => !word.includes(letter))
  }

   let includedLetters = $('#included').val();
  for (let i = 0; i < includedLetters.length; i++) {
    const letter = includedLetters[i];
    console.log(letter);
    filteredList = filteredList.filter(word => word.includes(letter))
  }

  //array of letter in the correct spots
  let greenLetters = [
    $('#firstGreen').val(),
    $('#secondGreen').val(),
    $('#thirdGreen').val(),
    $('#fourthGreen').val(),
    $('#fifthGreen').val()
  ]
  for (let i = 0; i < greenLetters.length; i++) {
    const letter = greenLetters[i];
    console.log(letter);
    if (letter !== '') {
     filteredList= filteredList.filter(word => word[i].includes(letter));
    }
  }

  let yellowLetters = [
    $('#firstYellow').val(),
    $('#secondYellow').val(),
    $('#thirdYellow').val(),
    $('#fourthYellow').val(),
    $('#fifthYellow').val()
  ]
  for (let i = 0; i < yellowLetters.length; i++) {
    const letter = yellowLetters[i];
    console.log(letter);
    if (letter !== '') {
      filteredList = filteredList.filter(word => !word[i].includes(letter));
    }
  }

  $('#filteredWords').text(filteredList)
});

$('#clear').on('click',()=>{
  $('.inputs').val('');
  $('#filteredWords').text('');
})
