import gameBoard from '../src/gameBoard';

const { getResult, pickGrid } = gameBoard;

describe('getResult(mat), function that will check if winner has been decided', () => {
  it('Test case 1', () => {
    expect(
      getResult([
        ['o', 'o', '.'],
        ['x', 'x', 'x'],
        ['.', '.', '.'],
      ]),
    ).toBe('x');
  });

  it('Test case 2', () => {
    expect(
      getResult([
        ['o', 'o', '.'],
        ['o', 'x', 'x'],
        ['.', '.', 'x'],
      ]),
    ).toBe(false);
  });

  it('Test case 3', () => {
    expect(
      getResult([
        ['o', 'o', 'o'],
        ['x', 'x', 'o'],
        ['.', '.', 'x'],
      ]),
    ).toBe('o');
  });

  it('Test case 4', () => {
    expect(
      getResult([
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ]),
    ).toBe(false);
  });

  it('Test case 5', () => {
    expect(
      getResult([
        ['x', 'o', 'o'],
        ['o', 'x', 'o'],
        ['o', 'x', 'x'],
      ]),
    ).toBe('x');
  });

  it('Test case 6', () => {
    expect(
      getResult([
        ['x', 'o', 'o'],
        ['x', 'o', 'o'],
        ['x', 'x', '.'],
      ]),
    ).toBe('x');
  });

  it('Test case 7', () => {
    expect(
      getResult([
        ['o', 'o', 'x'],
        ['x', 'o', 'o'],
        ['o', 'x', 'x'],
      ]),
    ).toBe(false);
  });

  it('Test case 8', () => {
    expect(
      getResult([
        ['x', 'o', 'o'],
        ['o', 'x', 'x'],
        ['o', 'o', 'x'],
      ]),
    ).toBe('x');
  });

  it('Test case 9', () => {
    expect(
      getResult([
        ['x', '.', 'o'],
        ['.', 'x', 'o'],
        ['o', 'o', 'x'],
      ]),
    ).toBe('x');
  });

  it('Test case 10', () => {
    expect(
      getResult([
        ['o', 'x', 'o'],
        ['x', 'o', 'o'],
        ['o', 'o', 'x'],
      ]),
    ).toBe('o');
  });

  it('Test case 11', () => {
    expect(
      getResult([
        ['x', '.', 'o'],
        ['.', 'x', 'o'],
        ['o', 'o', 'x'],
      ]),
    ).toBe('x');
  });

  it('Test case 12', () => {
    expect(
      getResult([
        ['o', 'x', 'o'],
        ['x', 'o', 'o'],
        ['o', 'o', 'x'],
      ]),
    ).toBe('o');
  });

  it('Test case 13', () => {
    expect(
      getResult([
        ['o', 'o', 'x'],
        ['x', 'x', 'o'],
        ['o', 'o', 'o'],
      ]),
    ).toBe('o');
  });

  it('Test case 14', () => {
    expect(
      getResult([
        ['o', 'o', 'x'],
        ['x', 'o', 'o'],
        ['o', 'x', 'o'],
      ]),
    ).toBe('o');
  });

  it('Test case 15', () => {
    expect(
      getResult([
        ['o', '.', 'x'],
        ['x', 'o', 'o'],
        ['x', 'o', 'o'],
      ]),
    ).toBe('o');
  });

  it('Test case 16', () => {
    expect(
      getResult([
        ['o', '.', 'o'],
        ['x', 'o', 'o'],
        ['x', 'o', 'o'],
      ]),
    ).toBe('o');
  });

  it('Test case 17', () => {
    expect(
      getResult([
        ['o', '.', 'x'],
        ['o', 'x', 'o'],
        ['o', 'x', 'o'],
      ]),
    ).toBe('o');
  });

  it('Test case 18', () => {
    expect(
      getResult([
        ['o', '.', 'x'],
        ['.', 'o', 'o'],
        ['x', 'x', 'o'],
      ]),
    ).toBe('o');
  });

  it('Test case 19', () => {
    expect(
      getResult([
        ['x', 'o', 'x'],
        ['o', 'o', 'x'],
        ['o', 'x', 'o'],
      ]),
    ).toBe(false);
  });

  it('Test case 20', () => {
    expect(
      getResult([
        ['o', '.', 'o'],
        ['.', 'o', 'o'],
        ['x', 'x', 'o'],
      ]),
    ).toBe('o');
  });
});

