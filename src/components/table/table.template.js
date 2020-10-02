const CODES = {
  A: 65,
  Z: 90,
};

function createCell(_, columnIndex) {
  return `
    <div class="cell" contenteditable data-column-index="${columnIndex}"></div>
  `;
}

function createColumn(content, index) {
  return `
    <div class="column" data-type="resizable" data-column-index="${index}">
      ${content}
      <div class="column-resize" data-resize="column"></div>
    </div>`;
}

function createRow(content, rowInfo = '') {
  const resizer = rowInfo ?
    '<div class="row-resize" data-resize="row"></div>' :
    '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowInfo}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('');

  rows.push(createRow(cols));

  const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('');

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
