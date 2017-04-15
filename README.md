## Copy Buddy

[![Build Status](https://travis-ci.org/flooose/copy_buddy.svg?branch=master)](https://travis-ci.org/flooose/copy_buddy)

A chrome extension for storing things you'd like to copy and paste later.

The latest release can be
downloaded [here](https://github.com/flooose/data_trove/releases)

### Development

Before the extension can be loaded from source, all necessary files have to be
"compiled" into the `copy_buddy` folder. This is done with the help of Gnu
`make` and simply calling `make` or `make build` in the root folder of the
project will load all files required by the manifest into the `copy_buddy`
folder. After this, the "Load unpacked extension" button can be used in
"chrome://extensions".

All html, javascript and css files can be found in the `src/` folder.

#### Testing

We use jasmine for testing and karma to run tests. To get started, run

    $ karma start karma.conf.js

then write your tests.

See [customLaunchers](https://swizec.com/blog/how-to-run-javascript-tests-in-chrome-on-travis/swizec/6647) about test setup on Travis-Ci versus test setup on local machine.
