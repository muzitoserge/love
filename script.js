(() => {
  const bodyParts = [
    "tes yeux",
    "ta voix",
    "tes mains",
    "ton sourire",
    "ta façon de parler",
  ];

  let displayCount = 0;
  let running = true;
  let waitingForContinue = false;
  let programEnded = false; // <- ajout pour bloquer après surprise
  const messageDiv = document.getElementById("message");
  const toggleBtn = document.getElementById("toggle-btn");
  const surpriseBtn = document.getElementById("surprise-btn");
  const background = document.getElementById("background");
  const container = document.querySelector(".container");
  const loveText = document.getElementById("love");
  let intervalId;

  let pool = [...bodyParts];
  let currentIndex = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffle(pool);

  function createHearts() {
    const heartCount = Math.floor(window.innerWidth / 12);
    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${10 + Math.random() * 15}s`;
      heart.style.animationDelay = `${Math.random() * 20}s`;
      const colors = ["#ff476f", "#ffd166", "#ff8e53", "#ff6b6b"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      heart.style.background = color;
      heart.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
      background.appendChild(heart);
    }
  }

  function updateMessage() {
    if (programEnded) return; // bloque si fini
    messageDiv.classList.add("fade-out");
    setTimeout(() => {
      if (currentIndex >= pool.length) {
        // cycle complet → bouton surprise agité
        surpriseBtn.classList.add("shake");
        shuffle(pool);
        currentIndex = 0;
      }
      messageDiv.textContent = `J'aime ${pool[currentIndex]}`;
      currentIndex++;
      displayCount++;
      messageDiv.classList.remove("fade-out");
    }, 500);
  }

  function createHeartBeat() {
    const heart = document.createElement("div");
    heart.className = "heart-beat";
    heart.innerHTML = "❤️";
    const containerRect = container.getBoundingClientRect();
    const x = Math.random() * (containerRect.width - 100);
    const y = Math.random() * (containerRect.height - 100);
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.opacity = "1";
    container.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 1200);
  }

  function createConfetti() {
    const count = 30;
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      const x = Math.random() * container.clientWidth;
      const y = -10 - Math.random() * 20;
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(confetti);
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  }

  function specialSurprise() {
    surpriseBtn.classList.remove("shake"); // enlève agitation
    createConfetti();
    loveText.textContent = "Je t'adore !";
    loveText.style.color = "#ffde22";
    loveText.style.textShadow =
      "0 0 15px #ffde22, 0 0 30px #ffde22, 0 0 45px #ffde22";
    messageDiv.textContent = "J'aime toi, tout simplement ❤️";
    messageDiv.style.fontSize = "1.6rem";
    messageDiv.style.fontWeight = "700";
    messageDiv.style.background = "rgba(255, 222, 34, 0.2)";
    setTimeout(() => {
      // Fin définitive
      stopMessages();
      programEnded = true;
      toggleBtn.disabled = true;
      surpriseBtn.disabled = true;
    }, 7000);
  }

  function stopMessages() {
    clearInterval(intervalId);
    running = false;
    toggleBtn.innerHTML = '<i class="fas fa-play"></i> Démarrer';
    toggleBtn.setAttribute("aria-pressed", "false");
  }

  function startMessages() {
    updateMessage();
    intervalId = setInterval(updateMessage, 2000);
    running = true;
    toggleBtn.innerHTML = '<i class="fas fa-pause"></i> Arrêter';
    toggleBtn.setAttribute("aria-pressed", "true");
  }

  function init() {
    createHearts();
    updateMessage();
    intervalId = setInterval(updateMessage, 2000);

    toggleBtn.addEventListener("click", () => {
      if (programEnded) return;
      if (waitingForContinue) {
        waitingForContinue = false;
        startMessages();
        messageDiv.style.fontWeight = "";
        messageDiv.style.fontStyle = "";
        messageDiv.style.background = "";
        return;
      }
      if (running) stopMessages();
      else startMessages();
    });

    surpriseBtn.addEventListener("click", () => {
      if (programEnded) return;
      if (waitingForContinue) return;
      if (displayCount >= bodyParts.length) {
        stopMessages();
        specialSurprise();
      } else {
        stopMessages();
        waitingForContinue = true;
        messageDiv.textContent =
          "Continue, tu n'as pas fini pour la surprise...";
        messageDiv.style.fontWeight = "600";
        messageDiv.style.fontStyle = "italic";
        messageDiv.style.background = "rgba(255, 71, 111, 0.2)";
      }
    });

    setTimeout(() => {
      createHeartBeat();
    }, 1000);
  }

  window.addEventListener("load", init);
})();
