# @jalik/observer

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/js-observer.svg)
![Build Status](https://github.com/jalik/js-observer/actions/workflows/node.js.yml/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/jalik/js-observer.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/js-observer.svg)](https://github.com/jalik/js-observer/issues)
![GitHub](https://img.shields.io/github/license/jalik/js-observer.svg)
![npm](https://img.shields.io/npm/dt/@jalik/observer.svg)

Make anything observable.

## Introduction

The Observer design pattern is a well known pattern to create reactive applications.  
You can attach observers to a form text field, then when the text field value changes, all
observers are notified of that change and thus can do something in response.

## Features

* Add event listeners
* Remove event listeners
* Emit events with arguments passed to listeners
* TypeScript declarations ♥

## Sandbox

Play with the lib here:
https://codesandbox.io/s/jalik-observer-demo-de16gw?file=/src/index.js

## Installing

```shell
npm i -P @jalik/observer
```
```shell
yarn add @jalik/observer
```

## Adding an event listener

```js
import { Observer } from '@jalik/observer'

class Person {
  constructor (name) {
    this.name = name
    // Create the observer with current context
    this.observer = new Observer(this)
  }

  on (event, observer) {
    // Attach observer
    this.observer.on(event, observer)
  }

  say (words) {
    // Notify observers
    this.observer.emit('say', words, new Date())
  }
}

const karl = new Person('karl')

karl.on('say', function (words, date) {
  console.log(`${this.name} said: "${words}"`)
})
// this will show: karl said: "hello"
karl.say('hello')
```

## Removing an event listener

```js
import { Observer } from '@jalik/observer'

const listener = function () {
  console.log('double click detected')
  // This avoid the current function to be called
  // on the next "doubleClick" event notification.
  observer.off('doubleClick', listener)
}

const observer = new Observer()
observer.on('doubleClick', listener)

// This will call the doubleClickListener once.
observer.emit('doubleClick')

// This will not call the doubleClickListener
// since it has been detached in the previous call.
observer.emit('doubleClick')
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).
