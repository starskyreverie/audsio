
          
# eriv
A place to share and find audio clips, written in JavaScript.

## Contributing

DM me 

## Building

Pushes to GitHub automatically deploy the frontend to Netlify and the backend to Heroku. 

### `eriv/client`

The Ract frontend hosted on Netlify at [eriv.xyz](https://www.eriv.xyz).

To run: `npm start`

### `eriv/server`

The Node.js backend hosted on Heroku at [api.eriv.xyz](https://api.eriv.xyz).

Make sure to to create a `.env` file using [.env.example](server/.env.example) as a template.

## Technologies

### `eriv/client`

- React
- Redux (using redux-thunk middleware)
- Axios
- Formik
- Styled components
- JWT authentication

### `eriv/server`

- Node.js (using Express.js)
- AWS S3 buckets
- Multer 
- Bcrypt
- JWT authentication

## New Features

Considering it's already a PWA, I'll probably port this to android using cordova or react-native soon :)
