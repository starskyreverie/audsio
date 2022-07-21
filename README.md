# Audsio
A place to find and share audio files, written using the MERN stack.

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


## Building

Pushes to GitHub automatically deploy the frontend to Vercel and the backend to Heroku.

### `audsio/client`

The React frontend hosted on Vercel at [audsio.com](https://www.audsio.com).

To run: `npm start`

### `audsio/server`

The Node.js backend hosted on Heroku at [audsio.herokuapp.com](https://audsio.herokuapp.com/).

Make sure to to create a `.env` file using [.env.example](server/.env.example) as a template.

### `audsio/app`

The PWA created with Bubblewrap.

## Future Work

I'm mostly done with this project and all I'm really planning to do in the future is add an Alexa Skill that allows you to record and upload audio to Audsio. If that sounds interesting to you feel free to create an issue or PR or contact me somehow :)
