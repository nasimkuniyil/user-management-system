import { NextFunction, Request, Response } from "express";

function errorHandler(err:any, req:Request, res:Response, next:NextFunction) {
  console.error("error middleware : ",err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

export default errorHandler;
