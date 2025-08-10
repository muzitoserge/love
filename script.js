(() => {
  const bodyParts = [
    "ton cœur",
    "ton sourire",
    "ton regard",
    "ton âme",
    "ton esprit",
    "ta peau",
    "ta douceur",
    "ta tendresse",
    "ta chaleur",
    "ta passion",
    "ta folie douce",
    "ta gentillesse",
    "ta sensualité",
    "ta délicatesse",
    "ta force",
    "ta vulnérabilité",
    "ta confiance",
    "ta curiosité",
    "ta créativité",
    "ta patience",
    "ta spontanéité",
    "ta générosité",
    "ta façon de parler",
    "ta façon de rire",
    "ta façon de pleurer",
    "ta façon de penser à moi",
    "ta façon de me surprendre",
    "ta façon de me comprendre",
    "ta façon de perdre la tête",
    "ta voix",
    "tes cheveux",
    "tes mains",
    "ton dos",
    "ta bouche",
    "ton nez",
    "tes oreilles",
    "tes yeux",
    "ton cou",
    "tes épaules",
    "ton bras",
    "tes doigts",
    "ta poitrine 🤭",
    "ton ventre",
    "tes jambes",
    "tes genoux",
    "tes pieds",
    "tes talons",
    "tes mollets",
    "tes cuisses 😋",
    "ton front",
    "tes tempes",
    "ta cervelle",
    "tes seins",
    "tes hanches",
    "tes lèvres",
    "ton rire",
    "tes paumes",
    "tes cils",
    "ton sang",
    "tes os",
    "tes artères",
    "tes veines",
    "tes poumons",
    "ta foie",
    "ton rate",
    "ton estomac",
    "ton intestin",
    "tes clavicules",
    "ton poignet",
    "ta cheville",
    "ta sensibilité",
    "tes pensées",
    "ton esprit libre",
    "tes tetons",
    "ton derrière 😆",
    "ta langue",
    "ta manière d'être toi",
    "ta présence",
    "ton odeur",
    "ton énergie",
    "ta lumière intérieure",
    "ta détermination",
    "ta résilience",
    "ton courage",
    "ton humour",
    "ta complicité",
    "ton amour",
  ];

  let displayCount = 0;
  let lastIndex = -1;
  let running = true;
  let waitingForContinue = false;
  const messageDiv = document.getElementById("message");
  const toggleBtn = document.getElementById("toggle-btn");
  const surpriseBtn = document.getElementById("surprise-btn");
  const background = document.getElementById("background");
  const container = document.querySelector(".container");
  const loveText = document.getElementById("love");
  let intervalId;

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
    messageDiv.classList.add("fade-out");
    setTimeout(() => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * bodyParts.length);
      } while (randomIndex === lastIndex);
      lastIndex = randomIndex;
      messageDiv.textContent = `J'aime ${bodyParts[randomIndex]}`;
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
      loveText.textContent = "Je t'aime";
      loveText.style.color = "";
      loveText.style.textShadow = "";
      messageDiv.style.fontSize = "";
      messageDiv.style.fontWeight = "";
      messageDiv.style.background = "";
      displayCount = 0;
      running = true;
      waitingForContinue = false;
      toggleBtn.innerHTML = '<i class="fas fa-pause"></i> Arrêter';
      toggleBtn.setAttribute("aria-pressed", "true");
      intervalId = setInterval(updateMessage, 2000);
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
      if (waitingForContinue) return;
      if (displayCount >= 100) {
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
