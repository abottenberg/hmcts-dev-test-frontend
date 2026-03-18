# HMCTS Dev Test Frontend
This is the frontend for the brand new HMCTS case management system.
Users can:
- View tasks
- Create new tasks
- Update task status
- Delete tasks

The application consists of a Node.js backend and an Express/Nunjucks frontend.

## Tech Stack

- Node.js
- TypeScript
- Express
- Nunjucks
- Jest

## Running the Application

To begin with, you should be able to run this by running:
1) `yarn install`
2) `yarn webpack`
3) `yarn start:dev` or navigate to package.json and run the script manually

## Testing

To run the tests, use the following command:
`yarn test`

## Project Structure

- controllers/ → handles HTTP requests
- services/ → business logic and API calls
- routes/ → route definitions
- views/ → Nunjucks templates
