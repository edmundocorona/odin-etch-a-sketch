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

      const idCSS = `r${row}-c${col}`;
      divCol.setAttribute('id', idCSS);
      document.styleSheets[0].insertRule(`#${idCSS} { background-color: white; }`);
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

function calcColorValue (actualValue) {
  if (actualValue >= 25.5) return actualValue - 25.5;
  return 0;
}


function changeBgColor (element) {
  idCSS = `#${element.id}`;
  const cellRule = getCSSRule(idCSS);
  const rgbColor = cellRule.style.getPropertyValue("background-color");
  const REGEX_RGB = /rgb\((\d+|\d+\.\d+), (\d+|\d+\.\d+), (\d+|\d+\.\d+)\)/;
  const match = rgbColor.match(REGEX_RGB);

  let red;
  let green;
  let blue;
  if(match !== null) {
    red = calcColorValue(match[1]);
    green = calcColorValue(match[2]);
    blue = calcColorValue(match[3]);
    
  } else {
    red = Math.ceil((Math.random() * (229.5 - 204) + 204) * 100) / 100;
    green = Math.ceil((Math.random() * (229.5 - 204) + 204) * 100) / 100;
    blue = Math.ceil((Math.random() * (229.5 - 204) + 204) * 100) / 100;
  }

  cellRule.style.setProperty('background-color', `rgb(${red}, ${green}, ${blue})`);
}

const btnEditGrid = document.querySelector('#editGrid');
btnEditGrid.addEventListener(('click'), () => {
  const numberOfSquares = getNumberSquares();
  deleteGrid()
  deleteCSSGrid()
  updateCellStyle(numberOfSquares)
  createGrid(numberOfSquares)
});

function getNumberSquares () {
  const numberOfSquares = prompt('How many squares per side do you want?')
  return 1 <= numberOfSquares && numberOfSquares <= 100
    ? numberOfSquares : getNumberSquares();
}

function updateCellStyle (numberOfSquares = 16) {
  const sizeSquare = Math.floor(100 / numberOfSquares * 100) / 100;
  const cellCSSRule = getCSSRule('.cell');
  cellCSSRule.style.setProperty('width', `${sizeSquare}vw`);
  cellCSSRule.style.setProperty('height', `${sizeSquare}vw`);
}

function getCSSRule (selector) {
  const stylesheet = document.styleSheets[0];
  let CSSRule;
  for(let i = 0; i < stylesheet.cssRules.length; i++) {
    if (stylesheet.cssRules[i].selectorText === selector) {
      CSSRule = stylesheet.cssRules[i];
      break;
    }
  }
  return CSSRule;
}

function deleteGrid () {
  const body = document.querySelector('body');
  const container = document.querySelector('#container')
  body.removeChild(container);
}

function deleteCSSGrid () {
  while (document.styleSheets[0].cssRules.length > 4) {
    document.styleSheets[0].deleteRule(0);
  }
}

updateCellStyle();
createGrid();