# StringThing

StringThing is a lightweight library for encoding and decoding strings using various patterns.

## Installation

```sh
npm install string-thing
```

## Usage

StringThing provides an API for encoding and decoding strings. To use it, import the StringThing class and create a new instance with an array of patterns in the order you want to use them:

```javascript
import { StringThing } from 'string-thing';

const myString = 'This is my string';

// Create a new instance of StringThing with default pattern (['split-halves', 'reverse', 'shift', 'swap-case', 'rotate'])
const myStringThing = new StringThing();

// Encode the string
const encoded = myStringThing.encode(myString);

// Output the encoded string
console.log(encoded); // "ZN!TJ!TJIuHOJSUT!"

// Decode the string
const decoded = myStringThing.decode(encoded);

// Output the decoded string
console.log(decoded); // "This is my string"
```

## Patterns

StringThing patterns currently support the following operations:

- `split-halves`: Splits the string into two halves and swaps them.
  - `Abcd12` => `d12Abc`
- `reverse`: Reverses the order of the characters in the string.
	- `Abcd12` => `21dcbA`
- `shift`: Shifts the characters in the string up by 1 in the ASCII table.
	- `Abcd12` => `Bcde23`
- `swap-case`: Swaps uppercase & lowercase characters in the string.
	- `Abcd12` => `aBCD12`
- `rotate`:  Shifts the string 1 position to the right.
	- `Abcd12` => `2Abcd1`

To use a specific pattern, pass it as an argument to the StringThing constructor:

```typescript
import { StringThing, PatternOp } from 'string-thing';

const myStringThing1 = new StringThing(['split-halves', 'shift', 'reverse', 'shift', 'swap-case', 'rotate']);

// OR

const stringThingPattern: PatternOp[] = ['split-halves', 'shift', 'reverse', 'shift', 'swap-case', 'rotate'];
const myStringThing2 = new StringThing(stringThingPattern);
```

## Example: Encoding Passwords for Secure Storage

StringThing can be used to encode passwords before hashing them and storing them in a database, making it more difficult for an attacker to retrieve the original password even if they gain access to the database.

Here's an example of how to use StringThing to encode a password before hashing it with bcrypt when working with passwords in a database:

#### Create User:

```typescript
import bcrypt from 'bcrypt';
import { StringThing } from 'string-thing';

import { stringThingPattern } from './secrets'; // export const stringThingPattern: PatternOp[] = ['split-halves', 'shift', 'reverse', 'shift', 'swap-case', 'rotate'];

// Generate a salt for the bcrypt hash
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);

// The original password to be encoded and hashed
const password = 'myPassword123';

// Encode the password using StringThing
const encodedPassword = (new StringThing(stringThingPattern)).encode(password);

// Hash the encoded password with bcrypt
const hashedPassword = await bcrypt.hash(encodedPassword, salt);

// Add the hashed password and salt to a user object for storage in a database
const user = {
  username: 'johndoe',
  email: 'johndoe@example.com',
  password: hashedPassword,
  salt: salt,
  // other user data...
};

// Add the user object to the database
await myDatabase.addUser(user);
```

#### Authenticate User:

```typescript
import bcrypt from 'bcrypt';
import { StringThing } from 'string-thing';

import { stringThingPattern } from './secrets'; // export const stringThingPattern: PatternOp[] = ['split-halves', 'shift', 'reverse', 'shift', 'swap-case', 'rotate'];

// Retrieve the user's hashed password and salt from the database
const user = await myDatabase.getUserByUsername('johndoe');
const hashedPassword = user.password;
const salt = user.salt;

// The password entered by the user attempting to log in
const passwordAttempt = 'myPassword123';

// Encode the password attempt using StringThing
const encodedPasswordAttempt = (new StringThing(stringThingPattern)).encode(passwordAttempt);

// Hash the encoded password attempt with bcrypt using the stored salt
const hashedPasswordAttempt = await bcrypt.hash(encodedPasswordAttempt, salt);

// Compare the hashed password attempt to the stored hashed password
if (hashedPasswordAttempt === hashedPassword) {
  // Passwords match - login successful!
} else {
  // Passwords do not match - login failed
}
```
