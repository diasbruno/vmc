# VMC (NOT A BENCHMARK)

Visualizing memory consumption of some coding
recommendations styles in javascript.

We could just state the obvios, but that would be boring...

So let's try to gather some numbers just to pretend we
are doing engineering...

It's common that people see some neat trick
and try to replicate or say that it's the *right*
(*elegante*) way to do something (that also includes me).

But, it's very easy to forget what is going on
on some algoritms, and often people blame
the others - it's the browser or the framework (lib),
or the GC...and never a developer's fault.

In this repository, we are going to investigate
who memory is comsumed if we consider this tricks the
*right* way.

Keep in mind that the amound of memory is not the point,
but how it grows...also, every case assumes we are hitting
the worst case.`

## The setup

We are going to run some examples a million times
(kinda simulating that this pattern/code/style is replicate
in more than just our test function). Each run will be started
in a setInterval executed every 250ms, 500ms and 1s (so maybe it will have leftovers
to run after a GC is triggered - pretend it's a "heave load").

In this setup, imagine that we are not just running our code,
but third-party code, libraries and framework, everybody using
the same tricks...


## Table of contents

1. [If related stuff](https://github.com/diasbruno/vmc/blob/master/01.md)
2. [Conditional destructuring assignment](https://github.com/diasbruno/vmc/blob/master/02.md)
