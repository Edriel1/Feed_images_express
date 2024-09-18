import dotenv from 'dotenv';

import express from 'express';
import {resolve} from 'path';

import userRoutes from './src/routes/User.route';
// import tokenRoutes from './routes/tokenRoutes.js'
 import postRoutes from './src/routes/post.route';

class App { //facade
  constructor(public app:any = express()) {
    
    this.middlewares();
    this.route();
  }
  

  middlewares() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  route() {
     this.app.use('/user/', userRoutes);
    // this.app.use('/tokens/', tokenRoutes);
     this.app.use('/post/', postRoutes);
  }
}

export default new App().app;
