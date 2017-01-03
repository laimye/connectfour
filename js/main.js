$(function() {

/* ---- PSEUDOCODE ---- 

1.	Register event listener
2.	Initialize
a.		Clear board
b.	Player red starts
3.	Render
a.		Update display
4.	Handle player’s move
	a.	Check if cells are occupied
	b.	Fill in the last cell of the column
	c.	Check winner
		i.	Horizontal, vertical, diagonal combination of four
		1.	Highlight winning combination
			ii.	Tie game
	d.	Switch player
*/

/* --- Application-Wide variables ----*/

var board = [
	['', '', '', '', '', ''],
	['', '', '', '', '', ''],
	['', '', '', '', '', ''],
	['', '', '', '', '', ''],
	['', '', '', '', '', ''],
	['', '', '', '', '', ''],
	['', '', '', '', '', '']
];

var boardIdx, winnerFound, cell, clickedEl, curColumn;
var lastElement = [6, 6, 6, 6, 6, 6];
var player = 'red';


/* ---- DOM Element Variables ---- */

var $msg = $('#msg');


/* ---- Event Listeners ---- */
$('.arrow').on('click', handleClick);

$('#reset-button').on('click', initialize);


/* ---- Functions ---- */

function initialize () {
	$msg.html('Welcome to Gravitrips!');
	player = 'black';
	$('td').removeClass('red').removeClass('black');
	winnerFound = false;
	document.getElementsByClassName('arrow').disabled = false;
	lastElement = [6, 6, 6, 6, 6, 6];
	board = [['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
}
initialize();

function handleClick(evt){
	var clickedEl = evt.target;
	if (evt.target.id == 'c1') {
		curColumn = 0;
	} else if (evt.target.id == 'c2') {
		curColumn = 1;
	} else if (evt.target.id == 'c3') {
		curColumn = 2;
	} else if (evt.target.id == 'c4') {
		curColumn = 3;
	} else if (evt.target.id == 'c5') {
		curColumn = 4;
	} else if (evt.target.id == 'c6') {
		curColumn = 5;
	};
	checkRow();
	checkWinner(curColumn, lastElement[curColumn]);
}

function checkRow () {
	lastElement[curColumn] = lastElement[curColumn] - 1;
	if (lastElement[curColumn] < 0) alert('This column is full. Please try again.');
	else {
		board[curColumn][lastElement[curColumn]] = player;
		boardIdx = 10*lastElement[curColumn] + curColumn;
		switchPlayer();
	}
	$('#' + parseFloat(boardIdx)).addClass(player);
};

// 1. checkWinner - function is triggered after each move.
// 2. the program will loop through the active row/column/diagonal looking for the cell of the same color next to each other// 	a. 
//	a. determine where the active row/column/diagonal starts
//	b. define the starting point of the row/column/diagonal that we check as currentPlayer
//	c. compare each cell in the active row/column/diagonal starting from the starting point to the following cell
//		1. if the cell mathes the previous and != '', add 1 count;
//		2. if the cell does not match, count = 1;
// 	d. if the count = 4, the latest player wins.
function checkWinner(col1, row1) {
	count = 1;
	var activeColumn, activeRow;
	// check horizontal
	var curPlayer = board[0][row1]; 
	for (activeColumn = 1; activeColumn <= 5; activeColumn++) {
		if (board[activeColumn][row1] == curPlayer && curPlayer != '') {
			count += 1;
		} else {
			count = 1;
		}
		if (count == 4) winnerFound = true;
		curPlayer = board[activeColumn][row1];		
	}

	// check vertical
	if (winnerFound == false) {
		curPlayer = board[col1][0];
		for (activeRow = 1; activeRow <= 5; activeRow ++) {
			if (board[col1][activeRow] == curPlayer && curPlayer != '') {
				count += 1;
			} else {
				count = 1;
			}
			if (count == 4) winnerFound = true;
			curPlayer = board[col1][activeRow];
		}
	}

	// //check diagonal - bottom-up to the right
	if (winnerFound == false) {
		activeColumn = col1;
		activeRow = row1;
		count = 1;
		var startingCol, startingRow;
		var stepsToCol = col1;
		var stepsToRow = 5 - row1;
		if (stepsToCol > stepsToRow) { // starting from bottom
			startingCol = col1 - stepsToRow;
			startingRow = 5; 
			curPlayer = board[startingCol][startingRow];
			for (activeColumn = startingCol + 1, activeRow = startingRow - 1; activeRow >= 0 && activeColumn <= 5; activeRow --, activeColumn++) {
				if (board[activeColumn][activeRow] == curPlayer && curPlayer != '') {
				count += 1;
				} else {
					count = 1;
				}
				curPlayer = board[activeColumn][activeRow];
				if (count == 4) winnerFound = true;
			}
		} else { // starting from left side
			startingCol = 0;
			startingRow = col1 + row1;
			curPlayer = board[startingCol][startingRow];
			for (activeColumn = startingCol + 1, activeRow = startingRow - 1; activeRow >= 0 && activeColumn <= 5; activeRow --, activeColumn++) {
				if (board[activeColumn][activeRow] == curPlayer && curPlayer != '') {
				count += 1;
				} else {
					count = 1;
				}
				if (count == 4) winnerFound = true;
				curPlayer = board[activeColumn][activeRow];
			}
		}
	}

	// check diagonal - bottom-up to the left
	if (winnerFound == false) {
		activeColumn = col1;
		activeRow = row1;
		count = 1;
		stepsToCol = 5 - col1;
		stepsToRow = 5 - row1;
		if (stepsToCol > stepsToRow) { //starting from bottom
			startingCol = col1 + stepsToRow;
			startingRow = 5;
			curPlayer = board[startingCol][startingRow];
			for (activeColumn = startingCol - 1, activeRow = startingRow - 1; activeRow >= 0 && activeColumn >= 0; activeRow --, activeColumn --) {
				if (board[activeColumn][activeRow] == curPlayer && curPlayer != '') {
				count += 1;
				} else {
					count = 1;
				}
				if (count == 4) winnerFound = true;
				curPlayer = board[activeColumn][activeRow];
			}
		} else { // starting from right side
			startingCol = 5;
			startingRow = row1 + stepsToCol;
			curPlayer = board[startingCol][startingRow];
			for (activeColumn = startingCol - 1, activeRow = startingRow - 1; activeRow >= 0 && activeColumn >= 0; activeRow --, activeColumn --) {
				if (board[activeColumn][activeRow] == curPlayer && curPlayer != '') {
				count += 1;
				} else {
					count = 1;
				}
				if (count == 4) winnerFound = true;
				curPlayer = board[activeColumn][activeRow];
			}
		}
	}

	if (winnerFound) {
		$msg.html('Congratulations, player ' + player + ' won!');
		winnerFound = true;
		document.getElementsByClassName('arrow').disabled = true;
	}

	checkIfTie();

	return winnerFound;
	
}

//check if the game is tie
function checkIfTie () {
	var col;
	var tie = true;
	if (winnerFound == false) {
		for (col = 0; col <= 5; col ++) {
			if (board[col][0] == '') {
				return false;
			}
		}
		if (tie == true) $msg.html("It's a tie!");
	}
}


//switch player and display whose turn it is. 
function switchPlayer() {
	player = (player === 'red')? 'black' : 'red';
	if (player == 'red') $msg.html('Turn: Player Black');
	else $msg.html('Turn: Player Red');
	return player;
};

}); // end of jQuery function
