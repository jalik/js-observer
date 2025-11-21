/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

export type Listener = (...args: any[]) => void

interface IObserver<Context, Event extends string> {
  context?: Context;
  events: Map<Event, Listener[]>;
}

class Observer<Context, Event extends string> implements IObserver<Context, Event> {
  public context?: Context
  public events: Map<Event, Listener[]>

  constructor (context?: Context) {
    this.context = context
    this.events = new Map<Event, Listener[]>()
  }

  /**
   * Executes all listeners attached to an event.
   */
  emit (event: Event, ...args: unknown[]): void {
    const listeners = this.events.get(event) ?? []
    listeners.forEach((fn) => {
      fn.apply(this.context, args)
    })
  }

  /**
   * Removes an event listener.
   * @param event
   * @param listener
   */
  off (event: Event, listener: Listener): void {
    const listeners = this.events.get(event) ?? []
    this.events.set(event, listeners.filter((fn) => fn !== listener))
  }

  /**
   * Adds an event listener.
   * @param event
   * @param listener
   */
  on (event: Event, listener: Listener): void {
    const listeners = this.events.get(event) ?? []
    this.events.set(event, [...listeners, listener])
  }

  /**
   * Defines the context that is passed to event listeners.
   * @param context
   */
  setContext (context?: Context): void {
    this.context = context
  }
}

export default Observer
