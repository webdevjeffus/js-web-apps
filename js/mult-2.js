// Global Variables
var attemptedSets = [];
var passedSets = [];
var currentSet = 0;

var factors = [];
var usedFactors = [];
var currentFactor = 0;

var correctFacts = 0;
var incorrectFacts = 0;
var streakCount = 0;

var userAnswer = 0, shiftedFactor = 0;


// Functions

// Disable Enter key
function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="number"))  {return false;} 
} 

document.onkeypress = stopRKey; 
// End code to disable Enter key

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
                
        // Mark Set button as successful
        passedSets.push(currentSet);
		attemptedFamilies.push(currentSet);
        console.log("Passed families: " + passedSets);
        for (var j = 0; j < passedSets.length; j++) {
            document.getElementById('setBtn'+passedSets[j]).style.backgroundColor = 'rgb(85, 107, 47)';
            document.getElementById('setBtn'+passedSets[j]).style.cursor = 'default';
            document.getElementById('setBtn'+passedSets[j]).removeAttribute('onclick');
        }
        
        // Display box for all families completed
        if (passedSets.length === 10) {
            document.getElementById('streakText').innerHTML="You've correctly solved all the multiplication facts for every factor from 1x1 to 10x10!<br>Click your browser's Reload icon to play again!";
            document.getElementById('streakBox').style.visibility='visible';
        }
    }
    
	// User missed three facts and failed to complete set
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
        
        // Mark Set button as failed
		attemptedSets.push(currentSet);
        document.getElementById('setBtn'+currentSet).style.backgroundColor = 'rgba(166, 46, 46, 1)';
    }
	
	
	
}

function evaluateAnswer(form) {
    
    console.log("**************** BEGIN evaluateAnswer()");
    console.log(currentSet + " x " + currentFactor + " = " + currentSet * currentFactor);
    
    // Get user answer
    userAnswer = form.userAnswer.value;
    console.log("User answer: " + userAnswer);
    
    // Clear input box
    form.userAnswer.reset;
    
    if (Number(userAnswer) === currentSet * currentFactor) {
        
        document.getElementById('windowText').innerHTML = 
				'<p>You answered ' + currentSet + ' x ' + currentFactor + ' = ' + userAnswer + '<br>Congratulations! That is correct!</p>';
                
        // Shift factor from unused array to used array
        shiftedFactor = factors.shift();
        usedFactors.push(shiftedFactor);
        
        // Set factor button to green for success
        document.getElementById('factorBtn'+shiftedFactor).style.backgroundColor='rgb(85, 107, 47)';
        
        document.getElementById("userAnswer").value = "";
        
        // Increment correct answer and streak counts
        correctFacts++;
        streakCount++;
        
        // If streak reaches breakpoint, display congrat message
        if (streakCount === 10 ||
            streakCount === 25 ||
            streakCount === 50 ||
            streakCount === 75) {
            document.getElementById('streakText').innerHTML="You've correctly solved " + streakCount + " multiplication facts in a row!";
            document.getElementById('streakBox').style.visibility='visible';
        }
        
        console.log('Correct: ' + correctFacts + ' Incorrect: ' + incorrectFacts);
        console.log("factors: " + factors);
        console.log("Streak: " + streakCount);

    }
    
    else {
        document.getElementById('windowText').innerHTML = 
				'<p>You answered ' + currentSet + ' x ' + currentFactor + ' = ' + userAnswer + '<br>Sorry, but that is not correct.</p>';
        
        // Move shiftedFactor to end of factors array
        shiftedFactor = factors.shift();
        factors.push(shiftedFactor);
        
        // Set factor button to red (fail), increment incorrect answers
        document.getElementById('factorBtn'+shiftedFactor).style.backgroundColor='rgba(166, 46, 46, 1)';
        incorrectFacts++;
        
        // Set a strikeBtn to visible
        document.getElementById('strikeBtn'+incorrectFacts).style.visibility='visible';
        console.log('Correct: ' + correctFacts + ' Incorrect: ' + incorrectFacts);
        console.log(factors);
        
        // Clear userAnswer(?)
        document.getElementById("userAnswer").value = "";
        
        // Reset streakCount to 0
        streakCount = 0;
        // console.log("Streak: " + streakCount);
    }
    
    console.log("****************** END evaluateAnswer()");
}

function playRound(form) {
    
    console.log("******************* BEGIN playRound()");
    
    // Create and display fact
    currentFactor = factors[0];
    
    console.log("Current set: " + currentSet);
    console.log("Current factor: " + currentFactor);
    
    document.getElementById('currentFact').innerHTML = 
            currentSet + ' x ' + currentFactor + ' = ';
    
    // Get user answer
    //userAnswer = form.userAnswer.value;
    //console.log("User answer: " + userAnswer);
    
    // Clear input box
    //form.userAnswer.reset;
    
    console.log("********************* END playRound()");
}
	
