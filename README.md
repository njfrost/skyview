# skyview
We would like to build command line interfaces and node packages for downloading 
satellite imagery. We will start with the [EPIC DSCOVR API](https://epic.gsfc.nasa.gov/about/api) and eventually add a
GOES-16 interface when it's API becomes available.

Current implementation:

Run `node js/skyview.js` with optional flags to download images from DSCOVR satellite. Default will download the latest natural image to your current working directory. Options:

* color (natural || enhanced)
* format (png || jpg || thumbs)
* filename (ex: earthispretty.png)

Example: `node js/skyview.js --format thumbs`

Future implementation:

__Command line Example:__

    $ dscovr --format png --color natural --filename earthispretty.png
    Latest natural image epic_1b_20170308002713_02.png at 2017-03-08 00:22:24
    Downloading https://epic.gsfc.nasa.gov/archive/natural/2017/03/08/png/epic_1b_20170308002713_02.png...
    Saved file to skyview/epic_1b_20170308002713_02.png
    
__Node Example:__

    const dscovr = require('dscovr')
    dscovr.getImage({ format: 'png', color: 'natural', date: '2017-03-11Z18:24:55' })
    
    
# Install

__Node Version 6.9.1__

This is being developed with 6.9.1 but we think it could be built with earlier
versions. Let us know!

# Tests

__[Mocha](https://mochajs.org/)__

    npm test
    
Test files live next to their implementations with a .spec.js suffix.