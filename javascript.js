function createGrid (numberOfSquares = 16) {
  const ROWS = numberOfSquares;
  const COLS = numberOfSquares;
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

  const listCells = document.querySelectorAll('.cell');
  listCells.forEach((cell) => {
  cell.addEventListener('mouseleave', () => {
    changeBgColor(cell);
  });
});
}

createGrid();



function changeBgColor (element) {
  element.classList.add('hovered');
}

const btnEditGrid = document.querySelector('#editGrid');
btnEditGrid.addEventListener(('click'), () => {
  const numberOfSquares = getNumberSquares();
  deleteGrid()
  updateCellStyle(numberOfSquares)
  createGrid(numberOfSquares)
});

function getNumberSquares () {
  const numberOfSquares = prompt('How many squares per side do you want?')
  return 1 <= numberOfSquares && numberOfSquares <= 100
    ? numberOfSquares : getNumberSquares();
}

function updateCellStyle (numberOfSquares = 16) {
  const stylesheet = document.styleSheets[0];
  const sizeSquare = Math.floor(100 / numberOfSquares * 100) / 100;
  console.log(sizeSquare);
  let cellCSSRules;

  for(let i = 0; i < stylesheet.cssRules.length; i++) {
    if (stylesheet.cssRules[i].selectorText === '.cell') {
      cellCSSRules = stylesheet.cssRules[i];
      break;
    }
  }

  cellCSSRules.style.setProperty('width', `${sizeSquare}vw`);
  cellCSSRules.style.setProperty('height', `${sizeSquare}vw`);
}

function deleteGrid () {
  const body = document.querySelector('body');
  const container = document.querySelector('#container')
  body.removeChild(container);
}