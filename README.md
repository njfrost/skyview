# skyview
We would like to build command line interfaces and node packages for downloading 
satellite imagery. We will start with the EPIC DSCOVR API and eventually add a
GOES-16 interface when it's API becomes available.

__Comand line Example:__

    $ dscovr --format=png --color=natural --latest
    Latest natural image epic_1b_20170308002713_02.png at 2017-03-08 00:22:24
    --2017-03-11 18:24:55-- downloading  https://epic.gsfc.nasa.gov/archive/natural/2017/03/08/png/epic_1b_20170308002713_02.png
    Saving to 'epic_1b_20170308002713_02.png'
    
__Node Example:__

    var dscovr = require('dscovr')
    dscovr.getImage( { format: 'png', color: 'natural', date: '2017-03-11Z18:24:55' } )
    
    
# Install

__Node Version 6.9.1__

This is being developed with 6.9.1 but we think it could be built with earlier
versions. Let us know!