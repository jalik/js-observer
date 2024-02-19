/*
 * The MIT License (MIT)
 * Copyright (c) 2024 Karl STEIN
 */

import { describe, expect, it } from '@jest/globals'
import Observer from '../src/Observer'

describe('Observer', () => {
  it('should be importable from package', () => {
    expect(typeof Observer).toBe('function')
  })
})

describe('on(event, fn)', () => {
  it('should attach a listener to the event', () => {
    const observer = new Observer<void, 'test'>()
    observer.on('test', () => 'TEST')
    expect(observer.events.has('test')).toBe(true)
    expect(observer.events.get('test')?.length).toBe(1)
  })
})

describe('off(event, fn)', () => {
  it('should detach a listener from the event', () => {
    const observer = new Observer<void, 'test'>()
    const fn = () => 'TEST'
    observer.on('test', fn)
    observer.off('test', fn)
    expect(observer.events.has('test')).toBe(true)
    expect(observer.events.get('test')?.length).toBe(0)
  })
})

describe('emit(event, args...)', () => {
  it('should execute all listeners attached to the event', () => {
    const observer = new Observer<void, 'increment'>()
    let count = 0
    observer.on('increment', () => {
      count = 1300
    })
    observer.on('increment', () => {
      count += 36
    })
    observer.on('increment', () => {
      count += 1
    })
    observer.emit('increment')
    expect(count).toBe(1337)
  })

  it('should execute all listeners attached to the event on each notification', () => {
    const observer = new Observer<void, 'increment'>()
    let count = 0
    observer.on('increment', (inc: number) => {
      count += inc
    })

    for (let i = 0; i < 1337; i += 1) {
      observer.emit('increment', 1)
    }
    expect(count).toBe(1337)
  })

  it('should pass arguments to listener on each notification', () => {
    const observer = new Observer<void, 'add'>()
    let count = 0
    observer.on('add', (num1: number, num2: number, num3: number) => {
      count += num1 + num2 + num3
    })

    for (let i = 0; i < 1337; i += 1) {
      observer.emit('add', 5, 3, 2)
    }
    expect(count).toBe(1337 * 10)
  })

  it('should pass context to listener on each notification', () => {
    const context: Record<'v', number> = { v: 1 }
    const observer = new Observer(context)
    observer.on('changed', function changed (this: Record<'v', number>) {
      this.v += 1
    })
    observer.emit('changed')
    expect(observer.context).toStrictEqual({ v: 2 })
  })
})

describe('setContext(object)', () => {
  it('should set context', () => {
    const context1 = { v: 1 }
    const context2 = { v: 2 }
    const observer = new Observer(context1)
    observer.setContext(context2)
    expect(observer.context).toStrictEqual(context2)
  })
})
