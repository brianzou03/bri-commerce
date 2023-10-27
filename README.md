# Bri-Commerce (Brian's E-commerce Site)

## Overview
Sometimes the ordinary e-commerce websites are a bit too boring. I have a simple and fun solution... Bri-Commerce!

Bri-Commerce is an e-commerce website that is stylistic and will allow users to have a fun e-commerce website experience. A user can register and login. Once a user is logged in, they can add items to their shopping carts. These items have descriptions, reviews, and such. Users can simulate "purchasing" items which will add these items to their inventories. Users will have a profile where they can change their profile picture, bio, and name.


## Data Model

The application will store Users, Carts, and Inventories

* users can have one cart via reference
* useres have access to a profile page
* each cart can have multiple items (by embedding)
* each inventory can have multiple items (by embedding)

(__TODO__: sample documents)

An Example User:
```javascript
{
    username: "brianzou"
    hash: // password hash
    cart: // the cart brianzou owns
    inventory: // the items brianzou purchased
    picture: // img.jpg
    bio: // description of user
}

```

An Example Cart with Embedded Items:

```javascript
{
    user: // reference to User object
    name: "Brian's Cart",
    items: [
        { name: "xbox", price: 500, quantity: 1, },
        { name: "protein bar", price: 30, quantity: 2}
    ]
}
```

An Example Inventory with Embedded items:

```javascript
{
    user: // reference to User object
    name: "Brian's Inventory",
    items: [
        { name: "tissues", price: 10, quantity: 2, },
        { name: "water", price: 5, quantity: 1}
    ]
}
```

An Example Item

```javascript
{
    name: "Mac Laptop",
    price: 1000,
    rating: 5,
    description: "Just an ordinary laptop"
}
```


## [Link to Commented First Draft Schema](db.mjs) 

A link to my first draft Schema called BrianSchema (this name will probably be changed in a future iteration)

## Wireframes

/home - home page with items you can purchase

![list create](documentation/bricommerce_home.png)

/home/item_name - page that shows an item with its review and description

![list](documentation/bricommerce_item.png)

/user/cart - page for your shopping cart

![list](documentation/bricommerce_cart.png)

/user/inventory - page for showing the items you purchased and own

![list](documentation/bricommerce_inventory.png)

/user/profile - page for showing your profile

![list](documentation/bricommerce_profile.png)


## Site map

![list](documentation/bricommerce_sitemap.png)


## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

