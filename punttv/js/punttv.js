const EDGE_DEFAULT_COLOR = '#000099';
const EDGE_DEFAULT_WIDTH = 35;

/* Courtesy of Material Design */
const colours = [
  [ '#F44336', '#FF8A80', '#FF5252', '#FF1744', '#D50000', '#B71C1C' ],
  [ '#03A9F4', '#80D8FF', '#40C4FF', '#00B0FF', '#0091EA', '#01579B' ],
  [ '#8BC34A', '#CCFF90', '#B2FF59', '#76FF03', '#64DD17', '#33691E' ],
  [ '#FF9800', '#FFD180', '#FFAB40', '#FF9100', '#FF6D00', '#E65100' ],
  [ '#E91E63', '#FF80AB', '#FF4081', '#F50057', '#C51162', '#880E4F' ],
  [ '#00BCD4', '#84FFFF', '#18FFFF', '#00E5FF', '#00B8D4', '#006064' ],
  [ '#CDDC39', '#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00', '#827717' ],
  [ '#FF5722', '#FF9E80', '#FF6E40', '#FF3D00', '#DD2C00', '#BF360C' ],
  [ '#9C27B0', '#EA80FC', '#E040FB', '#D500F9', '#AA00FF', '#4A148C' ],
  [ '#009688', '#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5', '#004D40' ],
  [ '#FFEB3B', '#FFFF8D', '#FFFF00', '#FFEA00', '#FFD600', '#F57F17' ],
  [ '#795548', '#BCAAA4', '#8D6E63', '#795548', '#5D4037', '#3E2723' ],
  [ '#673AB7', '#B388FF', '#7C4DFF', '#651FFF', '#6200EA', '#D1C4E9' ],
  [ '#4CAF50', '#B9F6CA', '#69F0AE', '#00E676', '#00C853', '#1B5E20' ],
  [ '#FFC107', '#FFE57F', '#FFD740', '#FFC400', '#FFAB00', '#FF6F00' ],
  [ '#607D8B', '#CFD8DC', '#90A4AE', '#546E7A', '#455A64', '#263238' ],
];
function getPunterColour (i) { return colours[i % colours.length][Math.floor(i / colours.length) % 6]; }

function Graph () {

  function unclaim (source, target, option) {
    if (source > target) {
      const tmp = source;
      source = target;
      target = tmp;
    }

    if (option) {
      const es = cy.edges("[source=\"" + source + "\"][target=\"" + target + "\"][option]");
      cy.remove(es);
    } else {
      const es = cy.edges("[source=\"" + source + "\"][target=\"" + target + "\"][^option]");
      if (es.length < 1) {
        console.warn('Cannot unclaim nonexistent edge.', source, target);
      } else {
        const e = es[0];
        e.data()['owner'] = null;
        e.style('line-color', EDGE_DEFAULT_COLOR);
      }
    }
  }

  function claim (punterId, source, target) {
    if (source > target) {
      const tmp = source;
      source = target;
      target = tmp;
    }
    const es = cy.edges("[source=\"" + source + "\"][target=\"" + target + "\"][^option]");
    if (es.length > 0) {
      const e = es[0];
      const owner = e.data()['owner']
      if (owner != null) {
        const oe = cy.add({
          group: 'edges',
          data: {
            owner: punterId,
            option: owner,
            source: `${source}`,
            target: `${target}`,
          },
        }).style('line-color', getPunterColour(punterId));

        return {
          source: source,
          target: target,
          punter: punterId,
          option: {
            from: owner,
          },
        };
      } else {
        e.data()['owner'] = punterId;
        e.style('line-color', getPunterColour(punterId));
        return { claim: { source: source, target: target, punter: punterId } };
      }
    } else {
      console.error('Trying to update nonexistent edge!', source, target);
      return false;
    }
  }

  function splurge (punterId, route) {
    const ret = [ ];
    for (let i = 0; i < route.length - 1; i++) {
      ret.push(claim(punterId, route[i], route[i + 1]));
    }
    return ret;
  }

  function unsplurge (route, options) {
    for (let i = 0; i < route.length - 1; i++) {
      unclaim(route[i], route[i + 1], options[i] || null);
    }
  }

  this.applyMove = (move) => {
    const cs = (move.hasOwnProperty('claim')) ?
       [ claim(move.claim.punter, move.claim.source, move.claim.target) ]
    : (move.hasOwnProperty('option')) ?
       [ claim(move.option.punter, move.option.source, move.option.target) ]
    : (move.hasOwnProperty('splurge')) ?
       splurge(move.splurge.punter, move.splurge.route)
    : [ ];

    if (!move.options) {
      move.options = [ ];
      cs.forEach(c => {
        if (!c) {
          return;
        }
        if (c.option) {
          move.options.push(c);
        }
      });
    }
  }

  this.unapplyMove = (move) => {
    if (move.hasOwnProperty('claim')) {
      unclaim(move.claim.source, move.claim.target, move.options && move.options[0]);
    } else if (move.hasOwnProperty('option')) {
      unclaim(move.option.source, move.option.target, move.options && move.options[0]);
    } else if (move.hasOwnProperty('splurge')) {
      unsplurge(move.splurge.route, move.options);
    }
  };

  this.highlightNode = (node, color) => {
    const nodes = cy.nodes('#' + node);
    if (nodes.length < 1) {
      console.warn('Cannot hightlight nonexisting node', node);
    } else {
      nodes[0].addClass('highlighted');
    }
  }

  this.unhighlightNode = (node) => {
    const nodes = cy.nodes('#' + node);
    if (nodes.length < 1) {
      console.warn('Cannot unhightlight nonexisting node', node);
    } else {
      nodes[0].removeClass('highlighted');
    }
  }

  this.highlightEdge = (selector, thickness) => {
    const edges = cy.edges(selector);
    edges.addClass('highlighted');
  }

  this.unhighlightEdge = (selector) => {
    const edges = cy.edges(selector);
    edges.removeClass('highlighted');
  }

}

