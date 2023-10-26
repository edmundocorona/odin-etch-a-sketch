function createGrid () {
  const ROWS = 16;
  const COLS = 16;
  const container = document.createElement('div');
  container.setAttribute('id', 'container');
  for (let row = 0; row < ROWS; row++) {
    const divRow = document.createElement('div');
    divRow.classList.add('row');
    divRow.setAttribute('id', `r${row}`)
    for (let col = 0; col < COLS; col++) {
      const divCol = document.createElement('div');
      divRow.appendChild(divCol);
      divCol.classList.add('cell');
      divCol.setAttribute('id',`r${row}-c${col}`);
    }
    container.appendChild(divRow);
  }
  const body = document.querySelector('body');
  body.appendChild(container);
}

createGrid();

const listCells = document.querySelectorAll('.cell');
listCells.forEach((cell) => {
  cell.addEventListener('click', () => {
    alert(`You click me ${cell.id}`);
  });
});