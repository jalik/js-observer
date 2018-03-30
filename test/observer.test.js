/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Karl STEIN
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

import Observer from '../src/observer';

describe('Observer', () => {
  it('should be importable from package', () => {
    expect(typeof Observer).toEqual('function');
  });
});

describe('attach(event, fn)', () => {
  it('should attach a listener to the event', () => {
    const observer = new Observer();
    observer.attach('test', () => 'TEST');
    expect(observer.events.test.length).toEqual(1);
  });
});

describe('detach(event, fn)', () => {
  it('should detach a listener from the event', () => {
    const observer = new Observer();
    const fn = () => 'TEST';
    observer.attach('test', fn);
    observer.detach('test', fn);
    expect(observer.events.test.length).toEqual(0);
  });
});

describe('notify(event, args...)', () => {
  it('should execute all listeners attached to the event', () => {
    const observer = new Observer();
    let count = 0;
    observer.attach('count', () => {
      count = 1300;
    });
    observer.attach('count', () => {
      count += 36;
    });
    observer.attach('count', () => {
      count += 1;
    });
    observer.notify('count');
    expect(count).toEqual(1337);
  });

  it('should execute all listeners attached to the event on each notification', () => {
    const observer = new Observer();
    let count = 0;
    observer.attach('increment', () => {
      count += 1;
    });

    for (let i = 0; i < 1337; i += 1) {
      observer.notify('increment');
    }
    expect(count).toEqual(1337);
  });

  it('should pass arguments to listener on each notification', () => {
    const observer = new Observer();
    let count = 0;
    observer.attach('add', (num1, num2, num3) => {
      count += num1 + num2 + num3;
    });

    for (let i = 0; i < 1337; i += 1) {
      observer.notify('add', 5, 3, 2);
    }
    expect(count).toEqual(1337 * 10);
  });

  it('should pass context to listener on each notification', () => {
    const context = { date: new Date() };
    const observer = new Observer(context);
    observer.attach('time', function assignDate(date) {
      this.date = date;
    });
    const newDate = new Date().getTime();
    observer.notify('time', newDate);
    expect(context.date).toEqual(newDate);
  });
});
