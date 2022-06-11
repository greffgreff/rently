# Rently frontend

## Overview

This repository corresponds to the NextJS frontend of Rently. NextJS was chosen for its server-side capabilities. Things like JWTs and OAuth credentials are managed on its server side. 

## C2 container model
![C2 model](https://i.imgur.com/34Nvkd4.jpg)

## User experience
Testing remote assessement testing and in person exploratory testing...

## Web pages 

### Home page
The index page, the first page users sees.

URI `/`, full URL `https://rently-io.herokuapp.com/`

![](https://i.imgur.com/TlHkYOm.png)

### Search page
A dedicated search page for querying listings by keyword and/or proximity to a free form address. All queries are made useing the [Search Service](https://github.com/rently-io/search-service).

URI `/listings`, full URL `https://rently-io.herokuapp.com/listings`

Query parameters:
| parameter | description | required |
|-----------|-------------|:--------:|
| `search`, string | Url encoded keyword(s) to search for a specific listing. Searches both listing descriptions and titles. | false |
| `address`, string | Url encoded freeform address to perform proximity searches. Works in conjunction with `range` parameter. | false |
| `range`, int | Range in kilometers to perform proximity searches. Works in conjunction with `address` parameter. | false |

#### Regular search page
Search page without any query. On load, fetches a collection of 20 random listings.

Exemple URL `https://rently-io.herokuapp.com/listings`

![](https://i.imgur.com/eiii9X0.png)

#### Search page with query
Search page when a query for `truck` is made with extended searhc options and suggestions shown. On load, fetches a collection of 20 listings fitting the query. Suggestions are fetched from [datamuse API](https://www.datamuse.com/api/) (not shown in C2 model).

Exemple URL `https://rently-io.herokuapp.com/listings?search=truck`

![](https://i.imgur.com/FXPoBHz.png)

### Login page
Page on which users can select a provider with which to login. Supported providers include Google, Facebook, and Twitter. Providers are treated equally on the website, no additional feature is given to one over the other.

URI `/login`, full URL `https://rently-io.herokuapp.com/login`

![](https://i.imgur.com/D1cGo2c.png)

### Account page
A page on which users are supposed to view various information regarding their activity and information. Currently, no features have been implemented other than the ability to delete ones account from the system. Users must be logged into to see this page. 

URI `/account`, full URL `https://rently-io.herokuapp.com/account`

![](https://i.imgur.com/oWhwmA6.png)

### Lease page
A page on which users can create listings by filling out a form with various fields. Users must be logged in in order to post a listing. Listings or posted on to the [Listing Service](https://github.com/rently-io/listing-service).

URI `/lease`, full URL `https://rently-io.herokuapp.com/lease`

Query parameters:
| parameter | description | required |
|-----------|-------------|:--------:|
| `id`, uuid string | An id of an existing listing. Used to perfom updates on a listing. | false |

> Listing data, including listing ownership is verified on both the frontend and backend. The backend blocks any attempt at modifying data if the request was not made by the owner.

![](https://i.imgur.com/aekd6oL.png)

### Listing page
Listings can be accessed individually on this page. Some information and functionality is remove depending on whether the user viewing the listnig is logged in and/or is the owner of the listing.

URI `/listings/{id}`, full URL `https://rently-io.herokuapp.com/listings/{id}`, where the `id` is that of an existing listing.

#### Listing page when not logged in
Location and leaser information is blocked from users that are not logged in.

Exemple URL `https://rently-io.herokuapp.com/listings/09d22d79-b95a-4d84-a760-a7b2218c5cff`

![](https://i.imgur.com/JnnZG3Q.png)

#### Listing page when logged in
Location and leaser information revealed when a user is logged in.

Exemple URL `https://rently-io.herokuapp.com/listings/09d22d79-b95a-4d84-a760-a7b2218c5cff`

![](https://i.imgur.com/hTjou1u.png)

#### Listing page when logged in and owner
When the owner of the listing is logged in, he can either remove the listing from the website or update it. Updating the listing redirects to the lease page with the data of the listing.

Exemple URL `https://rently-io.herokuapp.com/listings/09d22d79-b95a-4d84-a760-a7b2218c5cff`

![](https://i.imgur.com/cBsgy3g.png)
