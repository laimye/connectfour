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

var boardIdx;

var lastElement = [6, 6, 6, 6, 6, 6];

var player = 'red';
var cell, clickedEl;
var curColumn;

/* ---- DOM Element Variables ---- */

var $msg = $('#msg');

/* ---- Event Listeners ---- */
$('.arrow').on('click', handleClick);



/* ---- Functions ---- */

function initialize () {
	$msg.html('Welcome to Connect Four!');
	player = 'black';
	board = [['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', ''], ['', '', '', '', '', '']];
	//$('.cell').removeClass('red').removeClass('black');
}

initialize();


function handleClick(evt){
	var clickedEl = evt.target;
	console.log(evt.target.id);
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
	console.log(curColumn);
	checkRow();
	
	// checkIfOccupied();
	// handleMove();
	// renderBoard();
	// checkWinner();
	// checkIfTie();
	// switchPlayer();
}

function checkRow () {
	lastElement[curColumn] = lastElement[curColumn] - 1;
	console.log(lastElement[curColumn]);
	if (lastElement[curColumn] < 0) alert('This column is full. Please try again.');
	else {
		board[curColumn][lastElement[curColumn]] = player;
		boardIdx = 10*lastElement[curColumn] + curColumn;
		switchPlayer();
	}
	console.log(board);
	$('#' + parseFloat(boardIdx)).addClass(player);
	// renderBoard();
};


// function renderBoard () {
// 	var idx = lastElement[curColumn];
// 	var cell = board[curColumn][idx];
// 	cell.textContent = 'red';
// 	//cell.evt.target.id = 'red';
// 	//board[curColumn][idx].innerHTML('player');
// 	//board[30]='X';
// 	console.log(board);
// };

// checkIfOccupied(col, row) {
// 	var occupied = board[row][col];
// 	return value === null ? false ; true;
// };



// add circle to the board by adding class
//the circle drops to the very bottom
// handleMove() {
// 	$('.cell').addClass(player);
// };


// renderBoard() {

// };

// checkWinner() {
// 	//vertical
// 	if ((board[curColumn][2] == board[curColumn][3] && board[curColumn][2] != '' && (board[curColumn][2] == board[curColumn][1] && board[curColumn][1] == board[curColumn][0]) || (board[curColumn][3] == board[curColumn][4] && board[curColumn][4] == board[curColumn][5])
// 		//horizontal
// 		|| (board[2][] == board[3][idx] && board[3][idx] != '' && (board[2][idx] == board[1][idx] && board[1][idx] == board[0][idx]) || (board[3][idx] == board[4][idx] && board[4][idx] == board[5][idx])) {
// 			return true;
// 			} else if (idx >= 3 && (board[curColumn][idx] == board[curColumn + 1][idx - 1] && board[curColumn + 1][idx - 1] == board[curColumn + 2][idx - 2] && board[curColumn + 3][idx - 3] == board[curColumn + 2][idx - 2]) {

// 			}
// 		)
// };

function checkWinner() {
	count = 1;
	board[x][y]
	player = board[0][y];
	for (x = 1; x <= 5; x++) {
		if (board[x][y] == player) {
			count += 1;
		} else {
			count = 1;
		}
	}
	if (count == 4) {
		return 'Congratulations, player ' + player + ' won!'
	}

}

//tie game
// function checkIfTie () {
// 	for (var col = 0; col <= 6, col ++) {
// 		for (var row = 0; row <= 6, row ++) {
// 			if (board[row][col] === null) {
// 				return false;
// 			} else {
// 				return true;
// 			}
// 		}
// 	}
// }

function switchPlayer() {
	// player = (player === player1)? player2 : player1;
	player = (player === 'red')? 'black' : 'red';
	return player;
};


// Trigger the game sequence by clicking on a position button on the board
// $('.board button').click(function(e) {
//     // Detect the x and y position of the button clicked.
//     var y_pos = $('.board tr').index($(this).closest('tr'));
//     var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));
// });

}); // end of jQuery function
