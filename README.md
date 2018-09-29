# Greens

Konnektive site for selling greens

## Getting Started
### Clone into hosting directory:
- navigate to hosting directory
- pull down source code with `git clone https://github.com/LevelAds/Greens.git`
- use `npm install` to install all node modules in package.json

### Create User
- Create the user 'webserver'. Note: I found it easiest to create one with the Users & Groups interface in windows. su dooesn't seem to work in OSX bash, btw.

### Change owner:
- `sudo chown -R webserver .`

### Set file permissions:
- `sudo chmod -R 755 .`

### Custom https node/express webserver
- Download the server [here][webserver].

[webserver]: https://github.com/LevelAds/Webserver

## (Optional) Create a template to reuse elsewhere:
- Create Users/(your_user_name)/.grunt-init/(new_template_name)
- From a new website director: grunt-init new_template_name

## Development
- use `grunt watch` to continuously monitor your javascript and compile handlebar templates.

# Happy Coding!

## Deployment
- use `grunt deploy` to clean the `_dist` directory then copy deployment files there.
- I find it useful to run `grunt clean` after deploying so `find file` operations don't include `_dist` files.

## Derek working on
- [*] add ___product_categories.gatherAndSave___ which returns an array of unique categories
	- params: array of products
	- [*] store: ___masterCategoryArray___ to local storage
- [*] markup category tiles based on ___masterCategoryArray___
- [*] set up event messaging for category tiles
- [*] set up ___applyCategoryFilters___ functions
	- params: array of products, ___masterCategoryArray___, minPrice, maxPrice
	- returns: filtered products
	- [*] filtered category list
	- [ ] price range
- once you have targeted the right element:
	- [*] toggle its 'led like light'
	- [*] remove/add it from/to filtered category list
	- [*] redisplay product list
- [ ] create unit tests

## TODO
- put templates in subfolders
- css separation/cleanup
- investigate country/local behavior
- push to drockio remote if you haven't been paid.
- consider getting rid of fontawesome in place of a couple icons
- security
- migrate rest of ajax calls to interfaces
- finalize backend/language choices
- home page segment loader dd$('.footer', 'templateName')
- go through and do a test on broadcast errors on each page. put html into a template
- add shroud between each page
- cool thank you page
- Hook importUserPage.postStandardInputs back up
- Remove references to TAKETHISOUT - it sets a standard price. 
- Use campaign 1 or 6 to display "NO products available"
- Use campaign 4,9 to work on some alignment issues.
- Node css plugin to check for unclosed or poorly formatted css? html?

## Finished
Move finished TODO items to the top of this list:
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