function GameConsole (consoleContainer, players) {
  consoleContainer.innerHTML = '';
  const logList = document.createElement('ul');
  consoleContainer.appendChild(logList);

  function writeMove (msg, punterId, moveNum) {
    const msgs = [ ];
    if (moveNum != undefined) {
      msgs.push(document.createTextNode(`${moveNum} > `));
    }
    if (punterId != undefined) {
      const name = players[punterId].name + ' ';
      const color = players[punterId].colour;
      const span = document.createElement('span');
      span.innerHTML = name;
      span.style.color = color;
      msgs.push(span);
    }
    msgs.push(msg);
    write(msgs);
  }

  function write (msg) {
    const li = document.createElement('li');
    if (typeof msg === 'string') {
      li.innerText = msg;
    } else if (Array.isArray(msg)) {
      msg.forEach(m => {
        if (typeof m === 'string') {
          li.appendChild(document.createTextNode(m));
        } else if (m instanceof Node) {
          li.appendChild(m);
        }
      });
    } else if (msg instanceof Node) {
      li.appendChild(msg);
    }
    logList.appendChild(li);
    consoleContainer.scrollTop = consoleContainer.scrollHeight + 5;
  }

  this.logMove = (move, i) => {
    if (move.hasOwnProperty('claim')) {
      writeMove(`CLAIM ${move.claim.source}-${move.claim.target}`, move.claim.punter, i);
    } else if (move.hasOwnProperty('option')) {
      writeMove(`OPTION ${move.option.source}-${move.option.target}`, move.option.punter, i);
    } else if (move.hasOwnProperty('splurge')) {
      writeMove(`SPLURGE ${move.splurge.route.toString()}`, move.splurge.punter, i);
    } else if (move.hasOwnProperty('pass')) {
      writeMove('PASS', move.pass.punter, i);
    };
    // SL: I'd like to do this but something goes slightly wrong with the
    // move counter when we undo it...
    //
    // if (move.hasOwnProperty('pass') && move.hasOwnProperty('zombie')) {
    //   this.logZombie(move.pass.punter);
    // }
    if (move.options) {
      move.options.forEach(this.logOption);
    }
  };

  this.logZombie = (punter) => {
    const name =  players[punter].name;
    const colour = players[punter].colour;
    const span = document.createElement('span');
    span.innerHTML = name;
    span.style.color = colour;
    write([' ', span, " became a zombie"])
  }

  this.logOption = (option) => {
    const oldName = players[option.option.from].name;
    const oldColour = players[option.option.from].colour;
    const oldSpan = document.createElement('span');
    oldSpan.innerHTML = oldName;
    oldSpan.style.color = oldColour;
    const newName = players[option.punter].name + ' ';
    const newColour = players[option.punter].colour;
    const newSpan = document.createElement('span');
    newSpan.innerHTML = newName;
    newSpan.style.color = newColour;
    write([ '  ', newSpan, `bought option to use ${option.source}-${option.target} owned by `, oldSpan ]);
  }

  this.log = write;

  this.removeLine = () => {
    logList.removeChild(logList.lastChild);
  }

  this.clear = () => {
    logList.innerHTML = '';
  };

  this.clear();

}

