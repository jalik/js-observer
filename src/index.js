/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

class Observer {
  constructor(context) {
    this.context = context;
    this.events = {};
  }

  /**
   * Adds an event listener
   * @param event
   * @param listener
   */
  attach(event, listener) {
    // Check the event
    if (typeof event !== 'string') {
      throw new TypeError('Event is not a string');
    }
    // Check the callback
    if (typeof listener !== 'function') {
      throw new TypeError('Callback is not a function');
    }
    // Create the array
    if (!this.events[event]) {
      this.events[event] = [];
    }
    // Add the event callback
    this.events[event].push(listener);
  }

  /**
   * Removes an event listener
   * @param event
   * @param listener
   */
  detach(event, listener) {
    if (this.events[event]) {
      if (typeof listener === 'function') {
        const index = this.events[event].indexOf(listener);
        this.events[event].splice(index, 1);
      } else {
        delete this.events[event];
      }
    }
  }

  /**
   * Executes all callbacks attached to an event
   */
  notify(...args) {
    // Check args
    if (args.length < 1) {
      throw new TypeError('Wrong number of arguments');
    }

    const event = args.shift();

    // Check the event
    if (typeof event !== 'string') {
      throw new TypeError('Event is not a string');
    }

    if (this.events[event] instanceof Array) {
      for (let i = 0; i < this.events[event].length; i += 1) {
        this.events[event][i].apply(this.context, args);
      }
    }
  }

  /**
   * Defines the context that is passed to event callbacks
   * @param context
   */
  setContext(context) {
    this.context = context;
  }
}

export default Observer;
