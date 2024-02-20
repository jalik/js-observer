/*
 * The MIT License (MIT)
 * Copyright (c) 2024 Karl STEIN
 */

import Observer, { Listener } from './Observer'

class Observable<Event extends string> {
  protected observer: Observer<this, Event>

  constructor () {
    this.observer = new Observer<this, Event>(this)
  }

  emit (event: Event, ...args: unknown[]) {
    this.observer.emit(event, ...args)
  }

  off (event: Event, listener: Listener) {
    this.observer.off(event, listener)
  }

  on (event: Event, listener: Listener) {
    this.observer.on(event, listener)
  }
}

export default Observable
