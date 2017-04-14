## Copy Buddy

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
