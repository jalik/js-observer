/*
 * The MIT License (MIT)
 * Copyright (c) 2023 Karl STEIN
 */

import { describe, expect, it } from '@jest/globals'
import Observer from '../src/Observer'

describe('Observer', () => {
  it('should be importable from package', () => {
    expect(typeof Observer).toEqual('function')
  })
})

describe('attach(event, fn)', () => {
  describe('with missing event', () => {
    it('should throw an error', () => {
      expect(() => {
        const observer = new Observer()
        // @ts-ignore
        observer.attach()
      }).toThrow()
    })
  })

  describe('with missing listener', () => {
    it('should throw an error', () => {
      expect(() => {
        const observer = new Observer()
        // @ts-ignore
        observer.attach('changed')
      }).toThrow()
    })
  })

  it('should attach a listener to the event', () => {
    const observer = new Observer()
    observer.attach('test', () => 'TEST')
    expect(observer.events.test.length).toEqual(1)
  })
})

describe('detach(event, fn)', () => {
  it('should detach a listener from the event', () => {
    const observer = new Observer()
    const fn = () => 'TEST'
    observer.attach('test', fn)
    observer.detach('test', fn)
    expect(observer.events.test.length).toEqual(0)
  })
})

describe('notify(event, args...)', () => {
  describe('with missing event', () => {
    it('should throw an error', () => {
      expect(() => {
        const observer = new Observer()
        // @ts-ignore
        observer.notify()
      }).toThrow()
    })
  })

  it('should execute all listeners attached to the event', () => {
    const observer = new Observer()
    let count = 0
    observer.attach('count', () => {
      count = 1300
    })
    observer.attach('count', () => {
      count += 36
    })
    observer.attach('count', () => {
      count += 1
    })
    observer.notify('count')
    expect(count).toEqual(1337)
  })

  it('should execute all listeners attached to the event on each notification', () => {
    const observer = new Observer()
    let count = 0
    observer.attach('increment', () => {
      count += 1
    })

    for (let i = 0; i < 1337; i += 1) {
      observer.notify('increment')
    }
    expect(count).toEqual(1337)
  })

  it('should pass arguments to listener on each notification', () => {
    const observer = new Observer()
    let count = 0
    observer.attach('add', (num1, num2, num3) => {
      count += num1 + num2 + num3
    })

    for (let i = 0; i < 1337; i += 1) {
      observer.notify('add', 5, 3, 2)
    }
    expect(count).toEqual(1337 * 10)
  })

  it('should pass context to listener on each notification', () => {
    const context = { version: 1 }
    const observer = new Observer(context)
    observer.attach('changed', function changed () {
      this.version += 1
    })
    observer.notify('changed')
    expect(observer.context.version).toEqual(2)
  })
})

describe('setContext(object)', () => {
  it('should set context', () => {
    const context1 = { version: 1 }
    const context2 = { version: 2 }
    const observer = new Observer(context1)
    observer.setContext(context2)
    expect(observer.context.version).toBe(context2.version)
  })
})
