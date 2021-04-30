# FP : Monoids and where to find them (code in TypeScript)
# Learning to recognize, create and take advantage of monoids for the greater good

## What the heck is a Monoid  ? 

### Formal definition

Wikipedia tells us that a Monoid is "a set equipped with an associative binary operation and an identity element".

Which means that a Monoid is the following 3 things together : 

- **S**  : a set, like the set of natural numbers, which contains the "counting numbers"
- **•**  : an associative binary operation on two elements of S, returning a new element of S
- **e**  : an element of S neutral (having no effect) under the operation • on both left and right side (such as e • *x* == *x* == *x* • e)

### If that didn't clear things up, examples will help !

The most common examples of Monoids are displayed in the table below.

You can read the table like that : **S** form a Monoid under **•** with **e** as neutral element,

So **Inegers** form a Monoid under **addition** with **0** as neutral element ... 

| **S**                  |  **•**           | **e**                  | *example (identity)*                      |
|------------------------|------------------|------------------------|-------------------------------------------|
| Integers               | *addition*       | `0`                    | `42 + 0 === 42 && 42 === 0 + 42`          |
| Integers               | *multiplication* | `1`                    | `42 * 1 === 42 && 42 === 1 * 42`          |
| Lists                  | *concatenation*  | `[]` (empty list)      | `[4, 8].concat([])` ⇔ `[].concat([4, 8])` |
| Associative containers | *merge*          | `{}` (empty container) | `{...{}, foo: 42}` ⇔ `{foo: 42, ...{}}`   |

By now, you should have realized that Monoids are pretty much everywhere, but before diving into the core of the concept, 
let's write a little piece of code to illustrate what we're talking about :

```TS
// For character list, the associative binary operation is + (string concatenation) and we have : 

const str : String = "Hello";
const e   : String = "";      // empty list of character
e + str === e;                // => true (neutral on the left side)
str + e === e;                // => true (neutral on the right side)


// For arrays, the associative binary operation is the concat method :
// To compare arrays by values, we'll use Ramda's function R.equals

const numArray : Number[] = [1, 2, 3];
const e        : Number[] = [];           // empty list of numbers
R.equals(e.concat(numarray), numArray);   // => true (neutral on the left side)
R.equals(numArray.concat(e), numArray);   // => true (neutral on the right side)
```

### The Monoid Interface

Now that we know what makes a Monoid, the rules a set have to obey to form a Monoid (the associative binary operation and the identity), 
we can turn that into code by creating an interface :

```TS
interface Monoid<T> {
  op: (x: T, y: T) => T
  id: T
}
```

## Why you should care about it ? 

## Real world use case
