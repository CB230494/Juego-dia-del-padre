const app = document.getElementById("app");

const teamsCatalog = [
  "Holanda 🇳🇱",
  "Brasil 🇧🇷",
  "Argentina 🇦🇷",
  "España 🇪🇸",
  "Francia 🇫🇷",
  "Alemania 🇩🇪",
  "Portugal 🇵🇹",
  "Costa Rica 🇨🇷"
];

let game = {
  teamA: {
    name: "Holanda 🇳🇱",
    players: [],
    score: 0,
    goals: 0
  },
  teamB: {
    name: "Brasil 🇧🇷",
    players: [],
    score: 0,
    goals: 0
  },
  turnTeam: "A",
  attackIndexA: 0,
  attackIndexB: 0,
  defenseIndexA: 0,
  defenseIndexB: 0,
  phase: "attack",
  attacker: null,
  defender: null,
  currentQuestion: null,
  round: 1,
  message: ""
};

const familyQuestions = [
  "¿Cuál es la comida favorita de tu esposa?",
  "¿Cuál es el color favorito de tu esposa?",
  "¿Qué le molesta más a tu esposa?",
  "¿Cuál es el sueño más grande de tu esposa?",
  "¿Cuál es la película favorita de tu esposa?",
  "¿Qué regalo le gustaría recibir a tu esposa?",
  "¿Cuál es la comida favorita de tu hijo o hija?",
  "¿Quién es el mejor amigo de tu hijo o hija?",
  "¿Cuál es el pasatiempo favorito de tu hijo o hija?",
  "¿Qué le da miedo a tu hijo o hija?",
  "¿Qué materia le gusta más a tu hijo o hija?",
  "¿Qué quiere ser tu hijo o hija cuando sea grande?"
];

const triviaQuestions = [
  {
    category: "Vehículos 🚗",
    q: "¿Qué marca fabrica el Corolla?",
    options: ["Nissan", "Toyota", "Mazda", "Kia"],
    answer: 1
  },
  {
    category: "Vehículos 🚗",
    q: "¿Qué marca fabrica el Civic?",
    options: ["Honda", "Toyota", "Ford", "Hyundai"],
    answer: 0
  },
  {
    category: "Vehículos 🚗",
    q: "¿Qué marca fabrica el Hilux?",
    options: ["Ford", "Toyota", "Chevrolet", "Nissan"],
    answer: 1
  },
  {
    category: "Vehículos 🚗",
    q: "¿Qué marca fabrica el Mustang?",
    options: ["Chevrolet", "Dodge", "Ford", "BMW"],
    answer: 2
  },
  {
    category: "Herramientas 🔧",
    q: "¿Para qué sirve un nivel?",
    options: ["Cortar madera", "Medir corriente", "Verificar si algo está recto", "Pintar paredes"],
    answer: 2
  },
  {
    category: "Herramientas 🔧",
    q: "¿Qué herramienta se usa para clavar?",
    options: ["Martillo", "Alicate", "Taladro", "Nivel"],
    answer: 0
  },
  {
    category: "Herramientas 🔧",
    q: "¿Qué herramienta mide distancias?",
    options: ["Serrucho", "Cinta métrica", "Llave inglesa", "Escuadra"],
    answer: 1
  },
  {
    category: "Fútbol ⚽",
    q: "¿Cuántos jugadores tiene un equipo en cancha?",
    options: ["9", "10", "11", "12"],
    answer: 2
  },
  {
    category: "Fútbol ⚽",
    q: "¿Qué tarjeta expulsa a un jugador?",
    options: ["Amarilla", "Roja", "Azul", "Verde"],
    answer: 1
  },
  {
    category: "Fútbol ⚽",
    q: "¿Cuánto dura un partido oficial sin tiempo extra?",
    options: ["60 minutos", "80 minutos", "90 minutos", "100 minutos"],
    answer: 2
  }
];

function renderSetup() {
  app.innerHTML = `
    <div class="screen">
      <div class="card">
        <div class="title">⚽ PAPÁ WORLD CUP</div>
        <p class="subtitle">La Copa del Conocimiento Familiar</p>

        <div class="grid">
          <div class="box">
            <h2>Equipo 1</h2>
            <label>Seleccionar equipo</label>
            <select id="teamAName">
              ${teamsCatalog.map(t => `<option>${t}</option>`).join("")}
            </select>

            <label>Nombre del papá</label>
            <input id="playerAName" placeholder="Ejemplo: Carlos" />

            <button class="btn" onclick="addPlayer('A')">Agregar papá</button>
            <div id="listA" class="players-list"></div>
          </div>

          <div class="box">
            <h2>Equipo 2</h2>
            <label>Seleccionar equipo</label>
            <select id="teamBName">
              ${teamsCatalog.map(t => `<option>${t}</option>`).join("")}
            </select>

            <label>Nombre del papá</label>
            <input id="playerBName" placeholder="Ejemplo: Roberto" />

            <button class="btn" onclick="addPlayer('B')">Agregar papá</button>
            <div id="listB" class="players-list"></div>
          </div>
        </div>

        <button class="btn btn-yellow" onclick="startGame()">INICIAR PARTIDO</button>

        <p class="small">
          Reglas: 3 respuestas malas = tarjeta roja. El papá pierde puntos, no juega un turno y luego regresa.
        </p>
      </div>
    </div>
  `;

  updateLists();
}

