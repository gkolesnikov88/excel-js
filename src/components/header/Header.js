import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {$} from '@core/dom';
import {defaultTitle} from '@/constants';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  toHtml() {
    const title = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}">

      <div>
        <div class="button" data-value='delete'>
          <span class="material-icons" data-value='delete'>delete</span>
        </div>
        <div class="button" data-value='exit_to_app'>
          <span class="material-icons" data-value='exit_to_app'>
            exit_to_app
          </span>
        </div>
      </div>`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.value === 'delete') {
      const decision = confirm('Do you want to delete this table?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.value === 'exit_to_app') {
      ActiveRoute.navigate('');
    }
  }
}
