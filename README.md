# NaturalJavascript
Natural javascript development environment. The idea is to not have any external libraries so software enthusiasts can see EXACTLY what it takes to make a website run. 

DISCLAIMER: I am not a security expert. There may be things that JQuery or other Javascript libraries are doing to ensure safety. I am sure there are a few places a SQL injection attack could be introduced with my code. You might want to review this before sending products to someone with the power of the merchant which can leave you with a hole you didn't expect in your profit and loss statement. 

As a matter of a fact, this is why Evo extreme recreation outdoor equipment company hired me and quickly fired me after implementing Kount for them, a fraud protection service you hook up to your e-commerce website so you don't purchase a product for re-sale and get stiffed for the bill for the transaction as well as find yourself minus a product, or in Evo's case A WHOLE LOT OF THEM.

You are welcome Evo. Now your fortune can go on. I understand that there might not have been much for me to do ongoing since I already implemented an internal CMS (content management system) for tribal knowledge as well as fixing your inventory management tool while migrating between massive warehouses. I'm pretty sure it was the wrong place for me after getting yelled at by the IT manager for a bug relating to the way that they set up their scan gun for rapid inventory movement. Sorry guys. I mean, what a bunch of jerks. 

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

