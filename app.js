const app = document.getElementById("app");

const teamsCatalog = [
  { name: "Holanda", img: "Holanda.png" },
  { name: "México", img: "Mexico.png" },
  { name: "Argentina", img: "Argentina.png" },
  { name: "Francia", img: "Francia.png" },
  { name: "Cabo Verde", img: "Cabo Verde.png" },
  { name: "España", img: "España.png" },
  { name: "Panamá", img: "Panama.png" },
  { name: "Japón", img: "Japon.png" },
  { name: "Corea", img: "Korea.png" }
];

let usedQuestions = [];
let timerInterval = null;

let game = {
  teamA: { name: "Holanda", img: "Holanda.png", players: [], goals: 0 },
  teamB: { name: "México", img: "Mexico.png", players: [], goals: 0 },
  turnTeam: "A",
  playerIndexA: 0,
  playerIndexB: 0,
  currentPlayer: null,
  currentQuestion: null,
  round: 1,
  maxRounds: 20,
  message: "",
  timeLeft: 30,
  locked: false
};

const gameItems = [
  { category: "Esposa ❤️", type: "judge", q: "¿Cuál es la comida favorita de tu esposa?", note: "Tu esposa confirma si está correcto." },
  { category: "Esposa ❤️", type: "judge", q: "¿Cuál es el postre favorito de tu esposa?", note: "Tu esposa confirma si está correcto." },
  { category: "Esposa ❤️", type: "judge", q: "¿Cuál es el color favorito de tu esposa?", note: "Tu esposa confirma si está correcto." },
  { category: "Esposa ❤️", type: "judge", q: "¿Qué regalo le gustaría recibir a tu esposa?", note: "Tu esposa confirma si está correcto." },
  { category: "Esposa ❤️", type: "judge", q: "¿Cuál es la bebida favorita de tu esposa?", note: "Tu esposa confirma si está correcto." },

  { category: "Hijos 👧👦", type: "judge", q: "¿Qué quiere ser tu hijo o hija cuando sea grande?", note: "Tus hijos confirman si está correcto." },
  { category: "Hijos 👧👦", type: "judge", q: "¿Cuál es la comida favorita de tu hijo o hija?", note: "Tus hijos confirman si está correcto." },
  { category: "Hijos 👧👦", type: "judge", q: "¿Cuál es el animal favorito de tu hijo o hija?", note: "Tus hijos confirman si está correcto." },
  { category: "Hijos 👧👦", type: "judge", q: "¿Cuál es la materia favorita de tu hijo o hija?", note: "Tus hijos confirman si está correcto." },
  { category: "Hijos 👧👦", type: "judge", q: "¿Qué le da miedo a tu hijo o hija?", note: "Tus hijos confirman si está correcto." },

  { category: "Familia 👨‍👩‍👧‍👦", type: "judge", q: "¿Cuál fue el paseo familiar que más recuerda tu familia?", note: "La familia confirma si está correcto." },
  { category: "Familia 👨‍👩‍👧‍👦", type: "judge", q: "¿Cuál comida disfrutan más comer juntos en familia?", note: "La familia confirma si está correcto." },

  { category: "Vehículos 🚗", type: "options", q: "¿Qué marca fabrica el Corolla?", options: ["Nissan", "Toyota", "Mazda", "Kia"], answer: 1 },
  { category: "Vehículos 🚗", type: "options", q: "¿Qué marca fabrica el Civic?", options: ["Honda", "Toyota", "Ford", "Hyundai"], answer: 0 },
  { category: "Vehículos 🚗", type: "options", q: "¿Qué marca fabrica el Mustang?", options: ["Chevrolet", "Dodge", "Ford", "BMW"], answer: 2 },
  { category: "Vehículos 🚗", type: "options", q: "¿Qué marca fabrica el Hilux?", options: ["Ford", "Toyota", "Chevrolet", "Nissan"], answer: 1 },

  { category: "Herramientas 🔧", type: "options", q: "¿Qué herramienta se usa para clavar?", options: ["Martillo", "Alicate", "Taladro", "Nivel"], answer: 0 },
  { category: "Herramientas 🔧", type: "options", q: "¿Qué herramienta mide distancias?", options: ["Serrucho", "Cinta métrica", "Llave inglesa", "Escuadra"], answer: 1 },
  { category: "Herramientas 🔧", type: "options", q: "¿Qué herramienta sirve para hacer agujeros?", options: ["Taladro", "Llave inglesa", "Cinta métrica", "Nivel"], answer: 0 },

  { category: "Fútbol ⚽", type: "options", q: "¿Cuántos jugadores tiene un equipo en cancha?", options: ["9", "10", "11", "12"], answer: 2 },
  { category: "Fútbol ⚽", type: "options", q: "¿Qué tarjeta expulsa a un jugador?", options: ["Amarilla", "Roja", "Azul", "Verde"], answer: 1 },
  { category: "Fútbol ⚽", type: "options", q: "¿Qué país ganó el Mundial 2022?", options: ["Francia", "Brasil", "Argentina", "Croacia"], answer: 2 },

  { category: "Biblia 📖", type: "options", q: "¿Quién interpretó el sueño del faraón en Egipto?", options: ["Moisés", "José", "Daniel", "Samuel"], answer: 1 },
  { category: "Biblia 📖", type: "options", q: "¿Qué profeta desafió a los profetas de Baal en el monte Carmelo?", options: ["Elías", "Eliseo", "Isaías", "Jeremías"], answer: 0 },
  { category: "Biblia 📖", type: "options", q: "¿Quién fue el padre de Juan el Bautista?", options: ["Zacarías", "José", "Simeón", "Nicodemo"], answer: 0 },
  { category: "Biblia 📖", type: "options", q: "¿Quién pidió sabiduría a Dios en lugar de riquezas?", options: ["David", "Salomón", "Saúl", "Josué"], answer: 1 },
  { category: "Biblia 📖", type: "options", q: "¿Qué discípulo dudó de la resurrección hasta ver las heridas de Jesús?", options: ["Pedro", "Tomás", "Andrés", "Felipe"], answer: 1 },

  { category: "Reto físico 💪", type: "challenge", q: "Haz 5 lagartijas. Si las completas, es gol.", note: "La familia valida si cumplió el reto." },
  { category: "Reto físico 💪", type: "challenge", q: "Haz 10 sentadillas. Si las completas, es gol.", note: "La familia valida si cumplió el reto." },
  { category: "Reto rápido 🏃", type: "challenge", q: "Consigue un arete de tu esposa en menos de 30 segundos.", note: "Si lo consigue, es gol." },
  { category: "Reto rápido 🏃", type: "challenge", q: "Consigue una llave de la casa o del carro en menos de 30 segundos.", note: "Si la consigue, es gol." },
  { category: "Reto familiar 😂", type: "challenge", q: "Imita una frase típica de papá. Si la familia se ríe, es gol.", note: "La familia decide si fue gol." }
];

