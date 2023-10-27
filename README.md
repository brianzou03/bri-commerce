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

1. as a non-registered user, I can register a new account on the site
2. as a user, I can log into the website
3. as a user, I can add items to my shopping cart
4. as a user, I can view an item's page with review and description
5. as a user, I can review an item
6. as a user, I can view my shopping cart with the items I added
7. as a user, I can "purchase" the items from my shopping cart, moving them to my inventory
8. as a user, I can view my inventory with the items I bought
9. as a user, I can modify my own profile page with an image and a bio
10. as a user, I can view my own profile page

## Research Topics

* (6 points) React.js
    * Using a frontend framework

* (3 points) dotenv
    * Configuration management

* (2 points) tailwind.css
    * Using CSS framework

* (1-6 points) may use API(s)
    * not sure what API(s) yet


## [Link to Initial Main Project File](app.mjs) 

A link to the main project file

## Annotations / References Used

Placeholder:
1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)