function Canvas (map, progressBar, players) {
  this.graph = new Graph();
  let showLabels = false;
  Object.defineProperty(this, 'labels', {
    get: () => showLabels,
    set: (val) => showLabels = Boolean(val),
  });

  this.drawMap = () => {
    if (cy.elements !== undefined) {
      cy.destroy();
    }
    initCy(map, () => {
      cy.autolock(true);
      cy.edges().on("mouseover", function (e) {
        if (showLabels) {
          const owner = this.data('owner');
          if (owner != null) {
            this.style("content", players[this.data("owner")].name);
            this.addClass('highlighted');
          }
        }
      });
      cy.edges().on("mouseout", function (e) {
        this.style("content", "");
        this.removeClass('highlighted');
      });
      cy.edges().on('select', (e) => { cy.edges().unselect() });
    });
  };

  this.drawMoves = (moves) => {
    this.reset(); // TODO
    moves.forEach(this.graph.applyMove);
  };

  this.drawMove = (move, undo) => {
    if (!move) {
      return false;
    }

    if (!undo) {
      this.graph.applyMove(move);
    } else {
      this.graph.unapplyMove(move);
    }
  };

  this.updateProgressBar = (i) => {
    progressBar.style.width = Math.max(0, Math.min(100, 100 * i)) + '%';
  };

  this.reset = () => {
    this.drawMap();
    this.updateProgressBar(0);
  }
}

