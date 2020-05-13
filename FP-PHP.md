# Functional programming in PHP : Why not ?

![PHP illustration](./img/elephant.jpg)


When we talk about functional programming (FP), PHP may not be the first language that comes to mind.
Indeed, we'd rather ear about Haskell, Lisp or Javascript, because these languages better suits the paradigm.
For instance, Wikipedia tells us that Haskell is a "purely functional programming language", as for PHP, it is a "general purpose scripting language".
Nevertheless, PHP provides us everything we need to adopt a functional style and I intend to demonstrate it in this short article. 

## Elements of functional programming in PHP 

### First-class and higher-order functions

In a programming language, functions are "**first-class citizens**" if they are treated as values, which means that you can : 

- pass functions as arguments to other functions
- return them as the values from other functions
- assign them to variable

Functions that can either take other functions as arguments or return them as results are called **higher-order functions**.
With that said, you might realize that PHP does implements these concepts and that you've probably used them alreday with some array functions like `array_map`, `array_filter` or `array_reduce`. Here is a trivial example :
 
 ```PHP
$oneToFive = [1, 2, 3, 4, 5];

$addOne = function($n) { // we assign a function to a variable
    return $n + 1;
};

$twoToSix = array_map($addone, $oneToFive); // we pass a function as parameter to another function

var_dump($twoToSix); // [2, 3, 4, 5, 6]
 ```

### Currying and Partial Application

The fact that PHP has first-class functions allows us to use 2 major FP techniques : Currying and Partial Application. 

