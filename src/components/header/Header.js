import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  toHtml() {
    return `
    <input type="text" class="input" value="New Table">
    <div>
      <div class="button">
        <span class="material-icons-outlined">exit_to_app</span>
      </div>
      <div class="button">
        <span class="material-icons-outlined">delete</span>
      </div>
    </div>
    `;
  }
}
