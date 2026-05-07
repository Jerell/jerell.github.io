---
date: 2025-09-08
tags: [zig]
title: dim - Dimensional analysis
---

[dim](https://github.com/Jerell/dim) is a dimensional analysis and unit conversion library for Zig, with an optional CLI tool for quick calculations.

I was inspired by the syntax used in Julia by Unitful and DynamicQuantities, where you can define a quantity by simply writing the value and its unit string.

```jl
0.2u"m/s"
```

This felt much better than an approach I had used at work, where we had to use the constructor for the type of quantity we want to create and then also specify the unit

```js
new Speed(0.2, SpeedUnits.MetersPerSecond)
```

It _is_ useful to know the type of quantity, so you can make sure you only do valid operations with your values, but that can be determined by the unit string.

Having a constructor for every type of quantity and an enum for all the units for that quantity feels bad.

I think a better approach is to use [base units](https://en.wikipedia.org/wiki/SI_base_unit) and define how they interact. I defined the [dimensions](https://github.com/Jerell/dim/blob/main/src/dimension.zig) for the base quantities and common derived quantities and also [how these dimensions are combined](https://github.com/Jerell/dim/blob/ba0d2140478e49e5860ec56281ee68fa20c084ee/src/quantity.zig#L130) when you add/subtract/multiply/divide quantities.

Knowing that an area has a dimension of `L=2` and a length has `L=1` means you can add the dimensions together when you multiply them to produce a volume with `L=3`.

This means that you don't need to explicitly write code for each operation on two quantities: a distance divided by a time will produce a speed; a force divided by an area will produce a pressure.

And every possible combination of units works. I don't need to know the distance in meters and the time in seconds so I can use the `Speed` constructor with the `SpeedUnits.MetersPerSecond` enum. I can create a speed by using the unit string `"yd/h"` if I need to.