function Legend (legendContainer, canvas) {
  const playerList = legendContainer.querySelector('.player-list') || document.createElement('ul');
  playerList.innerHTML = '';
  playerList.classList.add('player-list');
  legendContainer.appendChild(playerList);

  const lis = { };
  const dls = { };

  this.drawPunterInfo = (punters) => {
    punters.forEach((p) => {
      const li = document.createElement('li');
      const div = document.createElement('div');
      const colorBox = document.createElement('div');
      colorBox.style.backgroundColor = p.colour;
      colorBox.classList.add('legend-color');
      if (p.zombie) {
        colorBox.classList.add('zombie');
      }
      const name = document.createElement('div');
      name.innerHTML = p.name;
      div.appendChild(colorBox);
      div.appendChild(name);
      const chevron = document.createElement('i');
      chevron.classList.add('fa');
      chevron.classList.add('fa-chevron-down');
      div.appendChild(chevron);
      li.appendChild(div);
      const dl = document.createElement('dl');
      li.appendChild(dl);
      playerList.appendChild(li);
      let open = false;
      li.addEventListener('click', (e) => {
        if (open) {
          open = false;
          li.style.height = '1.5rem';
          chevron.classList.remove('fa-chevron-up');
          chevron.classList.add('fa-chevron-down');
        } else {
          open = true;
          li.style.height = 'auto';
          const h = getComputedStyle(li).height;
          li.style.height = '1.5rem';
          window.setTimeout(() => li.style.height = h);
          chevron.classList.add('fa-chevron-up');
          chevron.classList.remove('fa-chevron-down');
        }
      });
      li.addEventListener('mouseover', (e) => {
        canvas.graph.highlightEdge(`[owner=${p.id}]`);
      });
      li.addEventListener('mouseout', (e) => {
        canvas.graph.unhighlightEdge(`[owner=${p.id}]`);
      });
      lis[p.id] = li;
      dls[p.id] = dl;
    });
  }

  this.drawPunterMetadata = (punter) => {
    const dl = dls[punter.id];
    const li = lis[punter.id];
    if (!dl || !li) {
      console.error('Attempting to draw metadata for unknown punter', punter);
      return false;
    }

    dl.innerHTML = '';

    // Draw meta
    Object.keys(punter.meta || { }).forEach(key => {
      const dt = document.createElement('dt');
      dt.innerText = key;
      const dd = document.createElement('dd');
      dd.innerText = punter.meta[key];
      dl.appendChild(dt);
      dl.appendChild(dd);
    });

    // Draw futures
    if (punter.futures && typeof punter.futures === 'object') {
      const dt = document.createElement('dt');
      dt.innerText = 'Futures';
      const dd = document.createElement('dd');
      const ul = document.createElement('ul');
      ul.classList.add('future-list');
      dd.appendChild(ul);
      Object.keys(punter.futures).forEach(mine => {
        if (punter.futures[mine].score != 0) {
          const li = document.createElement('li');
          if (punter.futures[mine].score > 0) {
            const done = document.createElement('i');
            done.classList.add('fa');
            done.classList.add('fa-check-circle');
            done.style.color = '#019440';
            li.appendChild(done);
          } else if (punter.futures[mine].score < 0) {
            const done = document.createElement('i');
            done.classList.add('fa');
            done.classList.add('fa-times-circle-o');
            done.style.color = '#dd0000';
            li.appendChild(done);
          }
          const futText = `${mine} &#8594; ${punter.futures[mine].target} (${punter.futures[mine].score})`;
          const futSpan = document.createElement('span');
          futSpan.innerHTML = futText;
          li.appendChild(futSpan);
          li.addEventListener('mouseover', (e) => {
            canvas.graph.highlightNode(mine)
            canvas.graph.highlightNode(punter.futures[mine].target);
          });
          li.addEventListener('mouseout', (e) => {
            canvas.graph.unhighlightNode(mine)
            canvas.graph.unhighlightNode(punter.futures[mine].target);
          });
          ul.appendChild(li);
        }
      });
      dl.appendChild(dt);
      dl.appendChild(dd);
    }
  }
}

