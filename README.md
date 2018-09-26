# Greens

Konnektive site for selling greens

## Getting Started
### Clone into hosting directory:
- navigate to hosting directory
- git clone https://github.com/LevelAds/Greens.git
- npm install
- grunt watch

### Create User
- Create the user 'webserver'. Note: I found it easiest to create one with the Users & Groups interface in windows. su dooesn't seem to work in OSX bash, btw.

### Change owner:
- sudo chown -R webserver .

### Set file permissions:
- sudo chmod -R 755 .

### Start your webserver
- Download the [development web server][webserver].

[webserver]: https://github.com/LevelAds/Webserver

## (Optional) Create a template to reuse elsewhere:
- Create Users/(your_user_name)/.grunt-init/(new_template_name)
- From a new website director: grunt-init new_template_name

# Happy Coding!

## Derek working on
- Add gatherCategories which returns an array of unique categories
-- params: array of products
-- returns: a unique array of categories
- Markup category tiles based on gatherCategories
- Set up event messaging for categories
- Create unit tests

## TODO
- css separation
- finish js cleanup
- filtering of products (meta name and price range) - LINQ like
- investigate country/local behavior
- push to drockio remote if you haven't been paid.
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
- interfaces for talking to controllers - decide where mapping for non-konnektive goes
- investigate server side git. Right now there is a server.js and api/server.js, we don't need two.
- Add shim to filterProductList that applies mock categories to products.
- Move product ajax calls to interface (& set up interfaces)

## Pre-deployment checklist (todos)
For all of those, leave-it-this-way-in-development-but-change-it-in-production last minute, just because you love me issues:
- Review shims. Remove if possible.
- Set proper production urls and passwords
- Make it shine!


