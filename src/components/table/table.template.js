import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function getCellContent(dataState, id) {
  return dataState[id] || '';
}

function createCell(state, rowIndex) {
  return function(_, columnIndex) {
    const id = `${rowIndex}:${columnIndex}`;
    const width = getWidth(state.colState, columnIndex);
    const data = getCellContent(state.dataState, id);
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
    return `
      <div class="cell" 
        contenteditable
        data-type="cell"
        data-id="${id}" 
        data-column-index="${columnIndex}"
        data-value="${data}"
        style="${styles}; width: ${width}"
        >${parse(data)}</div>
    `;
  };
}

function createColumn({content, index, width}) {
  return `
    <div class="column" data-type="resizable" data-column-index="${index}"
        style="width: ${width}">
      ${content}
      <div class="column-resize" data-resize="column"></div>
    </div>`;
}

function createRow(content, index = '', rowState) {
  const resizer = index ?
    '<div class="row-resize" data-resize="row"></div>' :
    '';
  const height = getHeight(rowState, index);
  return `
    <div class="row" data-type="resizable" data-row-index="${index}"
      style="height: ${height}">
      <div class="row-info">
        ${index}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  return function(content, index) {
    return {
      content, index, width: getWidth(state.colState, index),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(createColumn)
      .join('');

  rows.push(createRow(cols, 0, {}));

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell(state, rowIndex))
        .join('');
    rows.push(createRow(cells, rowIndex + 1, state.rowState));
  }

  return rows.join('');
}
