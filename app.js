const app = document.getElementById("app");

const teamsCatalog = [
  "México 🇲🇽", "Sudáfrica 🇿🇦", "Corea del Sur 🇰🇷", "Chequia 🇨🇿",
  "Canadá 🇨🇦", "Bosnia y Herzegovina 🇧🇦", "Qatar 🇶🇦", "Suiza 🇨🇭",
  "Brasil 🇧🇷", "Marruecos 🇲🇦", "Haití 🇭🇹", "Escocia 🏴",
  "Estados Unidos 🇺🇸", "Paraguay 🇵🇾", "Australia 🇦🇺", "Turquía 🇹🇷",
  "Alemania 🇩🇪", "Curazao 🇨🇼", "Costa de Marfil 🇨🇮", "Ecuador 🇪🇨",
  "Holanda 🇳🇱", "Japón 🇯🇵", "Suecia 🇸🇪", "Túnez 🇹🇳",
  "Bélgica 🇧🇪", "Egipto 🇪🇬", "Irán 🇮🇷", "Nueva Zelanda 🇳🇿",
  "España 🇪🇸", "Cabo Verde 🇨🇻", "Arabia Saudita 🇸🇦", "Uruguay 🇺🇾",
  "Francia 🇫🇷", "Senegal 🇸🇳", "Irak 🇮🇶", "Noruega 🇳🇴",
  "Argentina 🇦🇷", "Argelia 🇩🇿", "Austria 🇦🇹", "Jordania 🇯🇴",
  "Portugal 🇵🇹", "República Democrática del Congo 🇨🇩", "Uzbekistán 🇺🇿", "Colombia 🇨🇴",
  "Inglaterra 🏴", "Croacia 🇭🇷", "Ghana 🇬🇭", "Panamá 🇵🇦"
];

let usedQuestions = [];

let game = {
  teamA: { name: "Holanda 🇳🇱", players: [], score: 0, goals: 0 },
  teamB: { name: "Brasil 🇧🇷", players: [], score: 0, goals: 0 },
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
  "¿Qué bebida le gusta más a tu esposa?",
  "¿Qué comida no le gusta a tu esposa?",
  "¿Qué regalo le gustaría recibir a tu esposa?",
  "¿Cuál es la película favorita de tu esposa?",
  "¿Cuál es la canción favorita de tu esposa?",
  "¿Qué le molesta más a tu esposa?",
  "¿Qué la pone feliz rápidamente?",
  "¿Cuál es el sueño más grande de tu esposa?",
  "¿Cuál es el lugar favorito de tu esposa?",
  "¿Qué es lo primero que hace tu esposa al despertar?",
  "¿Qué frase repite mucho tu esposa?",
  "¿Qué color de ropa usa más tu esposa?",
  "¿Qué postre le gusta más a tu esposa?",
  "¿Qué fecha especial nunca debes olvidar?",
  "¿Cuál fue el primer regalo que le diste?",
  "¿Qué es lo que más admira tu esposa de ti?",
  "¿Qué le da más tranquilidad a tu esposa?",
  "¿Qué actividad disfruta hacer en familia?",
  "¿Cuál es la comida favorita de tu hijo o hija?",
  "¿Cuál es el color favorito de tu hijo o hija?",
  "¿Quién es el mejor amigo de tu hijo o hija?",
  "¿Cuál es el videojuego favorito de tu hijo o hija?",
  "¿Cuál es la materia favorita de tu hijo o hija?",
  "¿Qué materia le cuesta más?",
  "¿Qué le da miedo a tu hijo o hija?",
  "¿Qué deporte le gusta más?",
  "¿Qué quiere ser cuando sea grande?",
  "¿Qué juguete u objeto cuida más?",
  "¿Qué comida nunca comería?",
  "¿Qué canción le gusta mucho?",
  "¿Qué película o serie le gusta ver?",
  "¿Qué lo hace reír mucho?",
  "¿Qué lo pone triste?",
  "¿Qué le gusta hacer contigo?",
  "¿Qué le gusta hacer con mamá?",
  "¿Qué lugar le gusta visitar?",
  "¿Cuál es su animal favorito?",
  "¿Cuál fue su último logro importante?"
];

