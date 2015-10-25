window.onload = function(){

	// GLOBAL VARS
	ENTER_CODE = 13
	LEVELS = {
		artie: localStorage.artieLevel ? localStorage.artieLevel : 0,
		judd: localStorage.juddLevel ? localStorage.juddLevel : 0
	}	

	// UTILITY FUNCTIONS

	// EVENT HANDLERS
	var chatSubmissionHandler = function(e){
		if (e.keyCode === ENTER_CODE) {
			var charName = e.target.id,
			response = theScript[charName][LEVELS[charName]].rotationLines[0],
			responseEl = document.createElement('li')
		responseEl.innerHTML = response
		console.log(charName)
		$('ul#' + charName).append(responseEl)
		console.log(response)
		window.responseEl = responseEl
		}
	}

	$('input').keypress(chatSubmissionHandler)
}