function Replay (game, speed, progressBar, playBtnIcon, legendContainer, consoleContainer, labelsCheckbox) {
  let playing = false;
  let stepIndex = -1;
  let stepDuration = 1000 - (speed.value || 0);
  let interval;

  speed.addEventListener('change', (e) => {
    stepDuration = 1000 - speed.value;
    if (playing) {
      pause();
      play();
    }
  });

  const out = new GameConsole(consoleContainer, game.players);
  const canvas = new Canvas(game.map, progressBar, game.players);
  const legend = new Legend(legendContainer, canvas);

  canvas.labels = labelsCheckbox.checked;
  labelsCheckbox.addEventListener('change', (e) => {
    canvas.labels = labelsCheckbox.checked;
  });

  /** Step to beginning of the game */
  this.reset = () => {
    stepIndex = -1;
    canvas.reset();
    out.clear();
    pause();
  };

  /** Toggle between play and pause */
  this.togglePlay = () => {
    playing = !playing;
    if (playing) {
      play();
    } else {
      pause();
    }
  };

  /** Step one move forward */
  this.stepForward = () => step(stepIndex + 1);

  /** Step one move backward */
  this.stepBackward = () => step(stepIndex - 1);

  /** Step to end of the game */
  this.end = () => {
    canvas.drawMoves(game.moves); // TODO
    game.moves.forEach(out.logMove); // TODO
    stepIndex = game.moves.length - 1;
    canvas.updateProgressBar(1);
    pause();
  };

  function updatePlayBtn () {
    playBtnIcon.classList.add(playing ? 'fa-pause' : 'fa-play');
    playBtnIcon.classList.remove(playing ? 'fa-play' : 'fa-pause');
  }

  function draw (move, undo) {
    if (!move) {
      return;
    }
    canvas.drawMove(move, undo);

    if (undo) {
      if (move.options) {
        move.options.forEach(out.removeLine);
      }
      out.removeLine();
    } else {
      out.logMove(move, stepIndex);
    }
    canvas.updateProgressBar(stepIndex < 1 ? 0 : stepIndex / (game.moves.length - 1));
  }

  function drawScores () {
    out.log([ 'GAME FINISHED', '', 'SCORES:' ]);

    Object.keys(game.scores)
      .sort((a, b) => {
        a = game.scores[a];
        b = game.scores[b];
        return a === b ? 0 : a > b ? -1 : 1;
      })
      .forEach(punter => {
        out.log(game.players[punter].name, game.scores[punter])
      });
  }

  const step = (to) => {
    pause();

    const undo = to < stepIndex;

    if (typeof to === 'number' && !isNaN(to) && to > -1 && to < game.moves.length) {

      if (undo) {
        for (; stepIndex > to ;) {
          draw(game.moves[stepIndex--], true);
        }
      } else {
        for (; stepIndex < to ;) {
          draw(game.moves[++stepIndex], false);
        }
      }
    } else if (to === -1) {
      this.reset();
    } else {
      console.warn('Attempted to step to step out of bounds.');
    }
  }

  function play () {
    playing = true;
    updatePlayBtn();
    interval = setInterval(() => {
      // FIXME: some kind of off-by-one error here - playing stops at
      // the penultimate move!
      if (stepIndex < game.moves.length - 1) {
        draw(game.moves[++stepIndex]);
      } else {
        pause();
      }
    }, stepDuration);
  }

  function pause () {
    playing = false;
    updatePlayBtn();
    clearInterval(interval);
  }

  this.reset();
  legend.drawPunterInfo(Object.keys(game.players).map(i => game.players[i]).sort((a, b) => {
    a = a.meta['Score'];
    b = b.meta['Score'];
    return a === b ? 0 : a > b ? -1 : 1;
  }));
  Object.keys(game.players).forEach(i => legend.drawPunterMetadata(game.players[i]));

  return this;
};

function loadGame (url, successCallback, errorCallback) {

  function preprocessGame (json) {
    json = json.game;
    const options = { };
    const zombies = { };

    // Linear scan to find gameplay start
    let playing = false;

    // inside gameplay convert zombie messages into passes
    json.forEach((step) => {
      if (step.hasOwnProperty('gameplay')) {
        if (step.gameplay == "start") {
          playing = true;
        } else if (step.gameplay == 'end') {
          playing = false;
        }
      } else if (step.hasOwnProperty('zombie')) {
        zombies[step.zombie.punter] = true;
        if (playing) {
          step.pass = {punter:step.zombie.punter};
        }
      }
    });

    // filter out zombie, timeout, and gameplay messages
    json = json.filter(l => {
      if (l.hasOwnProperty('zombie') && !l.hasOwnProperty('pass')) {
        return false;
      } if (l.hasOwnProperty('timeout')) {
        // ignore timeout messages for now
        return false;
      }
      if (l.hasOwnProperty('gameplay')) {
        // ignore gameplay messages for now
        return false;
      }
      return true;
    });

    Object.keys(json[1].settings).forEach(k => options[k] = json[1].settings[k]);
    options['map'] = json[2].map;

    json = json.slice(3);

    const players = { };
    while (json[0].hasOwnProperty('punter') && !json[0].hasOwnProperty('futures')) {
      players[json[0].punter] = {
        name: json[0].team,
        id: json[0].punter,
        meta: { },
        colour: getPunterColour(json[0].punter),
        zombie: zombies[json[0].punter],
      };
      json = json.slice(1);
    }

    if (options.futures) {
      while (json[0].hasOwnProperty('futures') && json[0].hasOwnProperty('punter')) {
        if (!players[json[0].punter].hasOwnProperty('futures')) {
          players[json[0].punter].futures = { };
        }
        json[0].futures.forEach(f => players[json[0].punter].futures[f.source] = { target: f.target });
        json = json.slice(1);
      }
    }

    const stop = json.pop();

    // FIXME: do something with the statuses
    const statuses = json.pop().statuses;
    statuses.forEach(s => {
      if (s.options != null) {
        players[s.punter].meta['Options'] = s.options;
      }
      if (s.credit != null) {
        players[s.punter].meta['Credit'] = s.credit;
      }
      // players[s.punter].meta['Active'] = Boolean(s.active);
    });

    if (options.futures) {
      const futuresList = json.pop().futures;
      futuresList.forEach(f => {
        const punter = f.punter;
        f.scores.forEach(s => {
          if (players[punter].futures === undefined)
            players[punter].futures =  { };
          if (players[punter].futures[s.mine] === undefined)
            players[punter].futures[s.mine] = { };
          players[punter].futures[s.mine].score = s.score;
        });
      });
    }

    json.pop().scores.forEach(s => {
      players[s.punter].meta['Score'] = s.score;
    });

    return {
      options: options,
      players: players,
      moves: json,
      map: null,
    };
  }

  fetch(url, { mode: 'no-cors' })
    .then(res => res.json())
    .then(preprocessGame)
    .then(game => {
      fetch(`/maps/${game.options.map}`, { mode: 'no-cors' })
        .then(res => res.json())
        .then(map => {
          game['map'] = map;
          return game;
        })
        .then(successCallback)
        .catch(errorCallback);
    })
    .catch(errorCallback);
}

