## Copy Buddy

[![Build Status](https://travis-ci.org/flooose/copy_buddy.svg?branch=master)](https://travis-ci.org/flooose/copy_buddy)

A chrome extension for storing things you'd like to copy and paste later.

The latest release can be
downloaded [here](https://github.com/flooose/data_trove/releases)

### Development

Development in this project is dependent on gnu `make` and `yarn`.

    $ npm -g yarn # or similar
    $ make build

After the above commands, all sources will be "compiled" into the `copy_buddy`
folder and the "Load unpacked extension" button can be used to load this
extension [chrome://extensions](chrome://extensions)

All html, javascript and css files can be found in the `src/` folder. After
editing them, these files need to be "compiled" again with `make build`.

#### Testing

We use jasmine for testing and karma to run tests. To get started, run

    $ karma start karma.conf.js

then write your tests.

See [customLaunchers](https://swizec.com/blog/how-to-run-javascript-tests-in-chrome-on-travis/swizec/6647) about test setup on Travis-Ci versus test setup on local machine.
