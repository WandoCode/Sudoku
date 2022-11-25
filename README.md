# Sudoku

[This repository](https://github.com/WandoCode/Sudoku) contains the code for this [Sudoku website](https://sudoku-66b36.web.app/).

It is a fully functional Sudoku game, playable on desktop or mobile.

The main goal of that website is to showoff some of my frontend development skills.

It's build with **vanilla Javascript** and **Webpack** and tested with **Vitest**.

## Hightlighted skills in this project

### Technologies

- DOM manipulation
- Webpack
- CSS

For testing:

- Vitest
- JSDOM
- Testing Library

Hosted on Firebase.

#### Test

Each part of the code has been tested with (mostly) unit test.

### Main features

- Finish your game later (persistence)
- Build a new grid on demand
- Difficulty can be changed
- Errors are displayed on demand
- Hints are given on demand

### Responsive

The website works on desktop (last version of Chromimum or Firefox).

The website works on smartphones (last version of Chromimum or Firefox)

### Design

The design will be improved later.

I was inspired widely by styles I found on internet.

# How to install

## Prerequisites

- nodeJS v16.14.2 or better

## Setup

- Just install dependencies with `npm install`

# Dependencies

## Webpack

Webpack was used for development and to bundle the project before production.

It use the :

- 'Hot Module Replacement' for live reload on file change
- 'MiniCssExtractPlugin' to bundle the CSS in a separate file
- 'HtmlWebpackPlugin' to use a custom index.HTML file during build

# Script

- `start:dev` : launch the developpment server with reload on file change.
- `watch`: rebuild the website (in `./dist`) on file change.
- `build`: build once (in `./dist`).
- `test`: run all tests.
- `coverage`: run all test and display test coverage.

# Licence

This website has been build for demonstration purpose only.

All the content is published under the MIT licence (see '[/licence.txt]()')
