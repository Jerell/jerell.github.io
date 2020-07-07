---
layout: post
title: EPQ - Sudoku Solver
---

## Context

For my Extended Project Qualification during my time at college, I decided to design and build a system that would solve sudoku puzzles.

At the time, I had a decent amount of experience with HTML, CSS and JavaScript, through my own independent studies and projects and the reinforcement I got during GCSE ICT, but I hadn't attempted anything quite as ambitious as this.

## Approach

The basic idea was to create a web based interface to capture the state of the puzzle as an input and write an algorithm that would process the grid, eliminate options wherever possible, and loop until the final state was found.

I started by scaling the problem down and working with a 4x4 puzzle, designing my functions in such a way that they could process grids of any size. A 4x4 puzzle only has 16 cells compared to a 9x9's 81, so the initial exploration and testing was faster and easier to carry out where I was doing things by hand.

I assigned numbers to each cell and tried to identify the various entities that comprised the puzzle.

### Grid

If `n` is the size of the puzzle, the maximum cell value, a grid is simply an array of `n * n` cells.

### Row

A row is a list of `n` consecutive cells starting from cell `(row number - 1) * n`.

### Column

A column is a list of every `n`th cell starting from cell `column number`

### Block

A block, being one of the smaller square areas 