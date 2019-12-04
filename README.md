# Drockio in da house.

# NaturalJavascript
Natural javascript development environment.

## Getting Started
### Clone into hosting directory:
- navigate to hosting directory
- pull down source code with `git clone https://github.com/Drockio/NaturalJavascript.git`
- use `npm install` to install all node modules in package.json

## Development
- use `grunt watch` to continuously monitor your javascript and compile handlebar templates. 

# Happy Coding!

## Deployment
- use `grunt deploy` to clean the `_dist` directory then copy deployment files there.
- I find it useful to run `grunt clean` after deploying so `find file` operations don't include `_dist` files.

## TODO
- sanitize all input text
- Remove references to jquery (extend and ajax remain)
- migrate rest of ajax calls to interfaces
- fix credit card page bug
- css separation/cleanup
- investigate country/local behavior
- security
- go through and do a test on broadcast errors on each page. put html into a template


## Finished
Move finished TODO items to the top of this list:
- ~~Create local product display~~
- ~~put all UI interaction into event messaging~~
- ~~add shroud between each page~~
- ~~put templates in subfolders~~
- ~~filtering by product category~~
- ~~interfaces for talking to controllers - decide where mapping for non-konnektive goes~~
- ~~investigate server side git. Right now there is a server.js and api/server.js, we don't need two.~~
- ~~Add shim to filterProductList that applies mock categories to products.~~
- ~~Move product ajax calls to interface (& set up interfaces)~~

## Pre-deployment checklist (todos)
For all of those, leave-it-this-way-in-development-but-change-it-in-production last minute, just because you love me issues:
* Review shims. Remove if possible.
* Set proper production urls and passwords
* Make it shine!