There are [plenty](https://towardsdatascience.com/javascript-currying-vs-partial-application-4db5b2442be8) [of](https://medium.com/better-programming/functional-programming-currying-vs-partial-application-53b8b05c73e3) [excellent](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8) articles covering these subjects so I'll be brief : 

- **Currying** : Turning a function with *n* arguments into a sequence of *n* functions with 1 argument .
- **Partial Application** :  Applying some of its arguments to a function and returning a new function awaiting the rest of the arguments.

Below, the illustration of these concepts in PHP. The function `F::partial` takes 2 arguments : a function and a list of parameters to apply to the function, it returns the partial application of the function with the given parameters.

```PHP
use boehm_s\F; // for F::partial

function add($a, $b) { // basic version
    return $a + $b;
}

function addCurry($a) { // curried version
    return function ($b) use ($a) {
        return $a + $b;
    }
}

$addFive = addCurry(5);             // currying helps us to 'specialize' the add function, also we delay invocation
$addFive_ = F::partial('add', [5]); // identical to $addFive, but using partial application to achieve specialization

var_dump($addFive(10));  // 15
var_dump($addFive_(10)); // 15
```

This simple example demonstrate the value offered by currying and partial application : you can produce specialized version of functions, delay the passing of the arguments and dissociate construction from invocation. 
This technique can be seen as an equivalent of the "constructor" pattern and also allows you to perform dependency injection and/or to implement the strategy pattern.


### Pure functions, Referential Transparency and Immutability

Purity is a key concept of functional programming and it can stand in just one line : 

A function (or an expression) is pure when it produces **NO SIDE EFFECTS** (memory or I/O) and when given the same input, will always produce the same output.

Functions (or expressions) are **referentially transparent** when they can be replaced with their corresponding values without changing the program's behavior. So pure functions are always referentially transparent.
For example, our function `add` is obviously pure (no side effects, same input --> same output) and is referentially transparent because we can always replace `add(10, 5)` by `15` without changing our program's behavior.

Since pure functions must not produce side effects, they cannot mutate external state (otherwise they are not pure), so we must favor the use of **immutable data structure** to ensure the purity of our programs.

#### Why all that ? 

> Why purity ? Why should I use immutable data structures ? What can I get from it ?

We cannot have a 100% pure program, at some point we'll perform a HTTP request or write something in DB, but the point is to avoid useless side effects and isolate them because **bugs and undefined behavior occurs within impure code** (eg: HTTP errors, Integrity constraint violation, Null Pointer Exception ...).

Writing pure code and isolating side effects allows us to : 

- improve testability, and thus, spend less time debugging
- use or enable some optimization techniques (inlining, memoization)
- improve safety (the evaluation of any pure expression is thread-safe)

#### On this, PHP is not helping, but we can do it !

Writing pure functions is "up to the developer", PHP doesn't provide anything to explicitly declare pure functions (like `constexpr` or `[[ gnu::const ]]` in C++).

As for immutability, currently, the only way of achieving it in PHP is through encapsulation (`define` doesn't work with objects) : 

```PHP
class Immutable {
    private $value;
    
    public function __construct($value) {
        $this->value = $value;
    }
    
    public function getMyImmutableValue() {
        return $this->value;
    }
    
    // of course, no setter here
}

$myImmutable = new Immutable($myVar);
```

This example is purposely simplistic and thus incomplete. If you want to know more about Immutability in PHP I can only advise you [this series of articles](https://www.simonholywell.com/post/2017/03/php-and-immutability/).

OK, so PHP isn't making it easy for us with immutability, but at least variables are passed by value, so it makes the writing of pure function easier ! 

BUT, when passing objects the value passed to the function is the object's handle (which acts as a reference to the object), so to write pure functions that accepts objects as parameter, you must only read objects and not modify them ! 

And on that too, PHP is not helping, because it includes in his standard library a lot of impure functions ! Below, the example of the `end` function :

```PHP
class MyObj {
    public $myArray;
    
    public function __construct() {
        $this->myArray = [1, 2, 3, 4, 5];
    }
    
    public function printCurrentItem() {
        $currentItem = current($this->myArray);
        echo $currentItem . "\n";
    }
}

function getLastItem($object) {
    return end($object->myArray);
}

$test = new MyObj;

$test->printCurrentItem(); // 1

$lastItem = getLastItem($test);

$test->printCurrentItem(); // 5
```

The function `getLastItem` seems pure : it take an object and just return the last value of the array contained in the object, right ? 

Well, not exactly right, because despite appareances, the `end` function does not only return the last item of an array ! Here's a quote from the docs :

> end() advances array's internal pointer to the last element, and returns its value.

So the `end` function is **impure** : it mutates an external state ! And this nasty little function is not the only one to behave poorly, to cite a few : `[.*]sort`, `next`, `prev`, `array_pop`.

To make the function `getLastItem` pure, we just need to read the last element of the array without moving its internal pointer or causing any side effects : 

``` PHP
function getLastItem($object) {
    return $object->myArray[count($object->myArray) - 1];
}
```

### Function Composition

Now that we understand what purity is, let's enter the world of function composition, starting with a simple Wikipedia quote : 

> In computer science, function composition is an act or mechanism to combine simple functions to build more complicated ones.

With this definition, we understand clearly why side effects are undesirable : you just need one side effect in a function that may be used to build others and your whole program is corrupted !

Composing software is a bit like baking : the tools you use are functions and the ingredients are data.

If you are tired of whisking, you can assemble a whisk to a motor, and you get a hand mixer. This is **function composition**.

Now, say that somehow, you've poorly built your hand mixer and it doesn't just whisks the ingredients that it processes but it also heats them. You've got a **side effect**.

Function composition is essential if you don't want to repeat yourself (DRY), but can you only imagine the shape of your *pièce montée* using poorly built tools (funtions causing side effects) ? 

That's why purity matters, because we want great pastries !

![pièce montée](./img/piece_montee.jpg)


So function composition is the act of combining functions, but how do we do it ? 

If we want to combine two functions, we can do like that : 

```PHP
function compose($f, $g) {
  return function($x) use ($f, $g) { return $f($g($x)); };
}

$array = ['hello', 'world'];

$upperArray = compose('strtoupper', 'implode');

echo $upperArray($array); // HELLOWORLD
```
This is how you compose functions. If you want to compose more than 2 functions together, you'll have to use [a variadic function and a reducer](https://github.com/boehm-s/fun-php/blob/v1.1.2/src/fun.php#L266-L272).

If you're familiar with the CLI (Command Line Interface), this kind of behavior may remind you the pipe operator (`|`) : 

```bash
/home/your_user$ ls -a | head -n 2
.
..
```

Well, the pipe function takes the result of the previous function and feeds it in the next, that's exactly the same as the compose function except that the call order is reversed, which means that `compose($f, $g, $h)` is equivalent to `pipe($h, $g, $f)`. 

If you want to see how `compose` and `pipe` relates, you can see their implementations in the *fun-php* library [here](https://github.com/boehm-s/fun-php/blob/v1.1.2/src/fun.php#L266-L276).

## Conclusion 

PHP is far from being one of my favorite programing languages, but as a general purpose language, it provides just what we need to adopt a functional style. 

That is - of course - not without pain : keeping things pure while working with object is complicated. 

Therefore, I would advise to work as much as possible with simple data structure such as associative arrays and manipulate them with little pure functions that you can compose to create more sophisticated ones. 

Fortunatly, working with associative arrays is how I spend half of my time (at least) with PHP and I bet I'm not the only one ! 

That's why I've developed [*fun-php*](https://github.com/boehm-s/fun-php) : a bunch of little FP utilities for PHP.

I hope it can benefit others, who (like me) come from the JS world and miss the excellent [Ramda library](https://ramdajs.com/) !