/*		// Get user answer
		userAnswer = form.userAnswer.value;
		// Clear input box
		form.userAnswer.reset;
		
		// Evaluate userAnswer
		// User answered correctly
		if (Number(userAnswer) === currentSet * currentFactor) {
			document.getElementById('windowText').innerHTML = 
				'<p>You answered ' + currentSet + ' x ' + currentFactor + ' = ' + userAnswer + '<br>Congratulations! That is correct!</p>';
				
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
			document.getElementById('windowText').innerHTML = 
				'<p>You answered ' + currentSet + ' x ' + currentFactor + ' = ' + userAnswer + '<br>Sorry, but that is not correct.</p>';
			
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
*/

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
    console.log("******************* BEGIN prepareBtns()");
    
	// Deactivate Set buttons
    for (var i = 1; i <= 10; i++) {
        document.getElementById('setBtn'+i).removeAttribute('onclick');
        document.getElementById('setBtn'+i).style.cursor = 'default';
    }
    console.log("All set buttons deactivated.");
    
	// Set all Sets buttons to blue
    for (var i = 1; i <= 10; i++) {
        document.getElementById('setBtn'+i).style.backgroundColor = 'rgba(20, 87, 145, 1);';
    }
    console.log("All set buttons set to blue.");
    
	// Set attemptedSets buttons to red
    for (var i = 1; i <= 10; i++) {
        if ( attemptedSets.indexOf(i) != -1) {
            document.getElementById('setBtn'+i).style.backgroundColor = 'rgba(166, 46, 46, 1)';
        }
    }
    console.log("All attempted set buttons set to red.");
    console.log("Attempted sets: " + attemptedSets);
    
	// Set passedSets buttons to green
    for (var i = 1; i <= 10; i++) {
        if ( passedSets.indexOf(i) != -1) {
            document.getElementById('setBtn'+i).style.backgroundColor = 'rgba(85, 107, 47,1)';
        }
    }
    console.log("All passed set buttons set to green.");
    console.log("Passed sets: " + passedSets);
    
	// Set currentSet button to gold
	document.getElementById('setBtn'+currentSet).style.backgroundColor = 'gold';
    console.log("Current set button set to bold.");
    console.log("Current set: " + currentSet);
    
	// Set all factor buttons back to gray
    for (var i = 0; i < 10; i++) {
        document.getElementById('factorBtn'+(i+1)).style.backgroundColor='lightgray';
    }
    console.log("Factor buttons set to gray.");
    
	// Set all strike buttons back to hidden
    for (var j = 0; j < 3; j++) {
        document.getElementById('strikeBtn'+(j+1)).style.visibility='hidden';
    }
    console.log("Strike buttons set to hidden.");
    
    console.log("********************* END prepareBtns()");
}


function getSet() {
	
    console.log("************************* BEGIN getSet()");
    
	// Activate sets buttons for player choice
	for (var i = 1; i <= 10; i++) {
        if ( passedSets.indexOf(i) == -1) {
            document.getElementById('setBtn'+i).setAttribute('onclick', 'prepareSet('+i+')');
            document.getElementById('setBtn'+i).style.cursor = 'pointer';
        }
    }
    
    console.log("Set buttons ready for user input by click to choose set.");
    console.log("************************** END getSet()");
}

function prepareSet(set) {
	
    console.log("******************** BEGIN prepareSet()");
    
    console.log("Player has clicked setBtn" + set);
    
	currentSet = set;
    console.log("currentSet = " + currentSet);
	
	prepareBtns();
    
    document.getElementById('currentChallenge').style.visibility = 'visible';
	
	if (attemptedSets.indexOf(currentSet) === -1) {
		attemptedSets.push(currentSet);
	}
	
	factors = shuffleRange(10);
    console.log("Run shuffleRange(10) to create factors arr.");
    console.log("factors: " + factors);
    
    console.log("********************** CALL playRound()");
    playRound();
	
    console.log("********************** END prepareSet()");
    
}



function prepareNextRound() {
		
	// Give directions for choosing next fact set
    document.getElementById('windowHead').innerHTML = 
            'Choose your next set of facts';
    document.getElementById('windowText').innerHTML = 
            '<p>Click any blue button to choose a fact set.</p>';
	
	prepareRound();
	
}


/************* BEGIN GAME LOGIC *********************/

// Set up start of game
	// Window title: Choose your first set of facts
	// Window msg: Click any blue button to choose a fact set
    // Set message texts to match first fact in family
document.getElementById('windowHead').innerHTML = 
        'Welcome to<br>Mathemagic Multiplication!';
document.getElementById('windowText').innerHTML = 
        '<p>Click any blue button<br>to choose your first fact set.</p>';
        
document.getElementById('currentChallenge').style.visibility = 'hidden';

getSet();

// Program waits for user input choosing set

