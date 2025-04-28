# JOB APPLICATION LEDGER


# SCREENSHOTS
## fetching and updating data in local storage.

## Migrating from useState to useReducer for a cleaner state handling and separating it in one file.

![Screenshot](./src/img/applicationReducer.png)

## created an ApplicationContext to share the state, and dispatch from use reducer. and wrap its child by the provider.

Application Context
![Screenshot](./src/img/ApplicationContext.png)

Wrapping the child with ApplicationProvider
![Screenshot](./src/img/wrapping%20.png)

## Input page
![Screenshot](./src/img/input.png)

## Lists of Job applied for 
![Screenshot](./src/img/lists.png)  

## Archived applications that are no longer active
![Screeenshot](./src/img/archivedApp.png)

# FUTURE IMPROVEMENTS
1. add authentication or login feature
2. edit update the job application 
3. use database for storing data.


# Issues I had
## I had an issue in refreshing a page after I deploy it to netlify

I had an issue in refreshing seperate pages. Since I was using react router, and it says that netlify (server) tries to find a physical file eg. /lists/index.html  - this causes a 404 error.

since react router is SPA or SIngle Page Application and only has 1 index.html and react router handles the routing.

# How to fix

I created a file in **public** named **_redirects** and inside it I put a line of code **/*    /index.html   200**

**/*** - for any unknown route no matter what it is, (/lists, /input, /archived, etc.).
**/index.html** - redirect them to /index.html - where your React app lives and let the react router handles it
**200** - send an HTTP 200 ok status