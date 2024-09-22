import { NextFunction, Request, Response } from "express";
import Spending from "../models/Spending";

export interface customRequest extends Request {
  user: any;
}

export interface customError extends Error {
  statusCode: number;
}

export type ControllerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export interface SpendingFilters {
  userid?: number;
  type?: string;
  model?: string;
  startdate?: string;
  enddate?: string;
  page?: string;
  limit?: string;
}

export interface SpendingPaginationResponse {
  spendings: Spending[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}
