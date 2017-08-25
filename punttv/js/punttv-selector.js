const summary_of_summaries_file = "summary-of-summaries.json";

let selected_round = 0;


function filteredSearch() {
    const phrase = document.getElementById("phrase");
    const filter = phrase.value.toUpperCase();
    const listing = document.getElementById("playerTable" + selected_round.toString());
    const teams = listing.getElementsByClassName("teamRow");
    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const teamName = team.getElementsByClassName("teamName")[0];
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

function initTableHeader(tbl) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  const txt = document.createTextNode("Team");
  th.appendChild(txt);
  tr.appendChild(th);
  thead.appendChild(tr);
  tbl.appendChild(thead);

}

function displaySummaryTable(round_num, json) {
  // Create the table element
  const tbl_container = document.getElementById("tab-content-container");
  const content_div = document.createElement("div");
  content_div.setAttribute("id", "round" + round_num.toString());
  content_div.classList.add("tab-pane");
  if (round_num == 0) {
    content_div.classList.add("in");
    content_div.classList.add("active");
  }
  const tbl = document.createElement("table");
  tbl.setAttribute("id", "playerTable" + round_num.toString());
  tbl.classList.add("player-table");
  initTableHeader(tbl);

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

    tr.addEventListener('click', clickHandler);

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
                    games.push({'map': cur, 'plays':[]});
                }
                games[i].plays.push({'ref': "tv.html?game=" + gameName, 'number': num});
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

                const num_plays = game.plays.length;
                for (var j = 0; j < num_plays; j++) {
                    const play_col = document.createElement("td");
                    const play = game.plays[j];
                    const a = document.createElement("a");
                    a.setAttribute("href", play.ref);
                    const number = play.number;
                    a.appendChild(document.createTextNode(number));
                    play_col.appendChild(a);
                    row.appendChild(play_col);
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

  content_div.appendChild(tbl);
  tbl_container.appendChild(content_div);
}

function fetchJson(file, cb) {
  fetch("/punttv/" + file, { mode: 'no-cors' })
    .then(res => res.json())
    .then(json => cb(json))
}

function loadSummary(round_id, summary_file) {
  fetchJson(summary_file, (json) =>
            { displaySummaryTable(round_id, json)});
}


function createTabs(sos_json) {
  let index = 0;
  sos_json["rounds"].forEach( (round) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const idx = index;
      a.setAttribute("data-toggle", "tab");
      a.setAttribute("href", "#round" + index.toString());
      a.addEventListener("click", function() {
        selected_round = idx;
        filteredSearch();
      });
      const txt = document.createTextNode(round.name);
      a.appendChild(txt);
      li.appendChild(a);
      document.getElementById("nav-ul").appendChild(li);
      loadSummary(index, round.file);
      index++;
    }
  );
}


function loadSummaries() {
  fetchJson(summary_of_summaries_file, createTabs);
}

function main() {
  loadSummaries();
}
