# What's in the Box? - Party Game Web App

A web-based gameshow app for playing "What's in the Box?" at parties. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Team Setup**: Configure 2-6 teams with custom names
- **5 Regular Boxes**: Tennis, Makeup, Dogs, Cooking Appliances, Singing
- **Super Box**: Unlocked after 2 boxes are won
- **Game Flow**:
  - Numerical trivia questions to determine which team competes
  - Ordering questions to earn turns (1-3 turns based on accuracy)
  - Number grid reveal (15 numbers in pyramid layout)
  - 3-word phrase guessing to win boxes
- **Wildcards** (9 per box):
  - WHO'S NEXT (x3) - Pass control to next team
  - EXTRA TURN - Gain an additional turn
  - REMOVE DECOY - Remove a decoy from the grid
  - STEAL - Take a box from another team (rare)
  - FREEZE OUT - Prevent a team from competing (rare)
  - PRIZE PASS - Move a box between teams (rare)
  - PRIZE FIGHT - Challenge another team for control (rare)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Game Rules

1. **Setup**: Enter number of teams (2-6) and team names
2. **Numerical Question**: All teams guess a number. Closest team wins control
3. **Ordering Question**: Winning team orders 4 items. Earns 1-3 turns based on accuracy
4. **Reveal Phase**: Click numbers to reveal words, decoys, or wildcards
5. **Win Condition**: Select the correct 3-word phrase to win the box
6. **Super Box**: Top 2 teams compete for the super box after regular boxes are won

## Technical Details

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/       # UI components for each screen
├── context/          # Game state management
├── data/            # Hardcoded questions and box data
├── types/           # TypeScript type definitions
└── utils/           # Helper functions (grid generation)
```

## Customization

To customize boxes, questions, or phrases, edit `src/data/gameData.ts`:

- `numericalQuestions`: 10 numerical trivia questions
- `orderingQuestions`: 20 ordering questions
- `boxes`: 5 box categories with phrases, decoys, and wildcards
- `superbox`: Super box configuration
