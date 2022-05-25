# audsio

A place to find and share audio files - written in JavaScript.

## Contributing

DM on discord, reverie#8117

## Building

Pushes to GitHub automatically deploy the frontend to Vercel and the backend to Heroku.

### `audsio/client`

The React frontend hosted on Vercel at [audsio.com](https://www.audsio.com).

To run: `npm start`

### `audsio/server`

The Node.js backend hosted on Heroku at [audsio.herokuapp.com](https://audsio.herokuapp.com/).

Make sure to to create a `.env` file using [.env.example](server/.env.example) as a template.

## Technologies

### `audsio/client`

- React
- Redux (using redux-thunk middleware)
- Axios
- Formik
- Styled components
- JWT authentication

### `audsio/server`

- Node.js (using Express.js)
- AWS S3 buckets
- Multer
- Bcrypt
- JWT authentication
- MongoDB connection

## New Features Coming Up

Upcoming: sort posts by date/likes, backend pagination, about page, donation link, cordova port to iOS and Android
