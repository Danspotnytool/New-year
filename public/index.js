
const confettiWindow = document.getElementById('confettiWindow');

function throwElement(element, speed, direction, mass) {
  // Set the gravitational acceleration (in pixels per second squared)
  var g = 9.81;

  // Calculate the weight of the element (in newtons) based on the mass and gravitational acceleration
  var weight = mass * g;

  // Get the current time
  var startTime = Date.now();

  // Get the initial position of the element
  var initialTop = element.offsetTop;
  var initialLeft = element.offsetLeft;

  // Set the initial vertical speed of the element
  var initialVerticalSpeed = speed * Math.sin(direction);

  // Set up an interval to update the position of the element
  var interval = setInterval(function() {
    // Calculate the elapsed time
    var elapsedTime = (Date.now() - startTime) / 1000; // Divide by 1000 to convert from milliseconds to seconds

    // Calculate the new position of the element
    var newTop = initialTop + initialVerticalSpeed * elapsedTime + 0.5 * g * elapsedTime * elapsedTime;
    var newLeft = initialLeft + speed * elapsedTime * Math.cos(direction);

    // Update the initial vertical speed of the element to take into account the gravitational acceleration
    initialVerticalSpeed += g * elapsedTime;

    // Update the position of the element
    element.style.top = `${newTop}px`
    element.style.left = `${newLeft}px`

    // Update the rotation of the element
    element.style.transform = `translate(-50%, -50%) rotate(${newLeft * 0.5}deg)`;

    // If the element has moved off the screen, stop the interval
    if (newTop < 0 || newTop > element.parentNode.offsetHeight || newLeft < 0 || newLeft > element.parentNode.offsetWidth) {
      clearInterval(interval);

      // Remove the element from the DOM
      element.parentNode.removeChild(element);
    }
  }, 20); // Update the position every 20 milliseconds
}



confettiWindow.onclick = (event) => {
  // Get the position of the click relative to the confetti window
  const x = event.clientX - confettiWindow.offsetLeft;
  const y = event.clientY - confettiWindow.offsetTop;
  let i = 10;
  const insertInterval = setInterval(() => {
    const confettiElement = document.createElement('div');
    confettiElement.className = 'confetti';
    // set the position of the confetti element with random offset in all directions
    const offset = Math.random() * 50;
    confettiElement.style.top = `${y + Math.random() * offset - (offset / 2)}px`;
    confettiElement.style.left = `${x + Math.random() * offset - (offset / 2)}px`;
    confettiElement.style.transform = `translate(-50%, -50%)`;
    confettiWindow.appendChild(confettiElement);
    setTimeout(() => {
      throwElement(
        confettiElement,
        Math.random() * 100 + 100,
        Math.random() * 2 * Math.PI,
        Math.random() * 0.5 + 0.5
      );
    }, 10);
    i--;
    if (i <= 0) {
        clearInterval(insertInterval);
    };
  }, 0);
  return false;
};