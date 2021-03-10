# FP : Monoids and where to find them (code in TypeScript)
# Learning to recognize, create and take advantage of monoids for the greater good

## What the heck is a Monoid  ? 

### Formal definition

Wikipedia tells us that a Monoid is "a set equipped with an associative binary operation and an identity element".

Which means that a Monoid is the following 3 things together : 

- **S**  : a set, like the set of natural numbers, which contains the "counting numbers"
- **•**  : an associative binary operation on two elements of S, returning a new element of S
- **e**  : an element of S neutral (having no effect) under the operation • on both left and right side (such as e • *x* == *x* == *x* • e)

### If that didn't clear things up, These examples will help for sure ! 

The most common examples are the following : 

- Integers (**S**) under addition (**•**), the neutral element being 0 (**e**) : 0 + *x* = *x* = *x* + 0
- Integers (**S**) under multiplication (**•**), the neutral element being 1 (**e**) : 1 * *x* = *x* = *x* * 1
- Lists (**S**) under concatenation (**•**), the neutral element being an empty list (**e**)

```TS
// For character list, the associative binary operation is + (string concatenation) and we have : 

const str : String = "Hello";
const e : String = ""; // empty list of character
const neutralLeft : bool = e + str === e;
const neutralRight : bool = str + e === e;

console.log(neutralLeft && neutralRight); // true

// For arrays, the associative binary operation is the concat method :
// To compare arrays by values, we'll use Ramda's function R.equals

const numArray : Number[] = [1, 2, 3];
const e : Number[] = []; // empty list of numbers
const neutralLeft : bool = R.equals(e.concat(numarray), numArray);
const neutralRight : bool = R.equals(numArray.concat(e), numArray);

console.log(neutralLeft && neutralRight); // true
```

Other useful example of monoids that you've already been using without calling them monoids are : 

- Associative containers (**S**) under union / merge (**•**), the neutral element being an empty container (**e**)

## Why you should care about it ? 

## Real world use case
