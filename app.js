const app = document.getElementById("app");

const teamsCatalog = [
  { name: "México", flag: "🇲🇽", code: "MEX" },
  { name: "Canadá", flag: "🇨🇦", code: "CAN" },
  { name: "Estados Unidos", flag: "🇺🇸", code: "USA" },
  { name: "Brasil", flag: "🇧🇷", code: "BRA" },
  { name: "Argentina", flag: "🇦🇷", code: "ARG" },
  { name: "Holanda", flag: "🇳🇱", code: "NED" },
  { name: "España", flag: "🇪🇸", code: "ESP" },
  { name: "Francia", flag: "🇫🇷", code: "FRA" },
  { name: "Alemania", flag: "🇩🇪", code: "GER" },
  { name: "Portugal", flag: "🇵🇹", code: "POR" },
  { name: "Inglaterra", flag: "🏴", code: "ENG" },
  { name: "Colombia", flag: "🇨🇴", code: "COL" },
  { name: "Uruguay", flag: "🇺🇾", code: "URU" },
  { name: "Japón", flag: "🇯🇵", code: "JPN" },
  { name: "Corea del Sur", flag: "🇰🇷", code: "KOR" },
  { name: "Marruecos", flag: "🇲🇦", code: "MAR" },
  { name: "Croacia", flag: "🇭🇷", code: "CRO" },
  { name: "Suiza", flag: "🇨🇭", code: "SUI" },
  { name: "Bélgica", flag: "🇧🇪", code: "BEL" },
  { name: "Panamá", flag: "🇵🇦", code: "PAN" }
];

let usedQuestions = [];

let game = {
  teamA: {
    name: "Holanda",
    flag: "🇳🇱",
    code: "NED",
    players: [],
    goals: 0
  },
  teamB: {
    name: "Brasil",
    flag: "🇧🇷",
    code: "BRA",
    players: [],
    goals: 0
  },
  turnTeam: "A",
  playerIndexA: 0,
  playerIndexB: 0,
  currentPlayer: null,
  currentQuestion: null,
  round: 1,
  maxRounds: 20,
  message: ""
};

const wifeQuestions = [
  "¿Cuál es la comida favorita de tu esposa?",
  "¿Cuál es el color favorito de tu esposa?",
  "¿Cuál es el postre favorito de tu esposa?",
  "¿Qué bebida le gusta más a tu esposa?",
  "¿Qué comida no le gusta a tu esposa?",
  "¿Cuál es la película favorita de tu esposa?",
  "¿Cuál es la canción favorita de tu esposa?",
  "¿Qué regalo le gustaría recibir a tu esposa?",
  "¿Qué la pone feliz rápidamente?",
  "¿Qué le molesta más a tu esposa?",
  "¿Cuál es el sueño más grande de tu esposa?",
  "¿Cuál es el lugar favorito de tu esposa?",
  "¿Qué frase repite mucho tu esposa?",
  "¿Qué actividad disfruta hacer contigo?",
  "¿Qué fecha especial nunca debes olvidar con tu esposa?"
];

const childQuestions = [
  "¿Cuál es la comida favorita de tu hijo o hija?",
  "¿Cuál es el color favorito de tu hijo o hija?",
  "¿Qué quiere ser tu hijo o hija cuando sea grande?",
  "¿Cuál es el animal favorito de tu hijo o hija?",
  "¿Cuál es la materia favorita de tu hijo o hija?",
  "¿Qué materia le cuesta más a tu hijo o hija?",
  "¿Quién es el mejor amigo de tu hijo o hija?",
  "¿Qué deporte le gusta más a tu hijo o hija?",
  "¿Qué videojuego le gusta más a tu hijo o hija?",
  "¿Qué película o serie le gusta ver a tu hijo o hija?",
  "¿Qué comida nunca comería tu hijo o hija?",
  "¿Qué le da miedo a tu hijo o hija?",
  "¿Qué hace reír mucho a tu hijo o hija?",
  "¿Qué pone triste a tu hijo o hija?",
  "¿Qué le gusta hacer contigo a tu hijo o hija?"
];

const familyQuestions = [
  "¿Cuál ha sido el mejor paseo familiar?",
  "¿Cuál es la comida que más disfrutan comer en familia?",
  "¿Quién tarda más en alistarse en la casa?",
  "¿Quién canta más en la casa?",
  "¿Quién ve más televisión en la casa?",
  "¿Quién deja más cosas tiradas?",
  "¿Qué lugar quiere visitar la familia?",
  "¿Qué actividad disfrutan hacer todos juntos?",
  "¿Cuál es la tradición familiar más bonita?",
  "¿Qué frase se repite mucho en la casa?"
];

