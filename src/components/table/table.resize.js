import {$} from '@core/dom';

export function resizeHandler(event, $root) {
  const rowHeight = 24;
  const infoCellWidth = 40;

  const resizeObject = event.target.dataset.resize;
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coordinates = $parent.getCoordinates();
  let width = 1;
  let height = 1;
  const excelTable = $('.excel__table');
  if (resizeObject === 'column') {
    $resizer.css({
      opacity: 1,
      bottom: -(excelTable.$el.clientHeight - rowHeight) + 'px',
    });
  } else if (resizeObject === 'row') {
    $resizer.css({
      opacity: 1,
      right: -(excelTable.$el.clientWidth - infoCellWidth) + 'px',
    });
  }
  document.onmousemove = e => {
    e.preventDefault();
    if (resizeObject === 'column') {
      const delta = Math.floor(e.pageX - coordinates.right);
      width = coordinates.width + delta;
      $resizer.css({
        right: -delta + 'px',
      });
    } else if (resizeObject === 'row') {
      const delta = Math.floor(e.pageY - coordinates.bottom);
      height = coordinates.height + delta;
      $resizer.css({
        bottom: -delta + 'px',
      });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (resizeObject === 'column') {
      $parent.css({
        width: width + 'px',
      });
      $root.findAll(
          `[data-column-index="${$parent.$el.dataset.columnIndex}"]`)
          .forEach(elem => {
            elem.style.width = width + 'px';
          });
    } else if (resizeObject === 'row') {
      $parent.css({
        height: height + 'px',
      });
    }
    $resizer.css({
      opacity: 0,
      right: '0',
      bottom: '0',
    });
  };
}
