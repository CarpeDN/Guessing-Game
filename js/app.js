var remAttempts = 5;
var labelNum = 1;
var randomNumber = Math.floor(100*Math.random())

//Javascript Functionality
function postNumber(userInput, remAttempts, labelNum) {
	$(".form-group").append('<label> Number ' + labelNum + '</label>');
	$(".form-group").append('<input type="text" id="disabledTextInput" class="form-control" placeholder=' + userInput +'>');
}

function postMessage(userInput) {
	//input hotter/colder messages later based on ranges
	if (userInput === randomNumber) {
		return "HOORAH, YOU WIN!"
	}
	else {
		return "Try Again!"
	}
}

function checkNum(userInput) {
	if (userInput >=0 && userInput <=100 && remAttempts >0) {
		return true
	}
	return false
}

$(document).ready(function() {
	//animation on buttons
	$(".btn").on("mouseenter", fadeToOpaque);
	$(".btn").on("mouseleave", fadeToDefault);

	$(".btn-success").on("click", function() {
		var userInput = parseInt($("#number-input").val());
		if (checkNum(userInput)) {
			postNumber(userInput,remAttempts,labelNum);
			$("#message-box").text(postMessage(userInput))
			remAttempts -= 1;
			labelNum += 1;
		}
		else if (checkNum(userInput) === false) {
			postMessage(userInput)
		}
	});
});



//add animation shake








//JQuery Animations
function fadeToOpaque() {
	$(this).fadeTo("fast",1);
}
function fadeToDefault() {
	$(this).fadeTo("medium",.5);
}

