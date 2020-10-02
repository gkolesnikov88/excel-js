class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  closest(selector) {
    return new Dom(this.$el.closest(selector));
  }

  getCoordinates() {
    return this.$el.getBoundingClientRect();
  }

  get data() {
    return this.$el.dataset;
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  /**
   * Set css styles to inner html element.
   * @param {Object} styles
   * Example {
   *    width: '30px',
   *    background: 'red',
   *  };
   */
  css(styles) {
    Object
        .keys(styles)
        .forEach(key => this.$el.style[key] = styles[key]);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