const triviaQuestions = [
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Corolla?", options: ["Nissan", "Toyota", "Mazda", "Kia"], answer: 1 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Civic?", options: ["Honda", "Toyota", "Ford", "Hyundai"], answer: 0 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Hilux?", options: ["Ford", "Toyota", "Chevrolet", "Nissan"], answer: 1 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Mustang?", options: ["Chevrolet", "Dodge", "Ford", "BMW"], answer: 2 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Sentra?", options: ["Nissan", "Toyota", "Honda", "Suzuki"], answer: 0 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Sportage?", options: ["Kia", "Mazda", "Ford", "Toyota"], answer: 0 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Tucson?", options: ["Hyundai", "Honda", "Nissan", "Volkswagen"], answer: 0 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Ranger?", options: ["Ford", "Toyota", "Mitsubishi", "Kia"], answer: 0 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el L200?", options: ["Mitsubishi", "Nissan", "Chevrolet", "Honda"], answer: 0 },
  { category: "Vehículos 🚗", q: "¿Qué marca fabrica el Amarok?", options: ["Volkswagen", "Toyota", "Ford", "Mazda"], answer: 0 },

  { category: "Herramientas 🔧", q: "¿Para qué sirve un nivel?", options: ["Cortar madera", "Medir corriente", "Verificar si algo está nivelado", "Pintar paredes"], answer: 2 },
  { category: "Herramientas 🔧", q: "¿Qué herramienta se usa para clavar?", options: ["Martillo", "Alicate", "Taladro", "Nivel"], answer: 0 },
  { category: "Herramientas 🔧", q: "¿Qué herramienta mide distancias?", options: ["Serrucho", "Cinta métrica", "Llave inglesa", "Escuadra"], answer: 1 },
  { category: "Herramientas 🔧", q: "¿Qué herramienta sirve para cortar madera manualmente?", options: ["Serrucho", "Alicate", "Llave Allen", "Nivel"], answer: 0 },
  { category: "Herramientas 🔧", q: "¿Qué herramienta se usa para apretar tornillos?", options: ["Destornillador", "Martillo", "Brocha", "Cincel"], answer: 0 },
  { category: "Herramientas 🔧", q: "¿Qué herramienta sirve para hacer agujeros?", options: ["Taladro", "Llave inglesa", "Cinta métrica", "Nivel"], answer: 0 },
  { category: "Herramientas 🔧", q: "¿Qué herramienta sirve para cortar alambre?", options: ["Alicate", "Rodillo", "Serrucho", "Escuadra"], answer: 0 },
  { category: "Herramientas 🔧", q: "¿Qué llave se ajusta a distintos tamaños?", options: ["Llave ajustable", "Llave fija", "Llave Allen", "Llave de paso"], answer: 0 },

  { category: "Fútbol ⚽", q: "¿Cuántos jugadores tiene un equipo en cancha?", options: ["9", "10", "11", "12"], answer: 2 },
  { category: "Fútbol ⚽", q: "¿Qué tarjeta expulsa a un jugador?", options: ["Amarilla", "Roja", "Azul", "Verde"], answer: 1 },
  { category: "Fútbol ⚽", q: "¿Cuánto dura un partido oficial sin tiempo extra?", options: ["60 minutos", "80 minutos", "90 minutos", "100 minutos"], answer: 2 },
  { category: "Fútbol ⚽", q: "¿Qué jugador puede usar las manos dentro de su área?", options: ["Defensa", "Delantero", "Portero", "Capitán"], answer: 2 },
  { category: "Fútbol ⚽", q: "¿Qué país ganó el Mundial 2022?", options: ["Francia", "Brasil", "Argentina", "Croacia"], answer: 2 },
  { category: "Fútbol ⚽", q: "¿Qué selección es conocida como La Canarinha?", options: ["Brasil", "España", "Holanda", "Alemania"], answer: 0 },

  { category: "Biblia 📖", q: "¿Quién construyó el arca?", options: ["Moisés", "Noé", "Abraham", "David"], answer: 1 },
  { category: "Biblia 📖", q: "¿Quién fue tragado por un gran pez?", options: ["Jonás", "Pedro", "Pablo", "Isaías"], answer: 0 },
  { category: "Biblia 📖", q: "¿Quién recibió los Diez Mandamientos?", options: ["Moisés", "José", "Salomón", "Elías"], answer: 0 },
  { category: "Biblia 📖", q: "¿Quién venció a Goliat?", options: ["David", "Sansón", "Josué", "Daniel"], answer: 0 },
  { category: "Biblia 📖", q: "¿Dónde nació Jesús?", options: ["Nazaret", "Jerusalén", "Belén", "Galilea"], answer: 2 },
  { category: "Biblia 📖", q: "¿Quién fue conocido por su gran fuerza?", options: ["Sansón", "Samuel", "Jacob", "Isaac"], answer: 0 },
  { category: "Biblia 📖", q: "¿Quién fue echado al foso de los leones?", options: ["Daniel", "David", "José", "Moisés"], answer: 0 },
  { category: "Biblia 📖", q: "¿Qué libro inicia la Biblia?", options: ["Éxodo", "Génesis", "Mateo", "Salmos"], answer: 1 }
];

