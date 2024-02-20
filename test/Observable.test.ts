/*
 * The MIT License (MIT)
 * Copyright (c) 2024 Karl STEIN
 */

import { describe, expect, it, jest } from '@jest/globals'
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
    const fn = jest.fn()
    const person = new Person()
    person.on('eat', fn)
    person.emit('eat', 'sushis')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('off(event, listener)', () => {
  it('should remove event listener', () => {
    const fn = jest.fn()
    const person = new Person()
    person.on('eat', fn)
    person.off('eat', fn)
    person.emit('eat', 'sushis')
    expect(fn).not.toHaveBeenCalled()
  })
})
