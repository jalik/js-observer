# jk-observer

The classic observer design pattern.

## Introduction

The Observer design pattern is a well known pattern to create reactive applications.
For example, your can attach listeners to a form text field, then when the text field value changes, all listeners are notified of that change and thus can do something in response. 

**This library is tested with unit tests.**

## Attaching a listener and notify it

The following code shows how to attach a listener and how to notify it of events.

```js
import {Observer} from "jk-observer";

class Person {
    constructor(name) {
        this.name = name;
        // Create the observer with current context
        this.observer = new Observer(this);
    }
    
    on(event, listener) {
        // Attach listener
        this.observer.attach(event, listener);
    }
    
    say(words) {
        console.log(words);
        // Notify listeners
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

## Detaching a listener

In the case that you need to remove a previously attached listener, here is the code.

```js
import {Observer} from "jk-observer";

const doubleClickListener = function() {
    // This avoid the current function to be called
    // on the next "doubleClick" event notification.
    observer.detach("doubleClick", doubleClickListener);
    console.log("double click detected");
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

### v1.0.0
- First public release

## License

The code is released under the [MIT License](http://www.opensource.org/licenses/MIT).

If you find this lib useful and would like to support my work, donations are welcome :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SS78MUMW8AH4N)