function renderSetup() {
  app.innerHTML = `
    <div class="screen">
      <div class="card">
        <div class="title">⚽ PAPÁ WORLD CUP</div>
        <p class="subtitle">Preguntas, goles y diversión del Día del Padre</p>

        <div class="grid">
          <div class="box">
            <h2>Equipo 1</h2>

            <label>Seleccionar equipo</label>
            <select id="teamAName">
              ${teamsCatalog.map((t, i) => `
                <option value="${i}" ${t.name === "Holanda" ? "selected" : ""}>
                  ${t.flag} ${t.name}
                </option>
              `).join("")}
            </select>

            <label>Nombre del papá</label>
            <input id="playerAName" placeholder="Ejemplo: Carlos" />

            <button class="btn" onclick="addPlayer('A')">Agregar papá</button>
            <div id="listA"></div>
          </div>

          <div class="box">
            <h2>Equipo 2</h2>

            <label>Seleccionar equipo</label>
            <select id="teamBName">
              ${teamsCatalog.map((t, i) => `
                <option value="${i}" ${t.name === "Brasil" ? "selected" : ""}>
                  ${t.flag} ${t.name}
                </option>
              `).join("")}
            </select>

            <label>Nombre del papá</label>
            <input id="playerBName" placeholder="Ejemplo: Roberto" />

            <button class="btn" onclick="addPlayer('B')">Agregar papá</button>
            <div id="listB"></div>
          </div>
        </div>

        <label>Cantidad de preguntas totales</label>
        <select id="maxRounds">
          <option value="10">10 preguntas</option>
          <option value="20" selected>20 preguntas</option>
          <option value="30">30 preguntas</option>
          <option value="40">40 preguntas</option>
        </select>

        <button class="btn btn-yellow" onclick="startGame()">INICIAR PARTIDO</button>

        <p class="small">
          Regla simple: si responde bien, su equipo anota gol. Si responde mal, no anota. Luego cambia el turno.
        </p>
      </div>
    </div>
  `;

  updateLists();
}

