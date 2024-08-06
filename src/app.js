import cors from 'cors';
import express from 'express';
import { connectDB } from '../DB/connection.js';
import indexRouter from './modules/index.router.js';
import { globalErrorHandling } from './utils/errorHandlingService.js';
import cookieParser from 'cookie-parser';
import { makeAdmin } from './utils/makeAdmin.js'

export const appRouter = app => {
  app.use(cookieParser());
  app.use(express.json({}));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({}));

  //connect database
  connectDB();

  //Make Super Admin
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
