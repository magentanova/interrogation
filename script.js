window.SCRIPT = 
	{
		artie: {
			0: {
				hint: 'The Tucker ‘48 is the biggest piece of evidence we have. No one else in three counties drives that car. But how can I prove that they were behind the wheel that night?',
				triggerTokens: ['drives','tucker','48'],
				rotationLines: [
					"i'm wimpy",
					"i'm nervous",
					"i'm privileged"
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
				hint: '',
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
				hint: 'not an empty string',
				triggerTokens: [],
				rotationLines: [
					"hi i'm cool judd"
				],
				advancementLine: ''
			}
		}
	}