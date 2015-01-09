//new game variables
var correctAnswer = Math.floor(100*Math.random()) + 1;
// alert("Correct Answer: " + correctAnswer);
var storedGuesses = [];
var remAttempts = 5;
var label = 1;


function validateInput(userInput) {
	//returns a boolean if input is valid or invalid
	if (userInput >= 1 && userInput <= 100) {
		return true;
	}
	else {
		return false;
	}
};

function checkGuess(userInput) {
	return userInput - correctAnswer;
}

function message(num) {
	if (num === 0) {
		$("#message-box").text("You Win!");
	}
	else if (num > 0 && num <= 5) {
		$("#message-box").text("Very Hot, you're super close! Guess lower!");
	}
	else if (num >= 6 && num <= 10) {
		$("#message-box").text("Hot, but close! Guess lower!");
	}
	else if (num >= 11 && num <= 20) {
		$("#message-box").text("Cold, but close! Guess lower!");
	}
	else if (num > 21) {
		$("#message-box").text("Very Cold. Guess a lot lower!");
	}
	else if (num < 0 && num >= -5) {
		$("#message-box").text("Very Hot, you're super close! Guess higher!");
	}
	else if (num <= -6 && num >= -10) {
		$("#message-box").text("Hot, but close! Guess higher!");
	}
	else if (num <= -11 && num >= -20) {
		$("#message-box").text("Cold, but close! Guess higher!");
	}
	else if (num < 21) {
		$("#message-box").text("Very Cold. Guess a lot higher!");
	}
	$(".rem-attempts input").attr("placeholder",remAttempts + " attempts left")
};

function resetGame() {
	correctAnswer = Math.floor(100*Math.random()) + 1;
	// alert("Correct Answer: " + correctAnswer);
	storedGuesses = [];
	remAttempts = 5;
	label = 1;
	$("#win").hide();
	$("#lose").hide();
	$(".btn-success").show();
	$(".btn-danger").show();
	$("#message-box").text("Starting Over! Input a number between 1-100");
	$(".rem-attempts input").attr("placeholder",remAttempts + " attempts left")
	$(".form-group input").remove();
	$(".form-group label").remove()
}

function addLabel(userInput) {
	$(".form-group").append('<label> Number ' + label + '</label>');
	$(".form-group").append('<input type="text" id="disabledTextInput" class="form-control" placeholder=' + userInput +'>');
} ;

function youWin() {
	$(".btn-success").hide();
	$(".btn-danger").hide();
	$("#win").show();
}

function youLose() {
	$(".btn-success").hide();
	$(".btn-danger").hide();
	$("#lose").show();
}

function game() {
	event.preventDefault();
		var userInput = parseInt($("#number-input").val());

		//Remaining attempts more than 1
		if (validateInput(userInput) && storedGuesses.indexOf(userInput) === -1 && remAttempts > 1) {
			//Valid guess
			storedGuesses.push(userInput);
			remAttempts--;
			if (checkGuess(userInput) === 0) {
				message(checkGuess(userInput));
				youWin();
			}
			else {
				message(checkGuess(userInput));
			}
			addLabel(userInput)
			label++;
		}
		//Last Try
		else if (validateInput(userInput) && storedGuesses.indexOf(userInput) === -1 && remAttempts === 1) {
			storedGuesses.push(userInput);
			remAttempts--;
			if (checkGuess(userInput) === 0) {
				message(checkGuess(userInput));
				youWin();
			}
			else {
				$("#message-box").text("You Lose! The number was " + correctAnswer + ". Try again");
				$(".rem-attempts input").attr("placeholder",remAttempts + " attempts left")
				addLabel(userInput)				
				youLose();
			}
		}
		else if (validateInput(userInput) && storedGuesses.indexOf(userInput) !== -1) {
			$("#message-box").text("You already guessed this! Choose another number between 1-100");
			//TO DO: shake form field
		}
		else {
			//Invalid number
			$("#message-box").text("Invalid input. Choose a number between 1-100");
			//TO DO: shake form field
		}
	};

$(document).ready(function() {

	//userInput Submission
	$("#number-input").keypress(function(e) {
		var key = e.which;
		if (key === 13) {
			game();
		}
	})
	$(".btn-success").on("click", game)
	
	//Hint button
	$(".btn-danger").on("click", function() {
		var upperLimit = Math.min(correctAnswer + Math.max(2,Math.floor(Math.random() * 10)), 100);
		var lowerLimit = Math.max(correctAnswer - Math.max(2,Math.ceil(Math.random() * 10)), 1);
		$("#message-box").text("The number is between " + lowerLimit + " and " + upperLimit);
	});

	$(".btn-primary").on("click", function() {
		resetGame();
	});

	//JQuery
	$(".btn").on("mouseenter", function() {
		$(this).fadeTo("fast",1)
	});
	$(".btn").on("mouseleave", function() {
		$(this).fadeTo("slow",0.5)
	});
});





