# Tasks

## v1: Core game
- [x] 1. Write all planning docs
- [x] 2. Create `index.html` skeleton
- [x] 3. Style board and discs in `style.css`
- [x] 4. Create state, `init()` and `render()`
- [x] 5. Implement `dropDisc()` with gravity
- [x] 6. Implement win and draw checks
- [x] 7. Add restart button and status text
- [x] 8. Highlight winning discs
- [x] 9. Manual test
- [x] 10. Push to GitHub and deploy on Vercel

## v2: Upgrades
- [x] 11. Add score counter (`scores` object, shown above the board)
- [x] 12. Add hover preview (`updateGhost()`)
- [x] 13. Add drop animation (CSS keyframes + `--drop` variable)
- [x] 14. Add mode selector in `index.html`
- [x] 15. Add Easy AI (random column)
- [x] 16. Add Hard AI (minimax + alpha-beta, heuristic scoring)
- [ ] 17. Manual test v2 (below)
- [ ] 18. Push and confirm Vercel redeploys

## v2 Manual Tests
- Hover over each column: faded disc appears in the lowest empty spot
- Discs visibly fall when placed
- Win a round: score increases, Restart keeps the score
- Switch mode: score resets
- Easy AI plays random moves; Hard AI blocks your three-in-a-row and takes its own wins
- Clicking during "Computer is thinking..." does nothing

## v3: Polish and effects
- [x] 19. Restyle with CSS variables and 3 themes
- [x] 20. Glossy discs, glowing board, landing bounce
- [x] 21. Sound effects with Web Audio (`tone()`, `sfx`)
- [x] 22. Mute button and theme button (saved with localStorage)
- [x] 23. Confetti on win (`confetti()` on a canvas)
- [ ] 24. Manual test v3: try all themes, mute and unmute, win by each player, phone screen
- [ ] 25. Push and confirm Vercel redeploys

## v4: Game Hub
- [x] 26. Restructure into `games/` and `shared/` folders
- [x] 27. Build hub home page (`index.html`, `hub.js`, `hub.css`)
- [x] 28. Move Connect 4 into `games/connect4/` with a back link
- [x] 29. Build Tic-Tac-Toe with Easy and Unbeatable AI
- [x] 30. Test batch 1 and push
- [x] 31. Batch 2: Othello and Gomoku
- [x] 32. Batch 3: Checkers
- [x] 33. Batch 4: Chess
- [ ] 34. Move Connect 4 onto `shared/` code

- [ ] 35. Test every game in the browser and push
- [ ] 36. Add castling and en passant to Chess

## v6: Instructions
- [x] 37. Write `shared/help.js` with the rules text for all six games
- [x] 38. Add the How to Play button and popup to every game page
- [ ] 39. Read each game's instructions in the browser and check they match how the game really plays
