const levelForm = document.getElementById('levelForm');
levelForm.addEventListener('submit', play);

//Per disegnare la cella

function drawSquare(content, sideNumSquares) {
	const square = document.createElement('div');
	square.classList.add('square');
	square.style.width = `calc(100% / ${sideNumSquares})`;
	square.style.height = square.style.width;
	square.innerHTML = content;
	return square;
}

// Per generare l'array delle bombe

function generateBombs(numBombs, max) {
	const bombs = [];
	while (bombs.length < numBombs) {
		const bomb = getRndNumber(1, max);
		if (!bombs.includes(bomb)) {
			bombs.push(bomb);
		}
	}
	return bombs;
}

function setMessage(message) {
	const score = document.getElementById('score');
	score.innerHTML = message;
}

function showAllBombs(bombs) {
	const squares = document.querySelectorAll('.square');
	for (let square of squares) {
		if (bombs.includes(parseInt(square.innerText))) {
			square.classList.add('unsafe');
		}
	}
}

function play(e) {
	e.preventDefault();
	const playground = document.getElementById('playground');
	playground.innerHTML = '';
	let message = 'Seleziona la difficoltà e premi play';
	setMessage(message);

	let score = 0;
	let gameOver = false;

	const NUM_BOMBS = 16;

	//Prendo il ilvello

	const level = document.getElementById('level').value;
	console.log(level);

	//Imposto numero celle per livello
	let squareNumbers;

	switch (level) {
		case 'easy':
			squareNumbers = 100;
			break;
		case 'medium':
			squareNumbers = 81;
			break;
		case 'hard':
			squareNumbers = 49;
			break;
	}
	console.log(squareNumbers);

	//Numero di celle per lato
	let squarePerRow = Math.sqrt(squareNumbers);
	console.log(squarePerRow);
	//generato arrey con le bombe
	const bombs = generateBombs(NUM_BOMBS, squareNumbers);
	console.log(bombs);

	let maxScore = squareNumbers - NUM_BOMBS;
	//Ciclo per numero celle & generazione prima cella

	for (let i = 1; i <= squareNumbers; i++) {
		const square = drawSquare(i, squarePerRow);
		square.addEventListener('click', function (e) {
			if (!gameOver && !this.classList.contains('safe')) {
				if (bombs.includes(parseInt(this.innerText))) {
					this.classList.add('boom');
					message = `Hai perso ! Il tuo punteggio è : ${score}`;
					gameOver = true;
				} else {
					this.classList.add('safe');
					score++;
					message =
						score === maxScore
							? `Hai vinto,il tuo punteggio è : ${score}`
							: `Il tuo punteggio è : ${score}`;
				}
				setMessage(message);
			}
		});
		playground.appendChild(square);
	}
}
