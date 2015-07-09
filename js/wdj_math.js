var factFamily;
var startingFamily;
var currentFactor;
var unusedFactors = [];
var usedFactors = [];
var passedFamilies = [];
var attemptedFamilies = [];
var correctAnswers = 0;
var incorrectAnswers = 0;
var streakCount = 0;

// Disable Enter key
function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="number"))  {return false;} 
} 

document.onkeypress = stopRKey; 
// End code to disable Enter key


function rollD(die) {
    return (Math.floor(Math.random() * die) + 1);
}

function evaluateAnswer(form) {
    var userAnswer = form.userAnswer.value;
    var shiftedFactor;
    form.userAnswer.reset;
	
	// User answered correctly
    if (Number(userAnswer) === factFamily * currentFactor) {
        document.getElementById('reportResult').innerHTML = 
            '<p>You answered ' + factFamily + ' x ' + currentFactor + ' = ' + userAnswer + '<br>Congratulations! That is correct!</p>';
			
		// Shift factor from unused array to used array
        shiftedFactor = unusedFactors.shift();
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
        shiftedFactor = unusedFactors.shift();
        unusedFactors.push(shiftedFactor);
        document.getElementById('factorBtn'+shiftedFactor).style.backgroundColor='rgba(166, 46, 46, 1)';
        incorrectAnswers++;
        document.getElementById('strikeBtn'+incorrectAnswers).style.visibility='visible';
        console.log('Correct: ' + correctAnswers + ' Incorrect: ' + incorrectAnswers);
        console.log(unusedFactors);
        document.getElementById("userAnswer").value = "";
        streakCount = 0;
        console.log("Streak: " + streakCount);
    }
    
    if (correctAnswers >= 10 || incorrectAnswers >= 3) {
        endFamily();
    }
    
    else {
        prepareFact();
    }
    
    return false;
}

