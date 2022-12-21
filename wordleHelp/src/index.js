import './css/index.css';
import $ from 'jquery';
import wordlist from 'an-array-of-english-words'

//get list of engish five letter words
let words = wordlist.filter(word => word.length === 5);
//function filterWords(letters,wordList,included) {
//   for (let i = 0; i < letters.length; i++) {
//     const letter = letters[i];
//     let filteredList = wordList.filter(word => {
//       if(included){
//         word.includes(letter)
//       }else{
//          !word.includes(letter)
//       }

//     });
//     return filteredList;
//   }
// }
$('#done').on('click', () => {
  let filteredList = words;
  //filters out letters that you want excluded
  let excludedLetters = $('#excluded').val();
  for (let i = 0; i < excludedLetters.length; i++) {
    const letter = excludedLetters[i];
    filteredList = filteredList.filter(word => !word.includes(letter))
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
    if (letter !== '') {
      filteredList = filteredList.filter(word => word[i].includes(letter));
    }
  }
  
  //array of letters in incorrect spots
  let yellowSpots = [
    $('#firstYellow').val(),
    $('#secondYellow').val(),
    $('#thirdYellow').val(),
    $('#fourthYellow').val(),
    $('#fifthYellow').val()
  ]
  //filter words with letter in the wrong spot
  for (let i = 0; i < yellowSpots.length; i++) {
    const spot = yellowSpots[i];
      if (spot !== '') {
        for (let j = 0; j < spot.length; j++) {
          filteredList = filteredList.filter(word => word.includes(spot[j]))
        filteredList = filteredList.filter(word => !word[i].includes(spot[j]));
      }
    }
    
  }
  $('#filteredWords').text(filteredList)
});

$('#clear').on('click', () => {
  $('.inputs').val('');
  $('#filteredWords').text('');
})
