fetch("data/games.json")
  .then(r => r.json())
  .then(games => {

    const container = document.getElementById("games-container");

    const grouped = {};

    games.forEach(game => {
      if (!grouped[game.year]) {
        grouped[game.year] = [];
      }

      grouped[game.year].push(game);
    });

    Object.keys(grouped)
      .sort((a, b) => b - a)
      .forEach(year => {

        const section = document.createElement("section");

        section.innerHTML = `
          <h2 class="year-title">${year}</h2>
          <div class="card-grid"></div>
        `;

        const grid = section.querySelector(".card-grid");

        grouped[year].forEach(game => {

          const card = document.createElement("div");

          card.className = "game-card";

          card.innerHTML = `
            <img src="${game.thumbnail}">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <a href="${game.url}">PLAY</a>
          `;

          grid.appendChild(card);
        });

        container.appendChild(section);
      });
  });