import { StringThing } from '../index';

const myString = 'This is my string';

test('Default Pattern', () => {
	const myStringThing = new StringThing();
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('ZN!TJ!TJIuHOJSUT!');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

test('split-halves', () => {
	const myStringThing = new StringThing(['split-halves']);
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('y stringThis is m');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

test('reverse', () => {
	const myStringThing = new StringThing(['reverse']);
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('gnirts ym si sihT');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

test('shift', () => {
	const myStringThing = new StringThing(['shift']);
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('Uijt!jt!nz!tusjoh');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

test('swap-case', () => {
	const myStringThing = new StringThing(['swap-case']);
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('tHIS IS MY STRING');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

test('rotate', () => {
	const myStringThing = new StringThing(['rotate']);
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('gThis is my strin');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

test('shift, shift', () => {
	const myStringThing = new StringThing(['shift', 'shift']);
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('Vjku"ku"o{"uvtkpi');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

test('rotate, rotate', () => {
	const myStringThing = new StringThing(['rotate', 'rotate']);
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('ngThis is my stri');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

test('shift, split-halves, shift, reverse, shift, swap-case, rotate', () => {
	const myStringThing = new StringThing(['shift', 'split-halves', 'shift', 'reverse', 'shift', 'swap-case', 'rotate']);
	const encoded = myStringThing.encode(myString);

	expect(encoded).toBe('|P#VL#VLKwJQLUWV#');
	expect(myStringThing.decode(encoded)).toBe(myString);
});

// Errors

test('split-halves, split-halves', () => {
	expect(() => {
		const _ = new StringThing(['split-halves', 'split-halves']);
	}).toThrow(Error);
});

test('reverse, reverse', () => {
	expect(() => {
		const _ = new StringThing(['reverse', 'reverse']);
	}).toThrow(Error);
});

test('shift x95+', () => {
	expect(() => {
		const _ = new StringThing(Array(95).fill('shift'));
	}).toThrow(Error);
});

test('swap-case, swap-case', () => {
	expect(() => {
		const _ = new StringThing(['swap-case', 'swap-case']);
	}).toThrow(Error);
});
