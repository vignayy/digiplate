document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('generatorForm');
  const generatedNumbers = document.getElementById('generatedNumbers');
  const copyButton = document.getElementById('copyButton');
  const toastContainer = document.createElement('div');
  toastContainer.classList.add('toast-container');
  document.body.appendChild(toastContainer);

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

    generatedNumbers.innerHTML = generated.map(number => `<div>${number}</div>`).join('');
    copyButton.style.display = 'block'; // Show the copy button after generating numbers
  });

  copyButton.addEventListener('click', function () {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(generatedNumbers);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');

    selection.removeAllRanges();

    // Change copy icon to tick icon
    copyButton.innerHTML = '<img src="res/tick.svg" alt="Tick Icon" class="tick-icon">';

    // Display toast message at bottom center
    const toast = document.createElement('div');
    toast.textContent = 'Copied!';
    toast.classList.add('toast');
    toastContainer.appendChild(toast);
    setTimeout(function () {
      copyButton.innerHTML = '<img src="res/copy.svg" alt="Copy Icon" class="copy-icon">';
      toastContainer.removeChild(toast);
    }, 1000);
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
