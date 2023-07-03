import gameBoard from '../src/gameBoard';

const { getResult } = gameBoard;
it('Test', () => {
  expect(getResult([['o', 'o', '.'], ['x', 'x', 'x'], ['.', '.', '.']])).toBe('x');
});
