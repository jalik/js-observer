/*
 * The MIT License (MIT)
 * Copyright (c) 2025 Karl STEIN
 */

import { describe, expect, it, vi } from 'vitest'
import { Observable } from '../src'

class Person extends Observable<'eat'> {
}

describe('Observable', () => {
  it('should be importable from package', () => {
    expect(typeof Observable).toBe('function')
  })
})

describe('emit(event, ...args)', () => {
  it('should call event listeners', () => {
    const fn = vi.fn()
    const person = new Person()
    person.on('eat', fn)
    person.emit('eat', 'sushis')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('off(event, listener)', () => {
  it('should remove event listener', () => {
    const fn = vi.fn()
    const person = new Person()
    person.on('eat', fn)
    person.off('eat', fn)
    person.emit('eat', 'sushis')
    expect(fn).not.toHaveBeenCalled()
  })
})
