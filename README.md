# Bri-Commerce (Brian's E-commerce Site)

## Overview
Sometimes the ordinary e-commerce websites are a bit too boring. I have a simple and fun solution... Bri-Commerce!

Bri-Commerce is an e-commerce website that allows a user to add their username and bio. Users can also add their carts, which contain items and prices. Users can also add their inventories, which contain items and their descriptions.


## Data Model

The application will store Users, Carts, and Inventories

* useres will have a corresponding bio
* each cart can have multiple items, items will have prices
* each cart is also listed under a username
* each inventory can have multiple items, items will have descriptions
* each inventory is also listed under a username

An Example User
```javascript
{
    username: "brianzou"
    bio: "A really cool guy"
}

```

An Example Cart with Items

```javascript
{
    username: "brianzou"
    items: ["xbox", "tissue box"]
    itemPrices: [500, 5]
}
```

An Example Inventory with Items

```javascript
{
    username: "brianzou"
    items: ["hat", "lantern"]
    itemDescriptions: ["nice looking hat", "very bright"]
}
```

#### Database setup (Mac): 
* brew services start mongodb-community
* mongosh
* use finaldb
* db.dropDatabase() // to drop
* db.users.find() // to find
* db.users.insertOne({username: "Brian", bio: "A great guy."});
* db.users.insertOne({username: "James", bio: "Make it double!"});

* db.carts.find();
* db.carts.insertOne({username: "Brian", items: ['apple', 'banna'], itemPrices: [10, 20]});
* db.carts.insertOne({username: "James", items: ['tissue', 'pencil'], itemPRices: [4, 5]});

* db.inventories.find();
* db.inventories.insertOne({username: "Brian", items: ['grape', 'pear'], itemDescriptions: ['good', 'bad']});
* db.inventories.insertOne({username: "James", items: ['salt', 'pepper'], itemDescriptions: ['b', 'c']});


## [Link to Schemas](db.mjs) 

## Wireframes

* Note that the wireframe and the completed application may be different. I will meeting the minimum requirements without necessarily implementing all of the details in the wireframe.

/ - home page with items you can purchase (home page does not contain imagesm instead it allows a user to add their username, and their bio)

![list create](documentation/bricommerce_home.png)

/cart_page - page for your shopping cart (images not in finalized version of project, Schema also different)

![list](documentation/bricommerce_cart.png)

/inventory_page - page for showing the items you purchased and own (images not in finalized version of project, Schema also different)

![list](documentation/bricommerce_inventory.png)

/item_name - page that shows an item with its review and description (This is not included in the finalized version of my project)

![list](documentation/bricommerce_item.png)

/profile - page for showing your profile (This is not included in the finalized version of my project)

![list](documentation/bricommerce_profile.png)


Note: I have altered my final project in some of the ways from the wireframe:
1. I will not be including a profile page
2. I will not be including an item page
3. I will not be including images with any of the items.
4. The Schemas are different as well
5. There are other differences from the wireframe. However, I have reached the minimum requirements for the project.


## Site map

![list](documentation/bricommerce_sitemap.png)

Note that the site map is different from the final project, where the home page, cart_page, and inventory_page are on the same level, and the other pages (item page and profile page) are not included.

## User Stories or Use Cases
1. as a user, I can add a username and a bio
2. as a user, I can access a cart_page and inventory_page
3. as a user, I can add items to a cart with respective values
4. as a user, I can add items to an inventory with respective descriptions
5. as a user, I can remove a cart
6. as a user, I can remove an inventory

## Research Topics

### (2 points) dotenv

#### Research on dotenv:
1. .env files are associated with the dotenv package in various programming languges
2. .env is used to manage environment variables. These are useful for separating configuration settings from application code, such as API keys, db passwords, or other secrets you don't want in public source code
3. dotenv is a package in Node.js and other language 
4. .env files help manage differences in development, testing, and production environments

Installation + Setup Process
```
npm install dotenv
```

1. Create file called .env in root directory
2. Add environment specific variables in the form of NAME=VALUE, such as:

```
DB_HOST = localhost
DB_USER = root
DB_PASS = 123
```