function addPlayer(team) {
  const input = document.getElementById(team === "A" ? "playerAName" : "playerBName");
  const name = input.value.trim();

  if (!name) {
    alert("Escribe el nombre del papá.");
    return;
  }

  const player = { name };

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
  const teamAData = teamsCatalog[Number(document.getElementById("teamAName").value)];
  const teamBData = teamsCatalog[Number(document.getElementById("teamBName").value)];

  game.teamA.name = teamAData.name;
  game.teamA.flag = teamAData.flag;
  game.teamA.code = teamAData.code;

  game.teamB.name = teamBData.name;
  game.teamB.flag = teamBData.flag;
  game.teamB.code = teamBData.code;

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

function nextTurn() {
  if (game.round > game.maxRounds) {
    renderFinal();
    return;
  }

  game.currentPlayer = getCurrentPlayer();
  game.currentQuestion = getRandomQuestion();
  game.message = "";
  renderGame();
}

function getRandomQuestion() {
  const allQuestions = [
    ...wifeQuestions.map(q => ({
      type: "judge",
      category: "Esposa ❤️",
      q,
      note: "La esposa confirma si la respuesta está correcta."
    })),
    ...childQuestions.map(q => ({
      type: "judge",
      category: "Hijos 👧👦",
      q,
      note: "Los hijos confirman si la respuesta está correcta."
    })),
    ...familyQuestions.map(q => ({
      type: "judge",
      category: "Familia 👨‍👩‍👧‍👦",
      q,
      note: "La familia confirma si la respuesta está correcta."
    })),
    ...triviaQuestions.map(q => ({
      type: "options",
      ...q
    }))
  ];

  let available = allQuestions.filter(q => !usedQuestions.includes(q.q));

  if (available.length === 0) {
    usedQuestions = [];
    available = allQuestions;
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  usedQuestions.push(selected.q);

  return selected;
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

      <div class="stadium">
        <div class="crowd"></div>
        <div class="midline"></div>
        <div class="circle"></div>
        <div class="goal left"></div>
        <div class="goal right"></div>

        <div class="player-icon attacker">
          <div style="font-size:42px;">${activeTeam.flag}</div>
          🏃‍♂️
        </div>

        <div class="ball">⚽</div>

        <div class="player-icon goalkeeper">
          🥅
        </div>

        <div style="position:absolute;left:160px;top:45px;font-size:34px;font-weight:900;">
          ${activeTeam.code}
        </div>

        <div style="position:absolute;right:160px;top:45px;font-size:34px;font-weight:900;">
          GOL
        </div>
      </div>

      <div class="main-game">
        <div class="turn">
          ⚽ Turno de ${activeTeam.flag} ${activeTeam.name}: ${game.currentPlayer.name}
        </div>

        <div style="text-align:center;">
          <span class="badge">${game.currentQuestion.category}</span>
        </div>

        <div class="question">${game.currentQuestion.q}</div>

        ${renderQuestionControls()}

        <div class="message">${game.message}</div>

        <p class="small" style="text-align:center;">
          Pregunta ${game.round} de ${game.maxRounds}
        </p>
      </div>

      <div class="stats">
        <div class="box">
          <h3>${game.teamA.flag} ${game.teamA.name}</h3>
          ${renderPlayers(game.teamA.players)}
        </div>

        <div class="box">
          <h3>${game.teamB.flag} ${game.teamB.name}</h3>
          ${renderPlayers(game.teamB.players)}
        </div>
      </div>
    </div>
  `;
}

function renderTeamPanel(team) {
  return `
    <div class="team-panel">
      <div style="font-size:58px;">${team.flag}</div>
      <h2>${team.name}</h2>
      <p>⚽ Goles: ${team.goals}</p>
    </div>
  `;
}

function renderQuestionControls() {
  if (game.currentQuestion.type === "judge") {
    return `
      <p class="small" style="text-align:center;">
        ${game.currentQuestion.note}
      </p>

      <div class="judge">
        <button class="btn" onclick="answer(true)">✅ Correcto: Gol</button>
        <button class="btn btn-red" onclick="answer(false)">❌ Incorrecto: No hay gol</button>
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
  const activeTeam = getTeam(game.turnTeam);

  if (isCorrect) {
    activeTeam.goals++;
    game.message = `⚽ ¡GOOOOOOL para ${activeTeam.flag} ${activeTeam.name}!`;
  } else {
    game.message = "❌ Falló. No hay gol.";
  }

  renderGame();

  setTimeout(() => {
    game.turnTeam = game.turnTeam === "A" ? "B" : "A";
    game.round++;
    nextTurn();
  }, 1200);
}

function renderPlayers(players) {
  return players.map(p => `
    <div class="player-chip">👨 ${p.name}</div>
  `).join("");
}

function renderFinal() {
  let winnerText = "";
  let winnerFlag = "";

  if (game.teamA.goals > game.teamB.goals) {
    winnerText = `${game.teamA.name} gana`;
    winnerFlag = game.teamA.flag;
  } else if (game.teamB.goals > game.teamA.goals) {
    winnerText = `${game.teamB.name} gana`;
    winnerFlag = game.teamB.flag;
  } else {
    winnerText = "Empate";
    winnerFlag = "🤝";
  }

  app.innerHTML = `
    <div class="screen">
      <div class="card">
        <div class="title">🏆 FINAL DEL PARTIDO</div>

        <div style="text-align:center;font-size:90px;margin:20px;">
          ${winnerFlag}
        </div>

        <h1 style="text-align:center;color:#ffd447;">
          ${winnerText}
        </h1>

        <div class="score" style="max-width:320px;margin:25px auto;">
          ${game.teamA.goals} - ${game.teamB.goals}
        </div>

        <div class="grid">
          <div class="box">
            <h2>${game.teamA.flag} ${game.teamA.name}</h2>
            ${renderPlayers(game.teamA.players)}
          </div>

          <div class="box">
            <h2>${game.teamB.flag} ${game.teamB.name}</h2>
            ${renderPlayers(game.teamB.players)}
          </div>
        </div>

        <button class="btn btn-yellow" onclick="location.reload()">JUGAR OTRA VEZ</button>
      </div>
    </div>
  `;
}

renderSetup();