function renderSetup() {
  clearTimer();

  app.innerHTML = `
    <div class="screen">
      <div class="card">
        <div class="mustache">👨🏻‍🦱 〰️ 🎩 〰️ 👨🏽</div>
        <div class="title">PAPÁ WORLD CUP</div>
        <p class="subtitle">Preguntas, retos y goles para el Día del Padre</p>

        <div class="grid">
          <div class="box">
            <h2>Equipo 1</h2>
            <label>Equipo</label>
            <select id="teamAName">
              ${teamsCatalog.map((t, i) => `
                <option value="${i}" ${t.name === "Holanda" ? "selected" : ""}>
                  ${t.name}
                </option>
              `).join("")}
            </select>

            <div class="setup-logo-wrap">
              <img id="previewA" class="setup-logo" src="Holanda.png" alt="Holanda">
            </div>

            <label>Nombre del papá</label>
            <input id="playerAName" placeholder="Ejemplo: Carlos" />

            <button class="btn" onclick="addPlayer('A')">Agregar papá</button>
            <div id="listA"></div>
          </div>

          <div class="box">
            <h2>Equipo 2</h2>
            <label>Equipo</label>
            <select id="teamBName">
              ${teamsCatalog.map((t, i) => `
                <option value="${i}" ${t.name === "México" ? "selected" : ""}>
                  ${t.name}
                </option>
              `).join("")}
            </select>

            <div class="setup-logo-wrap">
              <img id="previewB" class="setup-logo" src="Mexico.png" alt="México">
            </div>

            <label>Nombre del papá</label>
            <input id="playerBName" placeholder="Ejemplo: Roberto" />

            <button class="btn" onclick="addPlayer('B')">Agregar papá</button>
            <div id="listB"></div>
          </div>
        </div>

        <label>Cantidad de turnos</label>
        <select id="maxRounds">
          <option value="10">10 turnos</option>
          <option value="20" selected>20 turnos</option>
          <option value="30">30 turnos</option>
        </select>

        <button class="btn" onclick="startGame()">INICIAR JUEGO</button>
      </div>
    </div>
  `;

  document.getElementById("teamAName").addEventListener("change", updatePreviews);
  document.getElementById("teamBName").addEventListener("change", updatePreviews);

  updateLists();
  updatePreviews();
}