const triviaQuestions = [
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Corolla?", options:["Nissan","Toyota","Mazda","Kia"], answer:1 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Civic?", options:["Honda","Toyota","Ford","Hyundai"], answer:0 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Hilux?", options:["Ford","Toyota","Chevrolet","Nissan"], answer:1 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Mustang?", options:["Chevrolet","Dodge","Ford","BMW"], answer:2 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Sentra?", options:["Nissan","Toyota","Honda","Suzuki"], answer:0 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Sportage?", options:["Kia","Mazda","Ford","Toyota"], answer:0 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Tucson?", options:["Hyundai","Honda","Nissan","Volkswagen"], answer:0 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Ranger?", options:["Ford","Toyota","Mitsubishi","Kia"], answer:0 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el L200?", options:["Mitsubishi","Nissan","Chevrolet","Honda"], answer:0 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Amarok?", options:["Volkswagen","Toyota","Ford","Mazda"], answer:0 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el CX-5?", options:["Mazda","Hyundai","Kia","Nissan"], answer:0 },
  { category:"Vehículos 🚗", q:"¿Qué marca fabrica el Prado?", options:["Toyota","Ford","Jeep","Honda"], answer:0 },

  { category:"Herramientas 🔧", q:"¿Para qué sirve un nivel?", options:["Cortar madera","Medir corriente","Verificar si algo está nivelado","Pintar paredes"], answer:2 },
  { category:"Herramientas 🔧", q:"¿Qué herramienta se usa para clavar?", options:["Martillo","Alicate","Taladro","Nivel"], answer:0 },
  { category:"Herramientas 🔧", q:"¿Qué herramienta mide distancias?", options:["Serrucho","Cinta métrica","Llave inglesa","Escuadra"], answer:1 },
  { category:"Herramientas 🔧", q:"¿Qué herramienta sirve para cortar madera manualmente?", options:["Serrucho","Alicate","Llave Allen","Nivel"], answer:0 },
  { category:"Herramientas 🔧", q:"¿Qué herramienta se usa para apretar tornillos?", options:["Destornillador","Martillo","Brocha","Cincel"], answer:0 },
  { category:"Herramientas 🔧", q:"¿Qué herramienta sirve para hacer agujeros?", options:["Taladro","Llave inglesa","Cinta métrica","Nivel"], answer:0 },
  { category:"Herramientas 🔧", q:"¿Qué herramienta sirve para sujetar o cortar alambre?", options:["Alicate","Rodillo","Serrucho","Escuadra"], answer:0 },
  { category:"Herramientas 🔧", q:"¿Qué llave se ajusta a distintos tamaños?", options:["Llave ajustable","Llave fija","Llave Allen","Llave de paso"], answer:0 },
  { category:"Herramientas 🔧", q:"¿Qué se usa para pintar una pared grande?", options:["Rodillo","Cincel","Taladro","Nivel"], answer:0 },
  { category:"Herramientas 🔧", q:"¿Qué herramienta ayuda a marcar ángulos rectos?", options:["Escuadra","Martillo","Alicate","Broca"], answer:0 },

  { category:"Fútbol ⚽", q:"¿Cuántos jugadores tiene un equipo en cancha?", options:["9","10","11","12"], answer:2 },
  { category:"Fútbol ⚽", q:"¿Qué tarjeta expulsa a un jugador?", options:["Amarilla","Roja","Azul","Verde"], answer:1 },
  { category:"Fútbol ⚽", q:"¿Cuánto dura un partido oficial sin tiempo extra?", options:["60 minutos","80 minutos","90 minutos","100 minutos"], answer:2 },
  { category:"Fútbol ⚽", q:"¿Cómo se llama la falta dentro del área que puede terminar en tiro directo al arco?", options:["Córner","Penal","Saque lateral","Tiro libre indirecto"], answer:1 },
  { category:"Fútbol ⚽", q:"¿Qué jugador puede usar las manos dentro de su área?", options:["Defensa","Delantero","Portero","Capitán"], answer:2 },
  { category:"Fútbol ⚽", q:"¿Cuántos tiempos tiene un partido normal?", options:["1","2","3","4"], answer:1 },
  { category:"Fútbol ⚽", q:"¿Qué ocurre cuando el balón sale por la línea de fondo tocado por un defensor?", options:["Córner","Saque de banda","Penal","Gol automático"], answer:0 },
  { category:"Fútbol ⚽", q:"¿Qué país ganó el Mundial 2022?", options:["Francia","Brasil","Argentina","Croacia"], answer:2 },
  { category:"Fútbol ⚽", q:"¿Qué selección es conocida como La Canarinha?", options:["Brasil","España","Holanda","Alemania"], answer:0 },
  { category:"Fútbol ⚽", q:"¿Qué significa VAR?", options:["Video Assistant Referee","Valor Alto Reglamentario","Vista Arbitral Rápida","Verificación Automática Real"], answer:0 },

  { category:"Biblia 📖", q:"¿Quién construyó el arca?", options:["Moisés","Noé","Abraham","David"], answer:1 },
  { category:"Biblia 📖", q:"¿Quién fue tragado por un gran pez?", options:["Jonás","Pedro","Pablo","Isaías"], answer:0 },
  { category:"Biblia 📖", q:"¿Quién recibió los Diez Mandamientos?", options:["Moisés","José","Salomón","Elías"], answer:0 },
  { category:"Biblia 📖", q:"¿Quién venció a Goliat?", options:["David","Sansón","Josué","Daniel"], answer:0 },
  { category:"Biblia 📖", q:"¿Dónde nació Jesús?", options:["Nazaret","Jerusalén","Belén","Galilea"], answer:2 },
  { category:"Biblia 📖", q:"¿Quién negó a Jesús tres veces?", options:["Pedro","Juan","Tomás","Judas"], answer:0 },
  { category:"Biblia 📖", q:"¿Cuál fue el primer milagro de Jesús según el Evangelio de Juan?", options:["Multiplicar panes","Caminar sobre el agua","Convertir agua en vino","Sanar a un ciego"], answer:2 },
  { category:"Biblia 📖", q:"¿Quién fue conocido por su gran fuerza?", options:["Sansón","Samuel","Jacob","Isaac"], answer:0 },
  { category:"Biblia 📖", q:"¿Quién fue echado al foso de los leones?", options:["Daniel","David","José","Moisés"], answer:0 },
  { category:"Biblia 📖", q:"¿Cuántos discípulos principales tuvo Jesús?", options:["10","11","12","13"], answer:2 },
  { category:"Biblia 📖", q:"¿Quién traicionó a Jesús?", options:["Pedro","Judas","Mateo","Andrés"], answer:1 },
  { category:"Biblia 📖", q:"¿Qué libro inicia la Biblia?", options:["Éxodo","Génesis","Mateo","Salmos"], answer:1 },
  { category:"Biblia 📖", q:"¿Qué rey pidió sabiduría a Dios?", options:["Saúl","David","Salomón","Herodes"], answer:2 },
  { category:"Biblia 📖", q:"¿Quién fue la madre de Jesús?", options:["Marta","María","Elisabet","Rut"], answer:1 },
  { category:"Biblia 📖", q:"¿Qué mar fue abierto para que pasara el pueblo de Israel?", options:["Mar Rojo","Mar Muerto","Mar Mediterráneo","Mar de Galilea"], answer:0 }
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
            <div id="listA"></div>
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
            <div id="listB"></div>
          </div>
        </div>

        <button class="btn btn-yellow" onclick="startGame()">INICIAR PARTIDO</button>

        <p class="small">
          Reglas: 3 respuestas malas = tarjeta roja. El papá pierde 30 puntos, no juega un turno y luego regresa.
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

  if (team === "A") game.teamA.players.push(player);
  else game.teamB.players.push(player);

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
  const allQuestions = [
    ...familyQuestions.map(q => ({
      type: "family",
      category: "Familia ❤️",
      q
    })),
    ...triviaQuestions.map(q => ({
      type: "trivia",
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

      <div class="stadium">
        <div class="crowd"></div>
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
            ? `⚽ Ataque: ${game.attacker.name}`
            : `🧤 Atajada: ${game.defender.name}`}
        </div>

        <div style="text-align:center;">
          <span class="badge">${game.currentQuestion.category}</span>
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
      renderGame();
      return;
    } else {
      goal();
      return;
    }
  }
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

renderSetup();