function addPlayer(team) {
  const input = document.getElementById(team === "A" ? "playerAName" : "playerBName");
  const name = input.value.trim();

  if (!name) return alert("Escribe el nombre del papá.");

  const player = {
    name,
    points: 0,
    mistakes: 0,
    expelledTurns: 0
  };

  if (team === "A") {
    game.teamA.players.push(player);
  } else {
    game.teamB.players.push(player);
  }

  input.value = "";
  updateLists();
}

function updateLists() {
  const listA = document.getElementById("listA");
  const listB = document.getElementById("listB");

  if (!listA || !listB) return;

  listA.innerHTML = game.teamA.players.map(p => `
    <div class="player-chip">👨 ${p.name}</div>
  `).join("");

  listB.innerHTML = game.teamB.players.map(p => `
    <div class="player-chip">👨 ${p.name}</div>
  `).join("");
}

function startGame() {
  game.teamA.name = document.getElementById("teamAName").value;
  game.teamB.name = document.getElementById("teamBName").value;

  if (game.teamA.players.length === 0 || game.teamB.players.length === 0) {
    alert("Cada equipo debe tener al menos un papá.");
    return;
  }

  nextTurn();
}

function getTeam(letter) {
  return letter === "A" ? game.teamA : game.teamB;
}

function getOtherTeam(letter) {
  return letter === "A" ? game.teamB : game.teamA;
}

function getNextPlayer(teamLetter, role) {
  const team = getTeam(teamLetter);
  let indexKey = "";

  if (teamLetter === "A" && role === "attack") indexKey = "attackIndexA";
  if (teamLetter === "B" && role === "attack") indexKey = "attackIndexB";
  if (teamLetter === "A" && role === "defense") indexKey = "defenseIndexA";
  if (teamLetter === "B" && role === "defense") indexKey = "defenseIndexB";

  let attempts = 0;

  while (attempts < team.players.length) {
    const index = game[indexKey] % team.players.length;
    const player = team.players[index];
    game[indexKey]++;

    if (player.expelledTurns > 0) {
      player.expelledTurns--;
      attempts++;
      continue;
    }

    return player;
  }

  return team.players[0];
}

function nextTurn() {
  game.phase = "attack";

  const attackingTeam = game.turnTeam;
  const defendingTeam = attackingTeam === "A" ? "B" : "A";

  game.attacker = getNextPlayer(attackingTeam, "attack");
  game.defender = getNextPlayer(defendingTeam, "defense");

  game.currentQuestion = getRandomQuestion();
  game.message = "";

  renderGame();
}

function getRandomQuestion() {
  const useFamily = Math.random() < 0.45;

  if (useFamily) {
    return {
      type: "family",
      category: "Familia ❤️",
      q: familyQuestions[Math.floor(Math.random() * familyQuestions.length)]
    };
  }

  return {
    type: "trivia",
    ...triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)]
  };
}

function renderGame() {
  app.innerHTML = `
    <div class="screen">
      <div class="scoreboard">
        <div class="team-panel">
          <h2>${game.teamA.name}</h2>
          <p>Goles: ${game.teamA.goals}</p>
          <p>Puntos: ${game.teamA.score}</p>
        </div>

        <div class="score">
          ${game.teamA.goals} - ${game.teamB.goals}
        </div>

        <div class="team-panel">
          <h2>${game.teamB.name}</h2>
          <p>Goles: ${game.teamB.goals}</p>
          <p>Puntos: ${game.teamB.score}</p>
        </div>
      </div>

      <div class="field">
        <div class="midline"></div>
        <div class="circle"></div>
        <div class="goal left"></div>
        <div class="goal right"></div>
        <div class="player-icon attacker" id="attackerIcon">🏃‍♂️</div>
        <div class="ball" id="ball">⚽</div>
        <div class="player-icon goalkeeper" id="keeperIcon">🧤</div>
      </div>

      <div class="main-game">
        <div class="turn">
          ${game.phase === "attack" 
            ? `Turno de ataque: ${game.attacker.name}` 
            : `Turno de atajada: ${game.defender.name}`}
        </div>

        <div class="small" style="text-align:center;">
          Categoría: ${game.currentQuestion.category}
        </div>

        <div class="question">
          ${game.currentQuestion.q}
        </div>

        ${renderQuestionControls()}

        <div class="message">${game.message}</div>
      </div>

      <div class="stats">
        <div class="box">
          <h3>${game.teamA.name}</h3>
          ${renderPlayers(game.teamA.players)}
        </div>

        <div class="box">
          <h3>${game.teamB.name}</h3>
          ${renderPlayers(game.teamB.players)}
        </div>
      </div>
    </div>
  `;
}

