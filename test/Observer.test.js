/*
 * The MIT License (MIT)
 * Copyright (c) 2020 Karl STEIN
 */

import Observer from '../src/Observer';

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