//window.addEventListener('load', (e) => {
function initialise() {
  const resetBtn = document.getElementById('resetBtn');
  const endBtn = document.getElementById('endBtn');
  const fwdBtn = document.getElementById('stepFwdBtn');
  const backBtn = document.getElementById('stepBackBtn');
  const playBtn = document.getElementById('playBtn');
  const loadBtn = document.getElementById('loadBtn');
  const loadInput = document.getElementById('loadInput');
  const loading = document.getElementById('loading');
  const speed = document.getElementById('speed');
  const progressBar = document.getElementById('progressBar');
  const consoleContainer = document.getElementById('console');
  const legendContainer = document.getElementById('legend')
  const labelsCheckbox = document.getElementById('labels')
  const playBtnIcon = document.getElementById('playBtn').querySelector('i');

  let replay;

  function keyboardHandler (e) {
    if (replay) {
      switch (e.keyCode) {
        case 39: return replay.stepForward();
        case 37: return replay.stepBackward();
        case 32: return replay.togglePlay();
      }
    }
  }

  function init () {
    loading.innerText = 'Loading';
    loading.classList.remove('error');
    loading.classList.remove('loaded');
    if (replay) {
      resetBtn.removeEventListener('click', replay.reset);
      endBtn.removeEventListener('click', replay.end);
      fwdBtn.removeEventListener('click', replay.stepForward);
      backBtn.removeEventListener('click', replay.stepBackward);
      playBtn.removeEventListener('click', replay.togglePlay);
      window.removeEventListener('keydown', keyboardHandler);
    }

    const matches = /game=([^&#=]*)/.exec(window.location.search);
    if (matches !== null && matches !== undefined) {
      const game_file = matches[1];
      loadGame(game_file, (game) => {
          if (game) {
            replay = new Replay(
              game,
              speed,
              progressBar,
              playBtnIcon,
              legendContainer,
              consoleContainer,
              labelsCheckbox
            );
            resetBtn.addEventListener('click', replay.reset);
            endBtn.addEventListener('click', replay.end);
            fwdBtn.addEventListener('click', replay.stepForward);
            backBtn.addEventListener('click', replay.stepBackward);
            playBtn.addEventListener('click', replay.togglePlay);
            window.addEventListener('keydown', keyboardHandler);
            fwdBtn.disabled = false;
            backBtn.disabled = false;
            playBtn.disabled = false;
          }
        }, (err) => {
          console.error(err);
          loading.innerText = 'Failed to load ' + game_file;
          loading.classList.add('error');
          replay = null;
          fwdBtn.disabled = false;
          backBtn.disabled = false;
          playBtn.disabled = false;
        });
    } else {
      loading.innerText = 'Invalid game';
      loading.classList.add('error');
    }
  }

  //loadBtn.addEventListener('click', init);
  //loadInput.addEventListener('keyup', (e) => e.keyCode === 13 && init());
  document.querySelector('main').classList.remove('unresolved');
  setTimeout(400, init());
// });
}
