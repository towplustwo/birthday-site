// Confetti animation using Canvas
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function ConfettiParticle() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height - canvas.height;
  this.size = Math.random() * 5 + 2;
  this.speed = Math.random() * 3 + 1;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function createParticles() {
  particles.push(new ConfettiParticle());
  if (particles.length > 300) {
    particles.shift();
  }
}

function updateParticles() {
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.y += particle.speed;
    if (particle.y > canvas.height) {
      particle.y = -particle.size;
    }
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  }
}

function animate() {
  createParticles();
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

window.onload = function() {
    var audio = document.getElementById("myAudio");

    // Attempt to play the audio when the page loads
    audio.play().catch(function(error) {
        console.log('Autoplay failed:', error);
        // Optionally, prompt the user to interact with the page to start the audio
        let playButton = document.createElement("button");
        playButton.innerText = "Click to Play Birthday Song!";
        playButton.style.position = "absolute";
        playButton.style.top = "50%";
        playButton.style.left = "50%";
        playButton.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(playButton);
        
        playButton.addEventListener("click", function() {
            audio.play();
            playButton.remove(); // Remove button after audio starts playing
        });
    });
};

animate();
