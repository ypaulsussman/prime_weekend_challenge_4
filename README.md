# Trusty Suss® Real Estate

Y Paul Sussman: April 03rd, 2017; Version 1.0

## Application Overview
This was our fourth Prime Weekend Challenge; here, I used MondgoDB to build an application that searches movies, allowing a user to store their favorites.

## Getting Started

Fork, clone, or download the project, then run `npm install`.

In the `app.js` file, you'll need to replace the `mongoURI` string with the URI for your own database.

In the `movies.js` file, you'll need to replace the `process.env.OMDBAPI` config variable with your own OMDb API key. It's a useful service, especially for beginning developers, and I [highly recommend supporting them](https://www.patreon.com/omdb/posts) as you can.

## Built With

* HTML 5, CSS 3, Bootstrap, and AngularJS;
* Node.js, Express.js, and MondgoDB; and
* Heroku and mLab for hosting.

## Learning Value
Ironically, perhaps, for my first for project integrating MongoDB and AngularJS? My first major rabbit hole in this project revolved around Bootstrap and padding inheritance: here is where I truly begin to appreciate the power of the "Styles" pane inside Chrome's developer tools, as well as its "mouseover to inspect element" feature.

One great weakness of this project stems from my unfamiliarity, at the time, with how to manipulate data bindings inside an `ng-repeat`. Rather than exploring these to satisfaction, I met the project deadline by using the more-restrictive search parameter that OMDb offers (title, rather than search keyword.)

As a result, the search feature only displays exact title matches: "_Big Trouble Little China_" returns nothing, for example, because of that missing "_in_." (It's no coincidence that my immediately-following projects, the [Karen-English Picture Dictionary](https://github.com/ypaulsussman/karen_english_picture_dictionary) and the [AchieveMpls Coaching Experience](https://github.com/AchieveMpls/achieve-mpls-app), are both stacked to the ceiling with `ng-repeat`'s...!)

Finally, several weeks after I had completed the project, OMDb (_very reasonably_) cancelled their support for API calls lacking a key. One Patreon pledge later, I had the key: but it took me the better part of a Saturday afternoon to deduce how to use it.

From a false turn using a separate, `gitignore`'d config file (_Heroku was not impressed_) to blithely attempting to run environmental variables on the client, it was a... protracted experience. Still, it was one of the first times in my career as a developer where I had, with no support, taught myself several new technologies in order to solve a problem I had not even been able to elucidate at the beginning of the day. That was very rewarding: and, in all likelihood, a process I'll need to get used to.




![](screenshots/01_buyer_screenshot.png)


![](screenshots/02_seller_screenshot.png)


![](screenshots/03_login_screenshot.png)


![](screenshots/04_admin_screenshot.png)




# Weekend Challenge 4 - Mongo and Bootstrap

Welcome to weekend challenge 4!

This weekend, you will take on the role of an application developer for a real estate company. You will be working with data that we provide you. It will be a collection called “listings”. Inside of it, you will find information for properties that are either for Rent or for Sale.

You job is to get this Data on the DOM, accounting for the inconsistent datatypes that are possible with MongoDB. But additionally, let’s bring in Bootstrap to the mix to make sure that the application looks as good as possible.

Here are the requirements of the project:
* Create a Full Stack application from the ground up using jQuery, Node, and MongoDB.
* Work with the data set that we provide for you.
* Use Bootstrap to present the data.
* Account for the different data (“rent” versus “cost) and ensure that this is noted on the display of the information, by listing “For Rent” or “For Sale” based on which of the two properties that it has.

To work with the provided data:
* Download the provided file,
* Run this command in your Terminal: `mongoimport --db realestate --collection listings --file listingData.js`
* Note that you will need to run this from the folder which you download the ‘listingData.js’ to.

## Hard Mode
Create an interface for adding additional properties to the collection. You will need to give the user an option for either a Rent property, or a Sale property. Check out this Stack Overflow for information on how to accomplish this:
http://stackoverflow.com/questions/14453864/use-more-than-one-schema-per-collection-on-mongodb

## Pro Mode
Host the application on Heroku and mLabs. You will need to transfer the data up to mLabs. In will need to research to accomplish this.