In the context of my project, .env stores the mongodb DSN. In my local, it is localhost, while in my actual deployment it is the AWS address. To load .env, we use process.env.DB_HOST

It is good practice to never commit the .env to version control. We do this by putting our .env in our gitignore file

Our use cases for .env can be summarized as
* Storing credentials: API keys, DB passwords, sensitive information
* Configuration Settings: settings for development, testing, and production environment 
* Feature Flags: Enable/disable features in different environments without changing the codebase

### (3 points) Tailwind.CSS

#### Research on tailwind.css:
Some key features of tailwind are:
1. Utility-First: Tailwind uses utility classes to style elements. These are small, single-purpose classes that control one CSS property (like padding, margin, font size, etc.).
2. Responsive Design: Tailwind includes responsive variants for each utility, making it easy to build responsive designs.
3. Customization: It offers deep customization through a configuration file, allowing you to define your design system
4. Performance: Since you use only the classes you need the final CSS bundle can be very small

To get started, you want to
```
npm install -D tailwindcss
npx tailwindcss init
npx tailwindcss -i ./public/stylesheets/input.css -o ./public/stylesheets/output.css --watch
```

We have to run the
```npx tailwindcss -i ./public/stylesheets/input.css -o ./public/stylesheets/output.css --watch```
any time we update our file to have the changes reflected in our tailwind output css file. 

### (5 points) Amazon AWS

#### Research on AWS: To deploy project to Amazon AWS + custom domain, the following steps should be done:
1. Via Amazon Amplify, link GitHub repo to Amplify to create a serverless app
2. To connect to a custom domain, navigate to Route 53 and create a new hosted zone
3. Under the hosted zone, create a new hosted zone with the respective domain
4. Navigate to domain provider (e.g. GoDaddy.com), and update to DNS management
5. Update your nameservers to the respective ones provided by the hosted zone on AWS
e.g. ns-1234.awsdns-12.org, ns-12.awsdns-12.com, ns-1234.awsdns-12.co.uk, ns-123.awsdns-12.net
6. Update the DNS records by adding a new CNAME entry with the name provided by AWS
7. Wait about 24-48 hours for the updates to propogate, after which your website should now be hosted on AWS and visible on your domain

#### Alternatively, deploying an EC2 instance (This is what I went with)
1. Used commandline, following AWS commands outlined in source 2
2. After connecting, complete installations in the command line using sudo
3. Install necessary packages and set up Mongo
4. Run pm2 start app.mjs (after npm install pm2 -g)
5. Visit app via public ip address below

#### HTTPS Setup
1. To add an SSL, I used ZeroSSL along with the setup guide provided in source 8
2. I first needed to verify my domain, done by creating a route to a text file
3. After which, I received my certificate and a private key
4. I added the certificate and private key to the .env file so that they are not committed to the github
5. Afterwards, I added a credentials object and an https server that listens on port 8443

#### [Link to AWS Deployment](https://54.224.147.85/)

Total points: 10/10


## [Link to Main Project File](app.mjs) 


## Github commit to alternative origin
git remote set-url --add --push origin https://github.com/nyu-csci-ua-0467-001-002-fall-2023/final-project-brianzou03.git 
git remote set-url --add --push origin https://github.com/brianzou03/bri-commerce.git

## Annotations / References Used

1. [AWS Amplify Deployment Documentation](https://aws.amazon.com/getting-started/guides/deploy-webapp-amplify/)
2. [EC2 Node + Mongo Deployment video](https://www.youtube.com/watch?v=7vf210p2tJg)
3. [EC2 Setup Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
4. [Tailwind CSS documentation](https://tailwindcss.com/docs/utility-first)
5. [Tailwind VSCode setup](https://tailwindcss.com/docs/editor-setup)
6. [dotenv documentation](https://www.npmjs.com/package/dotenv)
7. [dotenv guide](https://medium.com/@thejasonfile/using-dotenv-package-to-create-environment-variables-33da4ac4ea8f)
8. [HTTPS certificate with Node to EC2](https://www.youtube.com/watch?v=q-XEGbipOVw)