function endFamily() {
    
	// Display endgame box
    document.getElementById('endGameBox').style.visibility='visible';
    
	// User answered all 10 facts correctly
    if (correctAnswers >= 10) {
        // Prepare Endgame Box
        document.getElementById('endGameBox').style.backgroundColor = 'rgb(189, 228, 143)';
        document.getElementById('endGameBox').style.color = 'black';
        document.getElementById('endGameHead').innerHTML = 
                'Well done, Mathemagician!'
        document.getElementById('endGameText').innerHTML = 
                'You solved all 10 facts in the ' + factFamily + 'x set! Would you like to try another fact set?'
        
        // Update quiz box text
        document.getElementById('practisingHead').innerHTML = 
                "You've solved all the " + factFamily + "x facts!";
        document.getElementById('reportResult').innerHTML = 
                '<p>Choose another fact set<br>to try to solve!</p>';
                
        // Mark Family button as successful
        passedFamilies.push(factFamily);
		attemptedFamilies.push(factFamily);
        console.log("Passed families: " + passedFamilies);
        for (var j = 0; j < passedFamilies.length; j++) {
            document.getElementById('familyBtn'+passedFamilies[j]).style.backgroundColor = 'rgb(85, 107, 47)';
            document.getElementById('familyBtn'+passedFamilies[j]).style.cursor = 'default';
            document.getElementById('familyBtn'+passedFamilies[j]).removeAttribute('onclick');
        }
        
        // Display box for all families completed
        if (passedFamilies.length === 10) {
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
                'Unfortunately, you missed 3 facts in the ' + factFamily + 'x set. Would you like to try another fact set?'
                
        // Update quiz box text
        document.getElementById('practisingHead').innerHTML = 
                "You need more practice with " + factFamily + "x facts!";
        document.getElementById('reportResult').innerHTML = 
                '<p>Choose another fact set<br>to try to solve!</p>';
        
        // Mark Family button as failed
		attemptedFamilies.push(factFamily);
        document.getElementById('familyBtn'+factFamily).style.backgroundColor = 'rgba(166, 46, 46, 1)';
    }
    
    for (var i = 1; i <= 10; i++) {
        if ( passedFamilies.indexOf(i) == -1) {
            document.getElementById('familyBtn'+i).setAttribute('onclick', 'prepareFamily('+i+')');
            document.getElementById('familyBtn'+i).style.cursor = 'pointer';
        }
    }
    
}

function hideBox(id) {
    document.getElementById(id).style.visibility='hidden';
    
}

function resetBtns(family) {
    
	// Set all factor buttons back to gray
    for (var i = 0; i < 10; i++) {
        document.getElementById('factorBtn'+(i+1)).style.backgroundColor='lightgray';
    }
    
	// Set all strike buttons back to hidden
    for (var j = 0; j < 3; j++) {
        document.getElementById('strikeBtn'+(j+1)).style.visibility='hidden';
    }
    
	// if (attemptedFamilies !== [] ){
    if (family !== startingFamily) {
        console.log("Reset triggered: "+family+" != "+startingFamily);
        document.getElementById('familyBtn'+startingFamily).style.backgroundColor = 'rgba(20, 87, 145, 1)';
    }
    
	
    if (family !== undefined) {
		killFamilyBtns();
	}
	
	/*
        for (var i = 0; i < 10; i++) {
            document.getElementById('familyBtn'+(i+1)).removeAttribute('onclick');
            document.getElementById('familyBtn'+(i+1)).style.cursor = "default";
        }
    }
	*/
}

function killFamilyBtns() {
	for (var i = 0; i < 10; i++) {
		document.getElementById('familyBtn'+(i+1)).removeAttribute('onclick');
		document.getElementById('familyBtn'+(i+1)).style.cursor = "default";
	}
}

// Prepare family for next round;
// Get value for family from button user clicked
function prepareFamily(family) {
    
    // Shuffle factors for this round
    unusedFactors = prepareFactors();
    // console.log(unusedFactors);
	
	// Clear answers and factors from previous round
    correctAnswers = 0;
    incorrectAnswers = 0;
	usedFactors = [];
	
	// Set buttons for game (how to describe this?)
	resetBtns(family);
    
	// Family is undefined because page has just loaded --
	// No user input yet, so choose starting family randomly
    if (family === undefined) {
        console.log("Fact Family chosen randomly");
		
		// Choose starting family randomly, set current family to starting family
        startingFamily = rollD(10);
        factFamily = startingFamily;
        console.log("FactFamily: " + factFamily);
        console.log("Starting Family: " + startingFamily);
		
		// Set message texts to offer user chance to change family
        document.getElementById('practisingHead').innerHTML = 
                'Get ready to practice ' + factFamily + 'x facts';
        document.getElementById('reportResult').innerHTML = 
                '<p>Or choose another fact set<br>by clicking a blue button!</p>';
    } 
	
	// This is NOT the first time prepareFamily has been called,
	// so player is choosing next family to attempt
	else {
        console.log("Fact Family chosen by user");
		
		// Set factFamily to value of family button user clicked
        factFamily = family;
        console.log("FactFamily: " + factFamily);
        console.log("Starting Family: " + startingFamily);
		
		// Set message texts to match first fact in family
        document.getElementById('practisingHead').innerHTML = 
                'Now practicing ' + factFamily + 'x facts';
        document.getElementById('reportResult').innerHTML = 
                '<p>Get ready<br>to multiply by ' + factFamily + '&puncsp;!</p>';        
    }
    
	// Set active family button to gold
    document.getElementById('familyBtn'+factFamily).style.backgroundColor = 'gold';
    
	// Prepare first fact in family
    prepareFact();
}

function prepareFactors() {
    // Fisher-Yates shuffle!
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var m = arr.length, t, i;
    
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr;
}

function prepareFact() {
    
    currentFactor = unusedFactors[0];
    document.getElementById('currentFact').innerHTML = 
            factFamily + ' x ' + currentFactor + ' = ';
    
}

prepareFamily();