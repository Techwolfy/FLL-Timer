var timerDiv;
var seconds;
var interval;
var scoreTable;
var scoreDiv;
var scoreHold = false;
var matchStart = new Audio("audio/charge-1.mp3");
var matchWarn = new Audio("audio/three-bells.mp3");
var matchEnd = new Audio("audio/end-match.mp3");
var matchWarnPlayed = false;

window.onload = function () {
	document.getElementById("startButton").onclick = start;
	document.getElementById("resetButton").onclick = reset;
	timerDiv = document.getElementById("timer");
	scoreTable = document.getElementById("scoreList");
	scoreDiv = document.getElementById("scoreDiv");

	$.ajax({
		type: "GET",
		url: "scores.csv",
		dataType: "text",
		success: buildTable
	});

	scrollTable();
};

function start() {
	clearInterval(interval);
	seconds = 149;
	timerDiv.style.backgroundColor = "green";
	interval = setInterval(function () {
		var timerText = Math.floor(seconds / 60);
		timerText = timerText + ":";
		if((seconds % 60) < 10) {timerText = timerText + "0"};
		timerText = timerText + seconds % 60;
		timerDiv.innerHTML = timerText;

		seconds--;

		if(seconds < 0) {
			clearInterval(interval);
			matchEnd.play();
		} else if(seconds < 5) {
			timerDiv.style.backgroundColor = "red";
		} else if(seconds < 30) {
			timerDiv.style.backgroundColor = "yellow";
			if(!matchWarnPlayed) {
				matchWarn.play();
				matchWarnPlayed = true;
			}
		} else {
			timerDiv.style.backgroundColor = "green";
		}
	}, 1000);
	matchStart.play();
}

function reset() {
	clearInterval(interval);
	timerDiv.innerHTML = "2:30";
	timerDiv.style.backgroundColor = "blue";
}

function buildTable(csvData) {
	var csvLines = csvData.split(/\r\n|\n/);
	var headers = csvLines[0].split(',');
	var headerRow = "<tr><th>Rank</th><th>Team Number</th><th>Team Name</th><th>Practice</th><th>Round 1</th><th>Round 2</th><th>Round 3</th><th>High Score</th></tr>";
	scoreTable.insertRow().innerHTML = headerRow;

	for(var i = 1; i < csvLines.length; i++) {
		if(i % 10 == 0) {
			scoreTable.insertRow().innerHTML = headerRow
		}

		var data = csvLines[i].split(',');
		var row = scoreTable.insertRow();
		row.insertCell(0).innerHTML = data[data.length - 1];
		for(var j = 0; j < data.length - 1; j++) {
				row.insertCell(j + 1).innerHTML = data[j];
		}
	}
}

function scrollTable() {
	if(scoreHold) {
		scoreHold = false;
		scoreDiv.scrollTo(0, 0);
		setTimeout(scrollTable, 5000);
	} else if(scoreDiv.scrollTop === (scoreDiv.scrollHeight - scoreDiv.offsetHeight)) {
		scoreHold = true;
		scoreDiv.scrollTo(0, scoreDiv.scrollHeight);
		setTimeout(scrollTable, 5000);
	} else {
		scoreDiv.scrollBy(0, 1);
		setTimeout(scrollTable, 100);
	}
}
