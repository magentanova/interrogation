window.SCRIPT = 
	{
		artie: {
			0: {
				hint: 'The Tucker ‘48 is the biggest piece of evidence we have. No one else in three counties drives that car. But how can I prove that they were behind the wheel that night?',
				triggerTokens: ['drives','tucker','48'],
				rotationLines: [
					"I don't have anything to say about __NOUN__. I just stay focused on my studies. Like I told you.",
				],
				advancementLine: 'I don’t know much about cars, though the name does sound familiar.'
			},
			1: {
				hint: 'Ok, kid. Game on.',
				triggerTokens: ['you','drives'],
				rotationLines: [
					"i'm wimpy",
					"i'm nervous",
					"i'm privileged"
				],
				advancementLine: 'I have never been allowed behind the wheel of a vehicle.'
			},
			2: {
				hint: 'Ok, kid. Game on.',
				triggerTokens: ['you','drives'],
				rotationLines: [
					"i'm wimpy",
					"i'm nervous",
					"i'm privileged"
				],
				advancementLine: 'I have never been allowed behind the wheel of a vehicle.'
			}
		},
		judd: {
			'0': {
				hint: "Judd over there is still as a stone, but Artie hasn't quit twisting his fingers since we sat him down. He should be easy to crack.",
				triggerTokens: [],
				rotationLines: [
					"hi i'm cool judd"
				],
				advancementLine: ''
			}
		}
	}