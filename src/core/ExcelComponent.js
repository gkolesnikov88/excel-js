import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unSubscribers = [];

    this.prepare();
  }

  /**
   * Return component templates.
   * @return {string}
   */
  toHtml() {
    return '';
  }

  /**
   * Prepare our component before init.
   */
  prepare() {}

  /**
   * Notifying listeners about events.
   * @param {string} event
   * @param {...*} args
   */
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  /**
   * Subscribe to the event.
   * @param {string} event
   * @param {function} fn
   */
  $on(event, fn) {
    const unSubscribe = this.emitter.subscribe(event, fn);
    this.unSubscribers.push(unSubscribe);
  }

  /**
   * Init component.
   * Add Dom listeners.
   */
  init() {
    this.initDomListeners();
  }

  /**
   * Deleting the component.
   * Remove Dom listener.
   */
  destroy() {
    this.removeDomListener();
    this.unSubscribers.forEach(unSubscribe => {
      unSubscribe();
    });
  }
}
