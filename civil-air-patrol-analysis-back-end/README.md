# Civil Air Patrol Analysis Back-End

The Civil Air Patrol Analysis Back-End is the web application infrastructure to crowdsource annotations of freely and publicly available Civil Air Patrol imagery.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
Node.js
MongoDB
```

### Installing 

```
npm install
```

If necessary follow steps on bottom comment of the following link to fix depreication method issue.
* https://github.com/edwardhotchkiss/mongoose-paginate/issues/144

## Development/Deployment

```
npm start
```

Once the application is running you can check the root URL at http://localhost:3000/.

## Built With
* [body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware.
* [compression](https://github.com/expressjs/compression) - Node.js compression middleware.
* [config](https://github.com/lorenwest/node-config) - Node.js Application Configuration
* [cookie-parser](https://github.com/expressjs/cookie-parser) - Parse HTTP request cookies.
* [express](http://expressjs.com/) - The Backend API Framework.
* [gridfs-stream](https://github.com/aheckmann/gridfs-stream) - Easily stream files to and from MongoDB.
* [mongodb](https://www.mongodb.com/) - Document database.
* [mongoose](http://mongoosejs.com/) - Object modeling API.
* [mongoose-paginate](https://github.com/edwardhotchkiss/mongoose-paginate) - Mongoose.js (Node.js & MongoDB) Document Query Pagination.
* [morgan](https://github.com/expressjs/morgan) - HTTP request logger middleware for node.js.
* [node](https://github.com/nodejs/node) - A JavaScript run-time environment.
* [nodemon](https://github.com/remy/nodemon) - Monitor for any changes in your node.js application and automatically restart the server.
* [shelljs](https://github.com/shelljs/shelljs) - Portable Unix shell commands for Node.js.


## Authors
* Daniel Ribeirinha-Braga (MITLL)

## Acknowledgments
* Andrew Weinert  (MITLL)

## Distribution Statement
This work was performed under the following financial assistance award 70NANB17Hl69 from U.S. Department of Commerce, National Institute of Standards and Technology.
