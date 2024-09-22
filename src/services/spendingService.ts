import Spending from "../models/Spending"; // Import the Spending model
import { Op } from "sequelize";
import { SpendingFilters, SpendingPaginationResponse } from "../types/customDefinition"; // Import the types


// Create a new spending entry
export const createSpending = async (payload: any) => {
  const spending = await Spending.create(payload);
  return spending;
};

// Get all spending records with optional filters
export const getSpendings = async (filters: SpendingFilters): Promise<SpendingPaginationResponse> => {
  const where: Record<string, any> = {};  // Use Record to define key-value pairs for the query

  // Apply filters if present
  if (filters.userid) where.userid = filters.userid;
  if (filters.type) where.type = filters.type;
  if (filters.model) where.model = filters.model;
  if (filters.startdate && filters.enddate) {
    where.createdat = {
      [Op.between]: [new Date(filters.startdate), new Date(filters.enddate)],
    };
  }

  // Default pagination values if not provided
  const page: number = filters.page ? parseInt(filters.page, 10) : 1;
  const limit: number = filters.limit ? parseInt(filters.limit, 10) : 10;
  const offset: number = (page - 1) * limit;

  const { count, rows } = await Spending.findAndCountAll({
    where,
    limit,
    offset,
  });

  return {
    spendings: rows,
    totalRecords: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  };
};

// Get a single spending record by ID
export const getSpendingById = async (id: number) => {
  const spending = await Spending.findByPk(id);
  if (!spending) {
    throw new Error("Spending record not found");
  }
  return spending;
};

// Update a spending record by ID
export const updateSpendingById = async (id: number, payload: any) => {
  const spending = await Spending.update(payload, { where: { id } });
  return spending;
};

// Delete a spending record by ID
export const deleteSpendingById = async (id: number) => {
  const result = await Spending.destroy({ where: { id } });
  return result;
};
