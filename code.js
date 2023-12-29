const rocket = document.getElementById("rocket");
const board = document.getElementById("board");
const scoreElement = document.getElementById("score");

// Event listener for keydown
document.addEventListener("keydown", handleKeyDown);

// Intervals for game elements
const generateRocksInterval = setInterval(generateRocks, 1250);
const moveRocksInterval = setInterval(moveRocks, 400);

// Function to handle keydown events
function handleKeyDown(e) {
  const left = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
  
  // Movement
  if (e.key === "ArrowLeft" && left > 0) {
    moveRocket(left - 10);
  } else if (e.key === "ArrowRight" && left <= 460) {
    moveRocket(left + 10);
  }

  // Bullet
  if ((e.key === "ArrowUp" || e.key === "Space") && e.repeat === false) {
    shootBullet(left);
  }
}

// Function to move the rocket
function moveRocket(newLeft) {
  rocket.style.left = newLeft + "px";
}

// Function to shoot a bullet
function shootBullet(left) {
  const bullet = document.createElement("div");
  bullet.classList.add("bullets");
  board.appendChild(bullet);

  const moveBullet = setInterval(() => {
    const rocks = document.getElementsByClassName("rocks");
    checkCollisions(bullet, rocks, moveBullet);

    const bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
    if (bulletBottom >= 500) {
      clearInterval(moveBullet);
      bullet.parentElement.removeChild(bullet);
    }

    bullet.style.left = left + "px";
    bullet.style.bottom = bulletBottom + 3 + "px";
  });
}

// Function to generate rocks
function generateRocks() {
  const rock = document.createElement("div");
  rock.classList.add("rocks");
  rock.style.left = Math.floor(Math.random() * 450) + "px";
  board.appendChild(rock);
}

// Function to move rocks
function moveRocks() {
  const rocks = document.getElementsByClassName("rocks");

  for (const rock of rocks) {
    const rockTop = parseInt(window.getComputedStyle(rock).getPropertyValue("top"));

    if (rockTop >= 460) {
      handleGameOver();
    }

    rock.style.top = rockTop + 25 + "px";
  }
}

// Function to check collisions
function checkCollisions(bullet, rocks, moveBulletInterval) {
  const bulletBound = bullet.getBoundingClientRect();

  for (const rock of rocks) {
    const rockBound = rock.getBoundingClientRect();

    if (
      bulletBound.left >= rockBound.left &&
      bulletBound.right <= rockBound.right &&
      bulletBound.top <= rockBound.top &&
      bulletBound.bottom <= rockBound.bottom
    ) {
      rock.parentElement.removeChild(rock);
      scoreElement.innerHTML = parseInt(scoreElement.innerHTML) + 1;
      clearInterval(moveBulletInterval);
      bullet.parentElement.removeChild(bullet);
    }
  }
}

// Function to handle game over
function handleGameOver() {
  alert("Game Over");
  clearInterval(moveRocksInterval);
  window.location.reload();
}

// Function to check win condition
function checkWin() {
  if (parseInt(scoreElement.innerHTML) >= 1) {
    alert("You Win");
    window.location.reload();
  }
}
