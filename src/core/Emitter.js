export class Emitter {
  constructor() {
    this.listeners = {};
  }

  /**
   * Notify listeners.
   * Emit example: table.emit('table:select', {a: 1})
   * @param {string} event
   * @param {...*} args
   * @return {boolean}
   */
  emit(event, ...args) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach(listener => {
        listener(...args);
      });
      return true;
    }
    return false;
  }

  /**
   * Subscribe on event.
   * Add new listener.
   * Subscribe example: formula.subscribe('table:select', () => {})
   * @param {string} event
   * @param {function} fn
   * @return {function(): void}
   */
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn);
    };
  }
}
