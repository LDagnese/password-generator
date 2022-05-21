// arrays for each char type

// Function to prompt user to input length, and required char types
    // Need to validate and make sure that something was selected

// Function that generates the password
function generatePassword() {

}

// Need a function to get random element in an array

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);