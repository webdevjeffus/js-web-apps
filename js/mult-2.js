// Global Variables
var attemptedSets = [];
var passedSets = [];
var currentSet = 0;

var factors = [];
var usedFactors = [];
var currentFactor = 0;


// Functions

function endRound() {
	
	// Display endgame box
    document.getElementById('endGameBox').style.visibility='visible';
    
	// User answered all 10 facts correctly
    if (correctAnswers >= 10) {
		
		// Add currentSet to passedSets array
		passedSets.push(currentSet); 
		
        // Prepare Endgame Box
        document.getElementById('endGameBox').style.backgroundColor = 'rgb(189, 228, 143)';
        document.getElementById('endGameBox').style.color = 'black';
        document.getElementById('endGameHead').innerHTML = 
                'Well done, Mathemagician!'
        document.getElementById('endGameText').innerHTML = 
                'You solved all 10 facts in the ' + currentSet + 'x set! Would you like to try another fact set?'
        
        // Update quiz box text
        document.getElementById('practisingHead').innerHTML = 
                "You've solved all the " + currentSet + "x facts!";
        document.getElementById('reportResult').innerHTML = 
                '<p>Choose another fact set<br>to try to solve!</p>';
                
        // Mark Family button as successful
        passedSets.push(currentSet);
		attemptedFamilies.push(currentSet);
        console.log("Passed families: " + passedSets);
        for (var j = 0; j < passedSets.length; j++) {
            document.getElementById('familyBtn'+passedSets[j]).style.backgroundColor = 'rgb(85, 107, 47)';
            document.getElementById('familyBtn'+passedSets[j]).style.cursor = 'default';
            document.getElementById('familyBtn'+passedSets[j]).removeAttribute('onclick');
        }
        
        // Display box for all families completed
        if (passedSets.length === 10) {
            document.getElementById('streakText').innerHTML="You've correctly solved all the multiplication facts for every factor from 1x1 to 10x10!<br>Click your browser's Reload icon to play again!";
            document.getElementById('streakBox').style.visibility='visible';
        }
    }
    
	// User missed three facts and failed to complete family
    else {
        // Prepare Endgame Box
        document.getElementById('endGameBox').style.backgroundColor = 'rgba(166, 46, 46, 1)';
        document.getElementById('endGameBox').style.color = 'white';
        document.getElementById('endGameHead').innerHTML = 
                'Good try, Mathemagician!'
        document.getElementById('endGameText').innerHTML = 
                'Unfortunately, you missed 3 facts in the ' + currentSet + 'x set. Would you like to try another fact set?'
                
        // Update quiz box text
        document.getElementById('practisingHead').innerHTML = 
                "You need more practice with " + currentSet + "x facts!";
        document.getElementById('reportResult').innerHTML = 
                '<p>Choose another fact set<br>to try to solve!</p>';
        
        // Mark Family button as failed
		attemptedSets.push(currentSet);
        document.getElementById('familyBtn'+currentSet).style.backgroundColor = 'rgba(166, 46, 46, 1)';
    }
	
	
	
}

function playRound() {
	
	var userAnswer, shiftedFactor;
	
	while (correctFacts <= 10 && incorrectFacts <= 3) {
		
		// Create and display fact
		currentFactor = factors[0];
		document.getElementById('currentFact').innerHTML = 
				factFamily + ' x ' + currentFactor + ' = ';
	
		// Get user answer
		userAnswer = form.userAnswer.value;
		// Clear input box
		form.userAnswer.reset;
		
		// Evaluate userAnswer
		// User answered correctly
		if (Number(userAnswer) === factFamily * currentFactor) {
			document.getElementById('reportResult').innerHTML = 
				'<p>You answered ' + factFamily + ' x ' + currentFactor + ' = ' + userAnswer + '<br>Congratulations! That is correct!</p>';
				
			// Shift factor from unused array to used array
			shiftedFactor = factors.shift();
			usedFactors.push(shiftedFactor);
			
			// Set factor button to green for success
			document.getElementById('factorBtn'+shiftedFactor).style.backgroundColor='rgb(85, 107, 47)';
			
			// console.log('Correct: ' + correctAnswers + ' Incorrect: ' + incorrectAnswers);
			// console.log(unusedFactors);
			document.getElementById("userAnswer").value = "";
			
			// Increment correct answer and streak counts
			correctAnswers++;
			streakCount++;
			// console.log("Streak: " + streakCount);
			
			// If streak reaches breakpoint, display congrat message
			if (streakCount === 10 ||
				streakCount === 25 ||
				streakCount === 50 ||
				streakCount === 75) {
				document.getElementById('streakText').innerHTML="You've correctly solved " + streakCount + " multiplication facts in a row!";
				document.getElementById('streakBox').style.visibility='visible';
			}
		}
		
		// User answered incorrectly
		else {
			document.getElementById('reportResult').innerHTML = 
				'<p>You answered ' + factFamily + ' x ' + currentFactor + ' = ' + userAnswer + '<br>Sorry, but that is not correct.</p>';
			
			// Move shiftedFactor to end of factors array
			shiftedFactor = factors.shift();
			unusedFactors.push(shiftedFactor);
			
			// Set factor button to red (fail), increment incorrect answers
			document.getElementById('factorBtn'+shiftedFactor).style.backgroundColor='rgba(166, 46, 46, 1)';
			incorrectAnswers++;
			
			// Set a strikeBtn to visible
			document.getElementById('strikeBtn'+incorrectAnswers).style.visibility='visible';
			console.log('Correct: ' + correctAnswers + ' Incorrect: ' + incorrectAnswers);
			console.log(unusedFactors);
			
			// Clear userAnswer(?)
			document.getElementById("userAnswer").value = "";
			
			// Reset streakCount to 0
			streakCount = 0;
			// console.log("Streak: " + streakCount);
		}
	}
} 


function shuffleRange(limit) {
	
	// Create array
	var arr = [];
	for (var i = 0; i < limit; i++) {
		arr.push(i+1);
	}
	
	// Fisher-Yates shuffle
    var m = arr.length, t, i;
    
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr;
}

function prepareBtns() {
	// Deactivate Set buttons
	// Set all Sets buttons to blue
	// Set attemptedSets buttons to red
	// Set passedSets buttons to green
	// Set currentSet button to gold
	
	// Set all factor buttons to gray
	// Set all strike buttons to hidden
}


function prepareRound() {
	
	// Activate sets buttons for player choice
	for (var i = 1; i <= 10; i++) {
        if ( passedSets.indexOf(i) == -1) {
            document.getElementById('familyBtn'+i).setAttribute('onclick', 'return ' + i);
            document.getElementById('familyBtn'+i).style.cursor = 'pointer';
        }
    }
	
	// Get user input:
		// Set currentSet = user input: set button onclick
	
	prepareBtns();
	
	if (attemptedSets.indexOf(currentSet) === -1) {
		attemptedSets.push(currentSet);
	}
	
	factors = shuffleRange(10);
	
}


function prepareNextRound() {
		
	// Give directions
		// Window title: Choose your next set of facts
		// Window msg: Click any blue or red button to choose a fact set 
	
	prepareRound();
	
}


/************* BEGIN GAME LOGIC *********************/

// Set up start of game
	// Window title: Choose your first set of facts
	// Window msg: Click any blue button to choose a fact set
	prepareRound();

// Game Loop
while (passedSets < 10) {
	
	playRound();
	
	endRound();
	
	prepareNextRound();
	
}