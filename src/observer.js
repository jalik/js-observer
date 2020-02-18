/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
