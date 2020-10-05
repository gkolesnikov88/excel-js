export class TableSelection {
  static classNameSelected = 'selected';

  constructor() {
    this.group = [];
    this.currentCell = null;
  }

  /**
   * Selects the selected cell
   * @param {Dom} $el
   */
  select($el) {
    this.clearSelected();
    this.group.push($el);
    this.currentCell = $el;
    $el.focus().addClass(TableSelection.classNameSelected);
  }

  selectGroup($cells) {
    this.clearSelected();
    this.group = $cells;
    this.group.forEach($el => $el.addClass(TableSelection.classNameSelected));
  }

  clearSelected() {
    this.group.forEach($el =>
      $el.removeClass(TableSelection.classNameSelected));
    this.group = [];
  }
}
