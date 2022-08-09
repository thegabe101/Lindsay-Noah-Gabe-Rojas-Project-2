# shelfspace

## description

Shelfspace is an app designed for the ultimate book worm and avid collector, allowing for the simplification of cataloging their novels, manga, comics, and more. This app is deployed on Heroku, with many ideas in the oven for future improvements.

## table-of-contents

1. [user-story](#user-story)
2. [requirements](#requirements)
3. [composition](#composition)
4. [usage](#usage)
5. [reflections](#reflections)
6. [credits](#credits)
7. [contributors](#contributors)

## user-story

>**AS A** book collector who has a large collection
>
>**I WANT** an app that I catalog my collection in
>
>**SO THAT** I can keep track of what I own, what I want, and be able to sort my collection.

## requirements

>**GIVEN** a URL to the website
>
>**WHEN** I visit the site for the first time
>
>**THEN** I am presented with a page to login or sign up
>
>**WHEN** I choose to sign up
>
>**THEN** I am prompted to create a username and password
>
>**WHEN** I click on the sign-up button
>
>**THEN** my user credentials are saved and I am logged into the site
>
>**WHEN** I am logged in to the site
>
>**THEN** I am taken to a page in which to create a user profile
>
>**WHEN** I click finished
>
>**THEN** I am taken to a homepage with my library catalogues
>
>**WHEN** I click add catalogue
>
>**THEN** I am presented with a prompt to choose a name for the catalogue and the genre of the books in the catalogue
>
>**WHEN** I click finished
>
>**THEN** I am taken back the homepage with the catalogues on it
>
>**WHEN** I click a catalogue
>
>**THEN** I am presented with a search bar to search for a book to add by title or author
>
>**WHEN** I click finished
>
>**THEN** my book is added to the catalogue and I am taken back to the catalogue homepage
>
>**WHEN** I click a catalogue with a book in it
>
>**THEN** I am taken to a new webpage with a display of the various books inside of it
>
>**WHEN** I click a specific book
>
>**THEN** I am taken to a modal display of the book and information about it including author, title, year published, and images of the author and the book cover

## composition

This app is composed of several packages and technologies:
- [Sequelize](https://sequelize.org/)
- [Tailwind](https://tailwindcss.com/)
- [DotENV](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Heroku](https://heroku.com/)
- [Connect Session Sequelize](https://www.npmjs.com/package/connect-session-sequelize)
- [Handlebars](https://handlebarsjs.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Express Session](https://www.npmjs.com/package/express-session)

It also involved the usage of the app, [Insomnia](https://insomnia.rest/), which is used outside of the users code editing software as a standalone application.


## usage

This web application is designed with the ultimate book worm in mind. Users can create a profile, create catalogs, and then begin to log the books that they own in their collection. Books can be stored in multiple catalogs, allowing users to sort through their collection based on their preferences and locate their books within the catalogs, this way they can avoid attempting to track down their physical copies without information beforehand, which is especially helpful to those who have rather large collections.

Users may also add comments to their individual books that are private to them, allowing them to look back at their thoughts on a book they've read without having to shout out into the void what they rated the book. 

## reflections


## resources

List of resources utilized in this project:
- [Carnegie Museums](http://web-accessibility.carnegiemuseums.org/design/color/)
- [Font Awesome](https://fontawesome.com/icons)
- [Open Library](https://openlibrary.org/dev/docs/api/books)
- [Unsplash](https://unsplash.com/)
- [W3 Schools](https://www.w3schools.com/)
    - [Navbar Build](https://www.w3schools.com/howto/howto_js_mobile_navbar.asp)
- [Canva](https://www.canva.com/)
- [Favicon Generator](https://favicon.io/favicon-converter/)

## contributors

Shout out to the team,
- [Git Administrator, Gabe Sowa](https://github.com/thegabe101)
- [Project Manager, Lindsay Lewis](https://github.com/lindslewis)
- [Noah Carralero](https://github.com/thenoahac)
- [Robertson (Gio) Rojas](https://github.com/gio2nice)

And shout out to our friends who lended a hand,
- [Axel Kern](https://github.com/Axeljk)