describe('pickGrid(mat, r, c, symb), will return a new matrix when mat[r][c] assigned to symb; if invalid return false', () => {
  it('Test case 1', () => {
    const initialMatrix = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const expectedMatrix = [
      ['.', '.', '.'],
      ['.', 'o', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 1, 1, 'o')).toEqual(expectedMatrix);
  });

  it('Test case 2', () => {
    const initialMatrix = [
      ['x', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 0, 0, 'o')).toBe(false);
  });

  it('Test case 3', () => {
    const initialMatrix = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 3, 1, 'x')).toBe(false);
  });

  it('Test case 4', () => {
    const initialMatrix = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 1, 3, 'o')).toBe(false);
  });

  it('Test case 5', () => {
    const initialMatrix = [
      ['.', 'o', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const expectedMatrix = [
      ['.', 'o', '.'],
      ['.', 'x', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 1, 1, 'x')).toEqual(expectedMatrix);
  });

  it('Test case 6', () => {
    const initialMatrix = [
      ['.', '.', '.'],
      ['o', '.', '.'],
      ['.', '.', '.'],
    ];
    const expectedMatrix = [
      ['.', '.', '.'],
      ['o', 'x', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 1, 1, 'x')).toEqual(expectedMatrix);
  });

  it('Test case 7', () => {
    const initialMatrix = [
      ['.', '.', '.'],
      ['o', '.', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 1, 0, 'o')).toBe(false);
  });

  it('Test case 8', () => {
    const initialMatrix = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, -1, 2, 'o')).toBe(false);
  });

  it('Test case 9', () => {
    const initialMatrix = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 2, -1, 'x')).toBe(false);
  });

  it('Test case 10', () => {
    const initialMatrix = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];
    const expectedMatrix = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['o', '.', '.'],
    ];
    expect(pickGrid(initialMatrix, 2, 0, 'o')).toEqual(expectedMatrix);
  });

  it('Test case 11', () => {
    const initialMatrix = [
      ['x', 'o', '.'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 0, 0, 'x')).toBe(false);
  });

  it('Test case 12', () => {
    const initialMatrix = [
      ['x', 'o', '.'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 3, 1, 'o')).toBe(false);
  });

  it('Test case 13', () => {
    const initialMatrix = [
      ['x', 'o', '.'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 1, 3, 'x')).toBe(false);
  });

  it('Test case 14', () => {
    const initialMatrix = [
      ['x', 'o', '.'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 1, 0, 'o')).toBe(false);
  });

  it('Test case 15', () => {
    const initialMatrix = [
      ['x', 'o', '.'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, -1, 2, 'o')).toBe(false);
  });

  it('Test case 16', () => {
    const initialMatrix = [
      ['x', 'o', '.'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 2, -1, 'x')).toBe(false);
  });

  it('Test case 17', () => {
    const initialMatrix = [
      ['x', 'o', 'o'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 1, 1, 'o')).toBe(false);
  });

  it('Test case 18', () => {
    const initialMatrix = [
      ['x', 'o', 'o'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 2, 1, 'o')).toBe(false);
  });

  it('Test case 19', () => {
    const initialMatrix = [
      ['x', 'o', 'o'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 1, 2, 'x')).toBe(false);
  });

  it('Test case 20', () => {
    const initialMatrix = [
      ['x', 'o', 'o'],
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ];
    expect(pickGrid(initialMatrix, 0, 2, 'x')).toBe(false);
  });
});
