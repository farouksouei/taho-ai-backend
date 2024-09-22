import { Request, Response, NextFunction } from "express";
import {
  createSpending,
  getSpendings,
  getSpendingById,
  updateSpendingById,
  deleteSpendingById,
} from "../services/spendingService";
import { SpendingFilters } from "../types/customDefinition"; // Import the type
import { createSpendingSchema, updateSpendingSchema } from "../validation/spendingValidation"; // Import the validation schemas

// POST /spendings - Create a new spending record
export const createSpendingRecord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createSpendingSchema.validateAsync(req.body); // Validate request body

    const spending = await createSpending(req.body);

    return res.status(201).json({
      data: spending,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

// GET /spendings - Fetch all spending records with optional filters and pagination
export const getAllSpendings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters: SpendingFilters = {
      userid: req.query.userid ? parseInt(req.query.userid as string, 10) : undefined,
      type: req.query.type as string | undefined,
      model: req.query.model as string | undefined,
      startdate: req.query.startdate as string | undefined,
      enddate: req.query.enddate as string | undefined,
      page: req.query.page as string | undefined,
      limit: req.query.limit as string | undefined,
    };

    const spendings = await getSpendings(filters);

    return res.status(200).json({
      data: spendings.spendings,
      totalRecords: spendings.totalRecords,
      currentPage: spendings.currentPage,
      totalPages: spendings.totalPages,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

// GET /spendings/:id - Fetch a single spending record by ID
export const getSpending = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const spending = await getSpendingById(parseInt(id, 10));

    return res.status(200).json({
      data: spending,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

// PUT /spendings/:id - Update an existing spending record by ID
export const updateSpending = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await updateSpendingSchema.validateAsync(req.body); // Validate request body

    const updatedSpending = await updateSpendingById(parseInt(id, 10), req.body);

    return res.status(200).json({
      updated: updatedSpending,
      message: updatedSpending ? "Spending updated successfully." : "Failed to update spending.",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /spendings/:id - Delete a spending record by ID
export const deleteSpending = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await deleteSpendingById(parseInt(id, 10));

    return res.status(200).json({
      deleted: deleted,
      message: deleted ? "Spending deleted successfully." : "Failed to delete spending.",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
