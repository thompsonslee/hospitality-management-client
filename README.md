# Hospitality Management

Full Point of sale software for managing your bar/venue.

this projects consists of a React Frontend and an Express Api for the backend.

the Frontend was created using a React, Tailwind and TypeScript stack.

The Api was built using Express, Mongoose, passportJS, and is capable of creating login sessions and serving/receiving secure cookies over HTTPS connections.

both the React App and the nodeJS Api are each hosted on their own AWS EC2 Instance running nginx and both are configure to communicate with each other in regards to CORS and HTTPS connections.

* Live Demo: https://hospo-management.online/
* Api Repository: https://github.com/thompsonslee/hospitality-management-api


## Features


* an inventory management system for moving and ordering stock.
* ability to define Areas in your Venue to store and/or sell/buy stock.
* a UI for creating till layouts and then using them to sell products based on your stock.
* a finance screen to view all transactions on your account.
* Account login/register features as well as a demo account feature.
## Getting Started

When registering a new account, I would recommend ticking the demo account option. this will give your account premade tills, premade areas and a history of transactions already performed.

Once you have registered and logged in, navigate to the Tills Page and click 'display' on Front Bar Till 1. this will allow you to use the till and sell stock based on what is stored in the Main Bar Area.

you Will see that some items are sold out. to fix this, you can either nagivate to areas/Main Bar and click 'order items' to order items, or nagivate to areas/storage and click 'Transfer Items' to move stock from storage to the main bar. 

If you have sold or ordered any items, you wil be able to see that transaction in the transactions page.