function renderQuestionControls() {
  if (game.currentQuestion.type === "family") {
    return `
      <p class="small" style="text-align:center;">
        Papá responde en voz alta. Mamá o los hijos deciden si está correcto.
      </p>

      <div class="judge">
        <button class="btn" onclick="answer(true)">✅ Correcto</button>
        <button class="btn btn-red" onclick="answer(false)">❌ Incorrecto</button>
      </div>
    `;
  }

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

function answer(isCorrect) {
  const activePlayer = game.phase === "attack" ? game.attacker : game.defender;
  const activeTeamLetter = findPlayerTeam(activePlayer);
  const activeTeam = getTeam(activeTeamLetter);

  if (isCorrect) {
    activePlayer.points += 10;
    activeTeam.score += 10;
    game.message = "✅ Respuesta correcta: +10 puntos";
  } else {
    activePlayer.mistakes++;
    game.message = "❌ Respuesta incorrecta";

    checkCards(activePlayer, activeTeam);
  }

  if (game.phase === "attack") {
    if (isCorrect) {
      game.phase = "defense";
      game.currentQuestion = getRandomQuestion();
      animateShotStart();
      renderGame();
      return;
    } else {
      switchTurn();
      return;
    }
  }

  if (game.phase === "defense") {
    if (isCorrect) {
      activePlayer.points += 15;
      activeTeam.score += 15;
      game.message = "🧤 ¡Atajadón! +15 puntos";
      animateSave();
    } else {
      goal();
      return;
    }

    setTimeout(() => {
      switchTurn();
    }, 1200);
  }

  renderGame();
}

function checkCards(player, team) {
  if (player.mistakes === 2) {
    game.message += " 🟨 Tarjeta amarilla.";
  }

  if (player.mistakes >= 3) {
    player.mistakes = 0;
    player.expelledTurns = 1;
    player.points -= 30;
    team.score -= 30;

    game.message += ` 🟥 ${player.name} fue expulsado temporalmente. Pierde 30 puntos y no juega un turno.`;
  }
}

function goal() {
  const attackingTeamLetter = findPlayerTeam(game.attacker);
  const attackingTeam = getTeam(attackingTeamLetter);

  attackingTeam.goals++;
  attackingTeam.score += 20;
  game.attacker.points += 20;

  game.message = `⚽ ¡GOOOOOOL de ${game.attacker.name}! +20 puntos`;

  animateGoal();

  setTimeout(() => {
    switchTurn();
  }, 1400);

  renderGame();
}

function switchTurn() {
  game.turnTeam = game.turnTeam === "A" ? "B" : "A";
  game.round++;
  nextTurn();
}

function findPlayerTeam(player) {
  if (game.teamA.players.includes(player)) return "A";
  return "B";
}

function renderPlayers(players) {
  return players.map(p => `
    <div class="player-chip">
      👨 ${p.name}<br>
      Puntos: ${p.points}<br>
      Errores: ${p.mistakes}/3
      ${p.expelledTurns > 0 ? `<br><span class="red-card">🟥 Expulsado: pierde próximo turno</span>` : ""}
      ${p.mistakes === 2 ? `<br><span class="yellow-card">🟨 En peligro</span>` : ""}
    </div>
  `).join("");
}

function animateShotStart() {
  setTimeout(() => {
    const ball = document.getElementById("ball");
    if (ball) ball.style.left = "520px";
  }, 100);
}

function animateGoal() {
  setTimeout(() => {
    const ball = document.getElementById("ball");
    if (ball) {
      ball.style.left = "920px";
      ball.style.bottom = "125px";
    }
  }, 100);
}

function animateSave() {
  setTimeout(() => {
    const keeper = document.getElementById("keeperIcon");
    const ball = document.getElementById("ball");

    if (keeper) keeper.style.right = "230px";
    if (ball) ball.style.left = "760px";
  }, 100);
}

renderSetup();
