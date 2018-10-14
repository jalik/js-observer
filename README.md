# @jalik/observer

The classic observer design pattern.

## Introduction

The Observer design pattern is a well known pattern to create reactive applications.
For example, your can attach observers to a form text field, then when the text field value changes, all observers are notified of that change and thus can do something in response. 

**This library has been unit tested.**

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

// When this person says something,
// we will display it in the console with the time
karl.on("say", function(words, date) {
    console.log(`${this.name} said: "${words}" at ${date.toString()}`);
});
```

## Detaching an observer

In the case that you need to remove a previously attached observer, here is the code.

```js
import Observer from "@jalik/observer";

const doubleClickListener = function() {
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
