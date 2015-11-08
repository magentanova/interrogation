window.onload = function(){

	window.nlp = nlp
	window.jquery = $

	// CHECK LOCAL STORAGE FOR CACHED DATA
	if (!localStorage.artieLevel){
		localStorage.artieLevel = 0
	} 
	if (!localStorage.juddLevel){
		localStorage.juddLevel = 0
	} 	// note: SCRIPT will store the static, unchanging script for the game. localStorage will store the current STATE of the game. variable names will sometimes look similar, but don't be confused.
	localStorage.artieLevel = 0
	localStorage.juddLevel = 0

	// GLOBAL VARS
	var crackActual = { 
			artie: $('.crackActual#artie'),
			judd: $('.crackActual#judd')
		},
		ENTER_CODE = 13,
		INCREMENTS = {
			artie: $('.crackTracker').width() / Object.keys(SCRIPT.artie).length,
			judd: $('.crackTracker').width() / Object.keys(SCRIPT.judd).length
		} // how much to expand the circle of "crackedness" with each correct entry

	// UTILITY FUNCTIONS
	Array.prototype.contains = function(el){
		return this.indexOf(el) !== -1
	}

	Array.prototype.choice = function(){
		return this[randInRange(0,this.length - 1)]
	}

	Node.prototype.clearChildren = function() {
		// remove all event listeners on each child as well
		while (this.firstChild){
			this.removeChild(this.firstChild)
		}
	}

	String.prototype.contains = function(subStr){
		return this.indexOf(subStr) !== -1
	}

	var getRotationLine = function(inputStr,levelData){
		var line = levelData['rotationLines'].choice(),
			nouns = nlp.pos(inputStr).nouns().filter(function(noun){
				return !['PRP','PP'].contains(noun.pos.tag)
			}) // don't include pronouns
		if (nouns.length) {
			console.log(nouns)
			var noun = nlp.noun(nouns.choice().normalised).pluralize() // pluralize a random noun from the list
			line = line.replace("__NOUN__",noun)
		}
		else line = line.replace("__NOUN__","that")
		return line
	}

	var getResponse = function(inputStr,charName) {
		var thisLevel = localStorage[charName + 'Level']
			levelData = SCRIPT[charName][thisLevel]
		if (inputIsPersuasive(inputStr,charName)) {
			updateLevel(charName) // update localStorage and expand red circle
			return levelData['advancementLine']
		}
		else {
			return getRotationLine(inputStr,levelData)
		}
	}

	var randInRange = function(low,high){
		return Math.round(low + Math.random() * (high - low)) 
	}

	var replaceHint = function(node,newHint){
		p = $('<p class="hintText">' + newHint + '</p>').css({opacity:0})
		node.clearChildren()
		node.appendChild(p[0])
		p.animate({opacity:1},1000)
	}

	var toSingular = function(inputStr) {
		var nouns = nlp.pos(inputStr).nouns()
		nouns.forEach(function(noun){
			var singular = nlp.noun(noun.text).singularize() // yes, that's the best way this api will allow this to happen
			inputStr = inputStr.replace(noun.text,singular)
		})
		return inputStr
	}

	var toPresent = function(inputStr) {
		var verbs = nlp.pos(inputStr).verbs()
		verbs.forEach(function(verb){
			var present = nlp.verb(verb.text).to_present() // yes, that's the best way this api will allow this to happen
			inputStr = inputStr.replace(verb.text,present)
		})
		return inputStr
	}

	var updateLevel = function(charName) {
		localStorage[charName + 'Level'] = parseInt(localStorage[charName + 'Level'] + 1)
		var currentWidth = parseInt(crackActual[charName].css('width')),
			currentWidth = currentWidth + INCREMENTS[charName]
		crackActual[charName].css({width: currentWidth + 'px',height: currentWidth + 'px'})
		console.log(INCREMENTS[charName])
	}

	var inputIsPersuasive = function(inputStr,charName){
		var thisLevel = localStorage[charName + 'Level']
		window.script = SCRIPT[charName]
		console.log(thisLevel)
		var	triggerTokens = SCRIPT[charName][thisLevel]['triggerTokens']
		normalStr = toSingular(toPresent(inputStr)),
		tokenObjs = nlp.tokenize(normalStr)[0].tokens
		inputTokens = tokenObjs.map(function(obj){return obj.normalised})
		var found = true
		triggerTokens.forEach(function(trigger){
			if (!inputTokens.contains(trigger)) {
				found = false
			}
		})
		return found
	}

	// EVENT HANDLERS
	var chatSubmissionHandler = function(e){
		if (e.keyCode === ENTER_CODE) {
			var charName = e.target.id,
			ulEl = $('ul#' + charName),
			inputStr = e.target.value,
			response = getResponse(inputStr,charName),
			responseEl = document.createElement('li')
		responseEl.innerHTML = response
		ulEl.append(responseEl)
		ulEl.scrollTop(ulEl.prop('scrollHeight')) // scroll to bottom of window, like in a chat interface
		e.currentTarget.value = ''
		}
	}

	var showHint = function(e) {
		var box = e.currentTarget
			hintArtie = SCRIPT['artie'][localStorage.artieLevel]['hint'],
			hintJudd = SCRIPT['judd'][localStorage.juddLevel]['hint'],
			newHint = [hintArtie,hintJudd].choice(),
			prompt = "Click to see what you're thinking."	
		replaceHint(box,newHint)
		setTimeout(function(){replaceHint(box,prompt)},10000) // hint fades away after 10s
	}

	$('input').keypress(chatSubmissionHandler)
	$('#hintBox').click(showHint)
}