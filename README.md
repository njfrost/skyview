# skyview
We would like to build command line interfaces and node packages for downloading 
satellite imagery. We will start with the
[EPIC DSCOVR API](https://epic.gsfc.nasa.gov/about/api) and eventually add a
GOES-16 interface when its API becomes available.

### Current implementation:

First run `npm install`.

Run `node js/skyview.js` with optional flags to download images from DSCOVR
satellite. Default will download the latest natural image to your current
working directory. Options:

* color (natural || enhanced)
* format (png || jpg || thumbs)
* filename (ex: earthispretty.png)

Example: `node js/skyview.js --format thumbs`

### Future implementation as an npm package:

__Command line Example:__

    $ dscovr --format png --color natural --filename earthispretty.png
    Latest natural image epic_1b_20170308002713_02.png at 2017-03-08 00:22:24
    Downloading https://epic.gsfc.nasa.gov/archive/natural/2017/03/08/png/epic_1b_20170308002713_02.png...
    Saved file to skyview/epic_1b_20170308002713_02.png
    
__Node Example:__

    const dscovr = require('dscovr')
    dscovr.getImage({ format: 'png', color: 'natural', date: '2017-03-11Z18:24:55' })
    
    
### Dependencies

__[Node v6.9.1](https://nodejs.org/en/download/)__

Node v6 and higher is required to run skyview because we use ES6 language
features.

### Tests

__[Mocha](https://mochajs.org/)__

Test files live next to their implementations with a .spec.js suffix.

    npm test