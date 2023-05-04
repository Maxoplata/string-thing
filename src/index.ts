export type PatternOp = 'split-halves' | 'reverse' | 'shift' | 'swap-case' | 'rotate';

const shiftString = (text: string, shift = 1) => {
	const chars = [...Array(95)].map((_, i) => String.fromCharCode(i + 32));
	const charsMaxIndex = chars.length - 1;

	return text
		.split('')
		.map(char => {
			const index = chars.indexOf(char);

			if (index !== -1) {
				const newIndex = index + shift;

				if (newIndex > charsMaxIndex) {
					return chars[newIndex - charsMaxIndex - 1];
				} else if (newIndex < 0) {
					return chars[charsMaxIndex + newIndex + 1];
				}

				return chars[newIndex];
			}

			return char;
		})
		.join('');
};

const patternOpMap: { [P in PatternOp]: `${number}` } = {
	'split-halves': '0',
	reverse: '1',
	shift: '2',
	'swap-case': '3',
	rotate: '4',
};

const opFunctionMap: {
	[P in PatternOp]: (text: string, decode: boolean) => string;
} = {
	'split-halves': (text: string, decode = false) => `${text.slice(decode ? Math.floor(text.length / 2) : Math.ceil(text.length / 2))}${text.slice(0, decode ? Math.floor(text.length / 2) : Math.ceil(text.length / 2))}`,
	reverse: (text: string, _) => text.split('').reverse().join(''),
	shift: (text: string, decode = false) => shiftString(text, !decode ? 1 : -1),
	'swap-case': (text: string, _) => text.split('').map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''),
	rotate: (text: string, decode = false) => decode ? `${text.slice(1)}${text.slice(0, 1)}` : `${text.slice(-1)}${text.slice(0, -1)}`,
};

const errorChecks = [
	{
		description: "Using 'split-halves' back-to-back results in the original string",
		match: '00',
	},
	{
		description: "Using 'reverse' back-to-back results in the original string",
		match: '11',
	},
	{
		description: "Using 'shift' 95 times results in the original string. Using 'shift' more than 95 times is the same as using using it X - 95 times.",
		match: '2'.repeat(95),
	},
	{
		description: "Using 'swap-case' back-to-back results in the original string",
		match: '33',
	},
];

export class StringThing {
	pattern: PatternOp[];

	constructor(pattern: PatternOp[] = ['split-halves', 'reverse', 'shift', 'swap-case', 'rotate']) {
		const patternString = pattern.map(op => patternOpMap[op]).join('');

		errorChecks.forEach(error => {
			if (patternString.match(error.match)) {
				throw new Error(`Error: ${error.description}`);
			}
		});

		this.pattern = pattern;
	}

	encode(text: string): string {
		return this.pattern.reduce(
			(newText, op) => (opFunctionMap[op]?.(newText, false) || newText),
			text,
		);
	}

	decode(text: string): string {
		return this.pattern.reverse().reduce(
			(newText, op) => (opFunctionMap[op]?.(newText, true) || newText),
			text,
		);
	}
}
