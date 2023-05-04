# @jalik/observer

![GitHub package.json version](https://img.shields.io/github/package-json/v/jalik/js-observer.svg)
![Build Status](https://github.com/jalik/js-observer/actions/workflows/node.js.yml/badge.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/jalik/js-observer.svg)
[![GitHub issues](https://img.shields.io/github/issues/jalik/js-observer.svg)](https://github.com/jalik/js-observer/issues)
![GitHub](https://img.shields.io/github/license/jalik/js-observer.svg)
![npm](https://img.shields.io/npm/dt/@jalik/observer.svg)

Observe and emit events with ease.

## Introduction

The Observer design pattern is a well known pattern to create reactive applications. For example,
your can attach observers to a form text field, then when the text field value changes, all
observers are notified of that change and thus can do something in response.

## Sandbox

Play with the lib here:
https://codesandbox.io/s/jalik-observer-demo-de16gw?file=/src/index.js

## Attaching an observer and notify it

The following code shows how to attach an observer and how to notify it of events.

```js
import Observer from "@jalik/observer";

class Person {
  constructor(name) {
    this.name = name;
    // Create the observer with current context
    this.observer = new Observer(this);
  }

  on(event, observer) {
    // Attach observer
    this.observer.attach(event, observer);
  }

  say(words) {
    // Notify observers
    this.observer.notify("say", words, new Date());
  }
}

const karl = new Person("karl");

karl.on("say", function (words, date) {
  console.log(`${this.name} said: "${words}"`);
});
// this will show: karl said: "hello"
karl.say("hello");
```

## Detaching an observer

In the case that you need to remove a previously attached observer, here is the code.

```js
import Observer from "@jalik/observer";

const doubleClickListener = function () {
  console.log("double click detected");
  // This avoid the current function to be called
  // on the next "doubleClick" event notification.
  observer.detach("doubleClick", doubleClickListener);
};

const observer = new Observer();
observer.attach("doubleClick", doubleClickListener);

// This will call the doubleClickListener once.
observer.notify("doubleClick");

// This will not call the doubleClickListener
// since it has been detached in the previous call.
observer.notify("doubleClick");
```

## Changelog

History of releases is in the [changelog](./CHANGELOG.md).

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).

If you find this lib useful and would like to support my work, donations are welcome :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SS78MUMW8AH4N)