function updatePreviews() {
  const a = teamsCatalog[Number(document.getElementById("teamAName").value)];
  const b = teamsCatalog[Number(document.getElementById("teamBName").value)];

  document.getElementById("previewA").src = a.img;
  document.getElementById("previewA").alt = a.name;

  document.getElementById("previewB").src = b.img;
  document.getElementById("previewB").alt = b.name;
}

function addPlayer(team) {
  const input = document.getElementById(team === "A" ? "playerAName" : "playerBName");
  const name = input.value.trim();

  if (!name) return alert("Escribe el nombre del papá.");

  if (team === "A") game.teamA.players.push({ name });
  else game.teamB.players.push({ name });

  input.value = "";
  updateLists();
}

function updateLists() {
  const listA = document.getElementById("listA");
  const listB = document.getElementById("listB");

  if (!listA || !listB) return;

  listA.innerHTML = game.teamA.players.map(p => `<div class="player-chip">👨 ${p.name}</div>`).join("");
  listB.innerHTML = game.teamB.players.map(p => `<div class="player-chip">👨 ${p.name}</div>`).join("");
}

function startGame() {
  const teamAData = teamsCatalog[Number(document.getElementById("teamAName").value)];
  const teamBData = teamsCatalog[Number(document.getElementById("teamBName").value)];

  game.teamA.name = teamAData.name;
  game.teamA.img = teamAData.img;

  game.teamB.name = teamBData.name;
  game.teamB.img = teamBData.img;

  game.maxRounds = Number(document.getElementById("maxRounds").value);

  if (game.teamA.players.length === 0 || game.teamB.players.length === 0) {
    alert("Cada equipo debe tener al menos un papá.");
    return;
  }

  nextTurn();
}

function getTeam(letter) {
  return letter === "A" ? game.teamA : game.teamB;
}

function getCurrentPlayer() {
  const team = getTeam(game.turnTeam);

  if (game.turnTeam === "A") {
    const player = team.players[game.playerIndexA % team.players.length];
    game.playerIndexA++;
    return player;
  }

  const player = team.players[game.playerIndexB % team.players.length];
  game.playerIndexB++;
  return player;
}

