document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('generatorForm');
    const generatedNumbers = document.getElementById('generatedNumbers');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const startRange = parseInt(form.elements['startRange'].value);
      const endRange = parseInt(form.elements['endRange'].value);
      const baseNumber = parseInt(form.elements['baseNumber'].value);
      const includeIncreasingOrder = form.elements['includeIncreasingOrder'].checked;
  
      // Validate range and base number
      if (startRange < 1 || startRange >= endRange || endRange < 1 || baseNumber < 1 || baseNumber > 9 || isNaN(startRange) || isNaN(endRange) || isNaN(baseNumber)) {
        alert('Please enter valid inputs.');
        return;
      }
  
      let generated = [];
      for (let i = startRange; i <= endRange; i++) {
        const digitalRoot = calculateDigitalRoot(i);
        if (digitalRoot === baseNumber) {
          if (!includeIncreasingOrder || (includeIncreasingOrder && hasIncreasingDigits(i))) {
            generated.push(i);
          }
        }
      }
  
      generatedNumbers.textContent = generated.join('\n');
    });
  
    // Function to calculate digital root of a number
    function calculateDigitalRoot(number) {
      return (number - 1) % 9 + 1;
    }
  
    // Function to check if a number has increasing digits
    function hasIncreasingDigits(number) {
      const digits = number.toString().split('').map(Number);
      for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] > digits[i + 1]) {
          return false;
        }
      }
      return true;
    }
  });
  