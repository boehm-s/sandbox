# FP : Monoids and where to find them (code in TypeScript)
# Learning to recognize, create and take advantage of monoids for the greater good

## What the heck is a Monoid  ? 

### Formal definition

Wikipedia tells us that a Monoid is "a set equipped with an associative binary operation and an identity element".

Which means that a Monoid is the following 3 things together : 

- **S**  : a set, like the set of natural numbers, which contains the "counting numbers"
- **•**  : an [associative](https://en.wikipedia.org/wiki/Associative_property) binary operation on two elements of S, returning a new element of S (such as *(x • y) • z == x • (y • z)* )
- **e**  : an element of S neutral (having no effect) under the operation • on both left and right side (such as e • *x* == *x* == *x* • e)

### If that didn't clear things up, let's see some examples

You can read the table below like that : "**S** form a Monoid under **•** with **e** as neutral element".<br/>
> **Integers** form a Monoid under **addition** with **0** as neutral element ... 

| **S**                  | **•**            | **e**                  | *example of identity*                     | *example of associativity*                                                    |
|------------------------|------------------|------------------------|-------------------------------------------|-------------------------------------------------------------------------------|
| Integers               | *addition*       | `0`                    | `42 + 0 === 42 && 42 === 0 + 42`          | `(4 + 8) + 15 === 4 + (8 + 15)`                                               |
| Integers               | *multiplication* | `1`                    | `42 * 1 === 42 && 42 === 1 * 42`          | `(4 * 8) * 15 === 4 * (8 * 15)`                                               |
| Lists                  | *concatenation*  | `[]` (empty list)      | `[4, 8].concat([])` ⇔ `[].concat([4, 8])` | `[4].concat([8, 15].concat([16]))` ⇔ `[4].concat([8, 15]).concat([16])`       |
| Associative containers | *merge*          | `{}` (empty container) | `{...{}, foo: 4}` ⇔ `{foo: 4, ...{}}`     | `{foo: 4, ...{bar: 8, ...{baz: 15}}}` ⇔ `{foo: 4, ...{bar: 8}, ...{baz: 15}}` |

By now, you should have realized that Monoids are pretty much everywhere, but before diving into the core of the concept, 
let's write a little piece of code to illustrate what we're talking about :

```TS
// For strings (character list), the associative binary operation is + (string concatenation) and we have : 

const str : string = "Hello";
const e   : string = "";      // empty list of character
e + str === e;                // => true (neutral on the left side)
str + e === e;                // => true (neutral on the right side)

(str + " ") + "world" === str + (" " + "world") // => true (associativity)

// For arrays, the associative binary operation is the concat method :
// To compare arrays by values, we'll use Ramda's function R.equals

const numArray : number[] = [1, 2, 3];
const e        : number[] = [];           // empty list of numbers
R.equals(e.concat(numarray), numArray);   // => true (neutral on the left side)
R.equals(numArray.concat(e), numArray);   // => true (neutral on the right side)
```

### The Monoid Interface

Now that we know what makes a Monoid (the associative binary operation and the identity),
we can turn that into code by creating an interface :

```TS
// T is the 'Set' we're working with
interface Monoid<T> {
  op: (x: T, y: T) => T
  id: T
}
```

> This interface is purposely simplistic and if you intend to bring functional programming to your projects, you should consider using appropriate tools such as the excellent [fp-ts library](https://github.com/gcanti/fp-ts) !

It's a very small and simple interface for a very simple yet powerful concept ! 
Now, let's rewrite the list concatenation Monoid using this interface :

```TS
const monoidNumArray : Monoid<number[]> = {
  op(x: number[], y: number[]) : number[] {
    return x.concat(y);
  },
  id: []
}

const ex1 = [4, 8, 15];
const ex2 = [16, 23, 42];

monoidNumArray.op(ex1, ex2); // => [4, 8, 15, 16, 23, 42]
monoidNumArray.op(monoidNumArray.id, ex1); //  => [4, 8, 15] (left identity)
monoidNumArray.op(ex1, monoidNumArray.id); //  => [4, 8, 15] (right identity)
```

Wonderful ! We know what monoids are and how to create new ones, but why ? Why should we go to the 
trouble of creating new monoids and using this kind of interface for just concatenating arrays or merging objects ?

## Why you should care about it ? 

Because monoids allows us to abstract complex behaviors out of simple pieces, and that's what we're going to see !

### Reducing

Since this is a JS/TS article, I assume that the reader is familiar with [the reduce function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

Using a reducer on a monoid allows us to **generalize a pairwise operation to an infinite number of items** (the monoid operation)

### Parallelization

### Incremental accumulation

## Real world examples
