# Using Reflection for tailored function composition
# An example with a re-implementation of `array_map` in PHP

## The initial problem

There are plenty of reasons why one would want to re-implement the `array_map` function. Mine is that I want it to be curried and to behave a bit more like the JS `Array#map` method.

In the original version of `array_map`, if I want the keys of my array passed to the callback function, I have to pass the keys as additional (third) argument. 

And if I want to use the array in the callback function, I'll have to bring it in the closure with the `use` statement, which can lead to impure code if I pass the array by reference and modify it.

```PHP
$a = [1, 2, 3, 4, 5];
$a_keys = array_keys($a);

$b = array_map(function ($value, $index) use (&$a) {
  // deal with our values and their indexes
  // if I change $a, my function will be impure since $a is passed by reference
}, $a, $a_keys);
```

So, what we want is an implementation of the map function that is simplier to use and always pass our array by value. We'll call this function `_map` : 

```PHP
function _map(Callable $fn, iterable $array) {
    $result = [];

    foreach ($array as $key => $value) {
        $result[] = $fn($value, $key, $array);
    }

    return $result;
}
```

That's better, now we don't have to pass the keys of our array as parameter to the map function and we have a copy of our array as third argument : 

```PHP
$b = _map(function ($value, $index, $array) {
  // Now it looks like the JS version :)
}, $a);
```

Now, let's try that with a simple function : `strtoupper` : 

```PHP
$names = ['Bob', 'Alice', 'Eve'];
$upperNames = _map('strtoupper', $names);
```

We expect `$upperNames` to contain the uppercased names (`['BOB', 'ALICE', 'EVE']`), but instead, here's what we got : 

```
Warning :  strtoupper() expects exactly 1 parameter, 3 given
```

Of course, that's not difficult to fix. We could come up with the following solution, just passing to the `strtoupper` function what it needs : 

```PHP
$upperNames = _map(function($value /*, $index, $array*/) {
    return strtoupper($value);
}, $names);
```

But that's not very handy, and quite wordy also. We don't want to create a new closure each time we want to pass less than 3 parameters to our mapping function. 

Instead we'd rather pass to our mapping function exactly the number of arguments it expects and that's where Reflection come into play !

## What is Reflection and how can it help ? 

Let's start with a simple Wikipedia quote : 

> In computer science, reflection is the ability of a process to examine, introspect, and modify its own structure and behavior. 

What it means for us is that we can have some informations about our variables / functions / classes at runtime. For instance, we can have a list of methods from a class, or a function's parameters : 

```PHP
$functionReflection = new ReflectionFunction('implode');
$parameters = $functionReflection->getParameters();

var_dump($parameters);

// array(2) {
//   [0]=>
//   object(ReflectionParameter)#2 (1) {
//     ["name"]=>
//     string(4) "glue"
//   }
//   [1]=>
//   object(ReflectionParameter)#3 (1) {
//     ["name"]=>
//     string(6) "pieces"
//   }
// }
```

Here, we've learned (at runtime) that the `implode` function takes 2 parameters : one named "glue" and another one named "pieces". 

You may now see how reflection can help us solve our problem ! Reflection allows us to know how many parameters a function expects, in other words, we can determine a function's [**arity**](https://en.wikipedia.org/wiki/Arity) !

And if we know our function's arity, then we can give it exactly the number of arguments it expects ! OK, let's put all that words into code : 

```PHP
function _arity(Callable $fn) {
    $reflection = new ReflectionFunction($fn);
    $arguments = $reflection->getParameters();

    return count($arguments);
}

function _map(Callable $fn, iterable $array) {
    $result = [];
    $fnArity = _arity($fn);

    foreach ($array as $key => $value) {
        $args = [$value, $key, $array];
        $tailoredArgs = array_slice($args, 0, $fnArity);

        $result[] = $fn(...$tailoredArgs); // we onloy pass to our mapping function the arguments it needs
    }

    return $result;
}
```

map merge example ?
