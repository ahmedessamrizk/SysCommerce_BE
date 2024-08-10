import cors from 'cors';
import express from 'express';
import { connectDB } from '../DB/connection.js';
import indexRouter from './modules/index.router.js';
import { globalErrorHandling } from './utils/errorHandlingService.js';
import cookieParser from 'cookie-parser';
import { makeAdmin } from './utils/makeAdmin.js';

export const appRouter = app => {
  //setup middlewares
  app.use(cookieParser());
  app.use(
    cors({
      origin: [
        'https://auvnet-assessment.netlify.app',
        process.env.frontendBaseURL
      ],
      credentials: true
    })
  );
  app.use(express.json({}));
  app.use(express.urlencoded({ extended: false }));

  //connect database
  connectDB();

  //Intialize superAdmin account when start the server
  makeAdmin();

  //Api Setup
  app.use(process.env.BASEURL, indexRouter);

  //Invalid routing
  app.use('*', (req, res, next) => {
    next(
      Error('404 Page not found In-valid Routing or method', { cause: 404 })
    );
  });

  //Error handling
  app.use(globalErrorHandling);
};