function getRandomItem() {
  let available = gameItems.filter(item => !usedQuestions.includes(item.q));

  if (available.length === 0) {
    usedQuestions = [];
    available = gameItems;
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  usedQuestions.push(selected.q);
  return selected;
}

function nextTurn() {
  clearTimer();

  if (game.round > game.maxRounds) {
    renderFinal();
    return;
  }

  game.locked = false;
  game.timeLeft = 60;
  game.currentPlayer = getCurrentPlayer();
  game.currentQuestion = getRandomItem();
  game.message = "";

  renderGame();
  startTimer();
}

function startTimer() {
  clearTimer();

  timerInterval = setInterval(() => {
    if (game.locked) return;

    game.timeLeft--;

    const timerBox = document.getElementById("timerBox");
    if (timerBox) timerBox.textContent = `⏱️ ${game.timeLeft}`;

    if (game.timeLeft <= 0) {
      clearTimer();
      answer(false, true);
    }
  }, 1000);
}

function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function renderGame() {
  const activeTeam = getTeam(game.turnTeam);

  app.innerHTML = `
    <div class="screen">
      <div class="scoreboard">
        ${renderTeamPanel(game.teamA)}
        <div class="score">${game.teamA.goals} - ${game.teamB.goals}</div>
        ${renderTeamPanel(game.teamB)}
      </div>

      <div class="game-card">
        <div class="mustache">〰️ 👨🏻‍🦱 FELIZ DÍA DEL PADRE 👨🏽‍🦱 〰️</div>

        <div id="timerBox" style="font-size:42px;font-weight:900;color:#0b5ed7;margin-bottom:15px;">
          ⏱️ ${game.timeLeft}
        </div>

        <div class="turn">
          Turno de ${activeTeam.name}<br>
          <img src="${activeTeam.img}" class="turn-logo" alt="${activeTeam.name}">
          <br>
          ${game.currentPlayer.name}
        </div>

        <div class="category">${game.currentQuestion.category}</div>

        <div class="question">${game.currentQuestion.q}</div>

        ${renderControls()}

        <div class="message">${game.message}</div>

        <p class="small">Turno ${game.round} de ${game.maxRounds}</p>
      </div>
    </div>
  `;
}

function renderTeamPanel(team) {
  return `
    <div class="team-panel">
      <img src="${team.img}" class="team-logo" alt="${team.name}">
      <h2>${team.name}</h2>
      <h3>⚽ ${team.goals}</h3>
    </div>
  `;
}

function renderControls() {
  if (game.currentQuestion.type === "options") {
    return `
      <div class="options">
        ${game.currentQuestion.options.map((op, i) => `
          <button class="option" onclick="answer(${i === game.currentQuestion.answer})">
            ${String.fromCharCode(65 + i)}) ${op}
          </button>
        `).join("")}
      </div>
    `;
  }

  return `
    <p class="note">${game.currentQuestion.note}</p>
    <div class="action-buttons">
      <button class="btn btn-green" onclick="answer(true)">✅ Gol</button>
      <button class="btn btn-red" onclick="answer(false)">❌ Falló</button>
    </div>
  `;
}

function answer(isCorrect, timeOut = false) {
  if (game.locked) return;

  game.locked = true;
  clearTimer();

  const activeTeam = getTeam(game.turnTeam);

  if (isCorrect) {
    activeTeam.goals++;
    game.message = `⚽ ¡GOOOOOOL para ${activeTeam.name}!`;
  } else {
    game.message = timeOut ? "⏰ Se acabó el tiempo. No hay gol." : "❌ Falló. No hay gol.";
  }

  renderGame();

  setTimeout(() => {
    game.turnTeam = game.turnTeam === "A" ? "B" : "A";
    game.round++;
    nextTurn();
  }, 1200);
}

function renderFinal() {
  clearTimer();

  let winner = "Empate";
  let winnerImg = null;

  if (game.teamA.goals > game.teamB.goals) {
    winner = `${game.teamA.name} gana`;
    winnerImg = game.teamA.img;
  }

  if (game.teamB.goals > game.teamA.goals) {
    winner = `${game.teamB.name} gana`;
    winnerImg = game.teamB.img;
  }

  app.innerHTML = `
    <div class="screen">
      <div class="card">
        <div class="mustache">〰️ 👨🏻‍🦱 🏆 👨🏽‍🦱 〰️</div>
        <div class="final-title">FINAL DEL JUEGO</div>

        <div style="text-align:center;">
          ${winnerImg ? `<img src="${winnerImg}" class="winner-logo" alt="${winner}">` : "🤝"}
        </div>

        <h1 style="text-align:center;">${winner}</h1>

        <div class="score" style="max-width:320px;margin:25px auto;">
          ${game.teamA.goals} - ${game.teamB.goals}
        </div>

        <button class="btn" onclick="location.reload()">JUGAR OTRA VEZ</button>
      </div>
    </div>
  `;
}

renderSetup();
