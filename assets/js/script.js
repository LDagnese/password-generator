// arrays for each char type
const lowerCaseArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
  "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const upperCaseArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
  "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialCharArr = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+",
  "-", ".", "`", "~", "|", "<", ">", "=", "-", "_"];
let passwordArray = [];

// Get references to the #generate element
let generateBtn = document.querySelector("#generate");

// get the password length for generatePassword, validate inside, if not validated rerun prompt
function getPasswordLength() {
  return prompt("How long should the password be?\r\n(Between 8 and 128 characters)");
};

// Confirm 'OK' or 'Cancel' returns 'true' or 'false'
function includeLowerChar() {
  return confirm("Include LOWERCASE letters?")
};

// Confirm 'OK' or 'Cancel' returns 'true' or 'false'
function includeUpperChar() {
  return confirm("Include UPPERCASE letters?")
};

// Confirm 'OK' or 'Cancel' returns 'true' or 'false'
function includeNumbers() {
  return confirm("Include NUMBERS?")
};

// Confirm 'OK' or 'Cancel' returns 'true' or 'false'
function includeSpecial() {
  return confirm("Include SPECIAL characters?")
};

function atLeastOneOptionSelected(lower, upper, number, special) {
  if (lower || upper || number || special) {
    return true;
  } else {
    return false;
  }
}

/* Function that generates the password. 
Runs the query functions, then fills in passwordArray with at least 1 of the required characters. 
Then fills in the rest with a random character from a combined array 
of the required characters, to the max selected, randomizes that array
then combines the array into string and pass back to the writePassword function */
function generatePassword() {
  // Get Password length, if fails redo function
  let passwordLength = getPasswordLength();

  if (passwordLength === null) {
    return ""
  }

  if (isNaN(parseInt(passwordLength))) {
    alert("Please enter a number")
    return ""
  };

  if (passwordLength > 128 || passwordLength < 8) {
    alert("Please enter a number of at least 8 and no more than 128")
    return ""
  }

  let allowLowerChar = includeLowerChar();
  let allowUpperChar = includeUpperChar();
  let allowNumbers = includeNumbers();
  let allowSpecial = includeSpecial();
  let combinedArray = [];

  // Test to make sure at least 1 option was selected; if not rerun generatePass
  if (!atLeastOneOptionSelected(allowLowerChar,allowUpperChar,allowNumbers,allowSpecial)) {
    alert("Please Select at least 1 option")
    return ""
  };

  /*if uppercase are allow, push 1 to the array to make sure it contains 1
  Then push the whole array to combinedArray to fill in later*/
  if (allowLowerChar) {
    passwordArray.push(getRandomFromArray(lowerCaseArr));
    combinedArray = combinedArray.concat(lowerCaseArr);
  };

  /*if uppercase are allow, push 1 to the array to make sure it contains 1
  Then push the whole array to combinedArray to fill in later*/
  if (allowUpperChar) {
    passwordArray.push(getRandomFromArray(upperCaseArr));
    combinedArray = combinedArray.concat(upperCaseArr);
  };

  /*if uppercase are allow, push 1 to the array to make sure it contains 1
  Then push the whole array to combinedArray to fill in later*/
  if (allowNumbers) {
    passwordArray.push(getRandomFromArray(numbersArr));
    combinedArray = combinedArray.concat(numbersArr);
  };

  /*if uppercase are allow, push 1 to the array to make sure it contains 1
  Then push the whole array to combinedArray to fill in later*/
  if (allowSpecial) {
    passwordArray.push(getRandomFromArray(specialCharArr));
    combinedArray = combinedArray.concat(specialCharArr);
  };

  // push random from that combined array to passwordArr to the number specified
  while (passwordArray.length < passwordLength) {
    passwordArray.push(getRandomFromArray(combinedArray));
  }

  //randomize passwordArr and convert to string
  shuffleArray(passwordArray);
  let passwordString = passwordArray.join('');

  return passwordString

};

// Function to get random element in an array
function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Durstenfeld shuffle for array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
// Write password to the #password textarea
function writePassword() {
  let passwordText = document.querySelector("#password");
  // clear the text before generating new password
  passwordText.value = "";
  let password = generatePassword();
  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);