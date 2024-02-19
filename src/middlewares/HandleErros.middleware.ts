import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

class HandleErros {
  public static execute = (
    error: unknown,
    _: Request,
    res: Response,
    __: NextFunction
  ) => {
    if (error instanceof AppError) {
      return res.status(error.status).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.flatten().fieldErrors });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  };
}

export const handleErros = HandleErros.execute
