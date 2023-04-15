/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

interface Observer<T> {
  context?: T;
  events: { [key: string]: Array<(...args: any[]) => void> };
}

class Observer<T> implements Observer<T> {
  constructor(context?: T) {
    this.context = context;
    this.events = {};
  }

  /**
   * Adds an event callback
   * @param event
   * @param callback
   */
  attach(event: string, callback: (...args: any[]) => void): void {
    if (event == null) {
      throw new Error('missing event');
    }
    if (callback == null) {
      throw new Error('missing callback');
    }
    const listeners = this.events[event] || [];
    this.events[event] = [...listeners, callback];
  }

  /**
   * Removes an event callback
   * @param event
   * @param callback
   */
  detach(event: string, callback: (...args: any[]) => void): void {
    if (event == null) {
      throw new Error('missing event');
    }
    if (callback == null) {
      throw new Error('missing callback');
    }
    const listeners = this.events[event] || [];
    this.events[event] = listeners.filter((fn) => fn !== callback);
  }

  /**
   * Executes all callbacks attached to an event
   */
  notify(event: string, ...args: any[]): void {
    if (event == null) {
      throw new Error('missing event');
    }
    const listeners = this.events[event] || [];

    listeners.forEach((fn) => {
      fn.apply(this.context, args);
    });
  }

  /**
   * Defines the context that is passed to event callbacks
   * @param context
   */
  setContext(context?: T): void {
    this.context = context;
  }
}

export default Observer;
