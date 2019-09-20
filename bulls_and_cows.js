$(function(){

/*------ RANDOM NUMBER ------*/		
/*------ generate 4 digit number without a repeating digit ------*/
	
	var randomNum1;
	var randomNum2;
	var randomNum3;
	var randomNum4;
	
    /*------ Random number function ------*/
	function randomizer (){
		do{
			randomNum1 = Math.floor(Math.random() * 10);
		} while (randomNum1 == 0);
		
		do{
			randomNum2 = Math.floor(Math.random() * 10);
		} while (randomNum2 == randomNum1 || randomNum2 == 0);
		
	
		do{
			randomNum3 = Math.floor(Math.random() * 10);
		} while (randomNum3 == randomNum1 || randomNum3 == randomNum2 || randomNum3 == 0);
		
		do{
			randomNum4 = Math.floor(Math.random() * 10);
		} while (randomNum4 == randomNum1 || randomNum4 == randomNum2 || randomNum4 == randomNum3 || randomNum4 == 0);
	
		var randomNum = "" + randomNum1 + randomNum2 + randomNum3 + randomNum4;
		
		//check in console - comment out later
/*
		console.log(randomNum1);
		console.log(randomNum2);
		console.log(randomNum3);
		console.log(randomNum4);
*/
		
		//show random number in console - comment out after demonstration
		console.log("Random number is: " + randomNum);
	}
	
	randomizer ();
	
/*------ INPUT GUESS ------*/	
/*------ attach event listener to num class "buttons" ------*/

	//variable to count the number of clicks/inputs
	var guessRows = 0;
	
    //event listener
    $('#numTable .num').on('click', function(){
	    if (guessRows < 4){
		    //remove margin to make room for numTable
            $('#numTable').css('margin-top', '0px');
            
            //variable with value of clicked id
            //id variable = id becuase id's are just a number
            var id = this.id;
            
            //add clicked element to guessTable
            $('#guessTable tr').append('<td class="numGuess">' + id + '</td>');
            
			//change clicked item to display none
			$(this).css('display', 'none');
			
			//increase guessRows
			guessRows += 1;
			
			//print number of clicks/inputs to console for - comment out later
// 			console.log ("Guess rows: " + guessRows);
			
			//once there are 4 clicks/inputs, disable clicks/inputs
			if (guessRows==4){
				$('.num').addClass('disabled');
				$('#guess').removeAttr('disabled');
				$('#guess').removeClass('disabled');
			}
		}
    });


/*------ EDIT GUESS ------*/	
/*------ TODO: click on input, put back in #numTable------*/	
	
	//not working
/*
	$('.numGuess').on('click', function(){
		alert("input");
	});
*/


/*------ SUBMIT GUESS ------*/
/*------ attach event listener to button ------*/

	//initial variable to count the number of guesses
	var guessNum = 1;
	
	//initial variable to count games played
	var gamesPlayed = 0;
	
	//initial variable to count number of games won
	var gamesWon = 0;

	/*------ Reset function ------*/
	function reset (){
	    //clear out the input guess
        $('#guessTable').html('<tr></tr>');
        
        //loop to make sure each table cell id is visible
        //i = id becuase id's are just a number
        for (var i = 1; i < 10; i++){
            $('#' + i).css('display', 'table-cell');
        }
        //reset clicks/inputs
        guessRows = 0;
        
        //remove disables class
        $('.num').removeClass('disabled');
        
        //re-disable guess button
        $('#guess').attr('disabled','disabled');
        $('#guess').addClass('disabled');
        
        //reenable the margin for numTable
        $('#numTable').css('margin-top', '52px');
        
        //show that clicks/inputs has been reset in console - comment out later
//         console.log ("Guess rows: " + guessRows);
        
    }

	//event listener for guess button
	$('#guess').on('click', function(){
		//input number from #number div and convert to number
        var inputNum1 = $('#guessTable tr td:first').html();
        var inputNum2 = $('#guessTable tr td:eq(1)').html();
        var inputNum3 = $('#guessTable tr td:eq(2)').html();
        var inputNum4 = $('#guessTable tr td:eq(3)').html();
        var inputNum = "" + inputNum1 + inputNum2 + inputNum3 + inputNum4;
        console.log(inputNum);
        
        /*------ Verify Numbers ------*/
        
        //bull and cow variables
        var bull = 0;
        var cow = 0;
        
        //check inputs to random number
        if (inputNum1 == randomNum1){
	        bull++;
        } else if(inputNum1 == randomNum2 || inputNum1 == randomNum3 || inputNum1 == randomNum4){
	        cow++;
        }
        
        if (inputNum2 == randomNum2){
	        bull++;
        } else if(inputNum2 == randomNum1 || inputNum2 == randomNum3 || inputNum2 == randomNum4){
	        cow++;
        }
        
        if (inputNum3 == randomNum3){
	        bull++;
        } else if(inputNum3 == randomNum2 || inputNum3 == randomNum1 || inputNum3 == randomNum4){
	        cow++;
        }
        
        if (inputNum4 == randomNum4){
	        bull++;
        } else if(inputNum4 == randomNum2 || inputNum4 == randomNum3 || inputNum4 == randomNum1){
	        cow++;
        }
        
        /*------ Display Guess ------*/
        
        //print to console
        console.log("bull: " + bull + " | cow: " + cow);
        
        //image variables
        var bullImage = "";
        var cowImage = "";
        
        //loop - add image to bullImage 
        for(var i = 0; i < bull; i++){
            bullImage = bullImage + "<img src=\"images/bull.png\" width=\"40px\" height=\"30px\">";
        }
        
        //loop - add image to cowImage 
        for(var i = 0; i < cow; i++){
            cowImage = cowImage + "<img src=\"images/cow.png\" width=\"40px\" height=\"30px\">";
        }
        
        /*------ If Correct ------*/
 
        if(bull == 4){
	        //print result
	        
	        //old way with text & graphics
        	//$('#result').prepend("<li>Correct Guess! You Win! Guesses needed: " + guessNum + ": " + inputNum + " bull: " + bull + bullImage + " | cow: " + cow + cowImage + "</li>");
        	
        	
        	//new way with graphics
        	$('#resultList').prepend("<hr><li>Correct! You Win!!<br>Guess #" + guessNum + ": " + inputNum + "<br>" + bullImage + cowImage + "<br>Guesses needed: " + guessNum + "</li>");
        	
        	//re-disable guess button
	        $('#guess').attr('disabled','disabled');
            $('#guess').addClass('disabled');
	        
	        //games won counter
	        gamesWon++;

			
        }else{
	        
	    /*------ If Incorrect ------*/
	    
	        //print result
		    
		    //old way with text & graphics
		    //$('#result').prepend("<li><hr>Incorrect!<br> Guess #" + guessNum + ": " + inputNum + "<br> bull: " + bull + bullImage + " | cow: " + cow + cowImage + "</li>");
		    
		    //new way with graphics
		    $('#resultList').prepend("<hr><li>Incorrect!<br>Guess #" + guessNum + ": " + inputNum + "<br>" + bullImage + cowImage + "</li>");
		    
	        //increment guess number
	        guessNum ++;
	        
	        //clear for next guess;
	        reset();
	        
	        //re-disable guess button
			$('#guess').attr('disabled','disabled');
			$('#guess').addClass('disabled');
	        
        }
	});
	
/*------ RESTART GAME ------*/	
	//event listener for guess button
	$('#resetButton').on('click', function(){
		//reset game pieces
		reset ();
		
		//new random number
		randomizer ();
		
		//results returns to empty
		$('#resultList').html("");
		
		//guesses returns to 1
		guessNum = 1;
		
		//games played counter
	    gamesPlayed++;
	    
	    //update games played and games won
	    $('#gamesPlayed').html(gamesPlayed);
	    $('#gamesWon').html(gamesWon);
		
	});


/*------  ------*/	
});