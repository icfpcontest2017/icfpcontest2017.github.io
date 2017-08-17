const summary_file = "/punttv/summary.json"

function filteredSearch() {
    var i;
    var phrase = document.getElementById("phrase");
    var filter = phrase.value.toUpperCase();
    var listing = document.getElementById("playerTable");
    var teams = listing.getElementsByClassName("teamRow");
    for (i = 0; i < teams.length; i++) {
        var team = teams[i];
        var teamName = team.getElementsByClassName("teamName")[0];
        if (teamName !== undefined) {
            if (teamName.innerHTML.toUpperCase().indexOf(filter) > -1) {
                teams[i].style.display = "";
            } else {
                teams[i].style.display = "none";
            }
        }
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displaySummaryTable(json) {
  const tbl = document.getElementById("playerTable");
  json.game.forEach(game => {
    const tr = document.createElement('tr');
    tr.classList.add('teamRow');
    const td = document.createElement('td');
    const teamName = document.createElement('p');
    teamName.classList.add('teamName');

    teamName.innerHTML = game.team;
    td.appendChild(teamName);

    const categories = document.createElement('p');
    categories.classList.add('categories');
    categories.style.display = 'none';
    let open = false;
      function clickHandler(e) {
        if (categories.style.display === 'none')
            categories.style.display = 'block';
        else
            categories.style.display = 'none';
    }

    teamName.addEventListener('click', clickHandler);

    Object.keys(game).forEach(key => {
        if (key != "team") {
            // Enumerate games in subcategory
            var cur = "";
            const games = [];
            var i = -1;
            game[key].forEach((gameName) => {
                const splitName = gameName.split('/');
                const splitFile = (splitName[splitName.length - 1]).split('-');
                const num = (new RegExp('[a-z]*([0-9]*).json')).exec(splitFile[1])[1];
                //const displayName = capitalize(splitFile[0]) + ", play " + num;
                if (cur !== splitFile[0]) {
                    cur = splitFile[0];
                    i = i + 1;
                    games.push({'map': cur, 'heats':[]});
                }
                games[i].heats.push({'ref': "tv.html?game=" + gameName, 'number': num});
            });

            // Layout the subcategory
            const heading = document.createElement("b");
            heading.appendChild(document.createTextNode(capitalize(key)));
            // const enumeration = document.createElement("ul");
            const enumeration = document.createElement("table");
            enumeration.classList.add("game-list");
            enumeration.cellpadding = 0;

            for (var i = 0; i < games.length; i++) {
                const game = games[i];
                const row = document.createElement("tr");
                const map_col = document.createElement("td");
                map_col.appendChild(document.createTextNode(games[i].map))
                row.appendChild(map_col);
                row.append(document.createElement("td"));

                const num_heats = game.heats.length;
                for (var j = 0; j < num_heats; j++) {
                    const heat_col = document.createElement("td");
                    const heat = game.heats[j];
                    const a = document.createElement("a");
                    a.setAttribute("href", heat.ref);
                    const number = heat.number;
                    a.appendChild(document.createTextNode(number));
                    heat_col.appendChild(a);
                    row.appendChild(heat_col);
                }
                enumeration.appendChild(row);
            }

            categories.appendChild(heading);
            categories.appendChild(enumeration);
        }
    });

    td.appendChild(categories);
    tr.appendChild(td);
    tbl.appendChild(tr);
  });
}


function loadSummary() {
  fetch(summary_file, { mode: 'no-Coors' })
    .then(res => res.json())
    .then(json => displaySummaryTable(json))
}
