import dotenv from 'dotenv';
dotenv.config();
import './database/index.js';
import express from 'express';
import {resolve} from 'path';

// import alunoRoutes from './routes/AlunosRoutes.js';
// import userRoutes from './routes/userRoutes.js';
// import tokenRoutes from './routes/tokenRoutes.js'
// import fotoRoutes from './routes/FotoRoutes.js';

class App {
  constructor(public app:any = express()) {
    
    this.middlewares();
    this.route();
  }
  

  middlewares() {
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
  }

  route() {
    // this.app.use('/aluno/', alunoRoutes);
    // this.app.use('/user/', userRoutes);
    // this.app.use('/tokens/', tokenRoutes);
    // this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
