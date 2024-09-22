import { Router } from "express";
import { validateRequest } from "../../middleware";
import {
  createSpendingRecord,
  getAllSpendings,
  getSpending,
  updateSpending,
  deleteSpending,
} from "../../controllers/spendingController";
import {
  createSpendingSchema,
  updateSpendingSchema,
} from "../../validation/spendingValidation";

const spendingRouter = Router();

// Route to create a new spending record
spendingRouter.post("/", validateRequest(createSpendingSchema), createSpendingRecord);

// Route to get all spending records with optional filters and pagination
spendingRouter.get("/", getAllSpendings);

// Route to get a single spending record by ID
spendingRouter.get("/:id", getSpending);

// Route to update an existing spending record by ID
spendingRouter.put("/:id", validateRequest(updateSpendingSchema), updateSpending);

// Route to delete a spending record by ID
spendingRouter.delete("/:id", deleteSpending);

export default spendingRouter;

/**
 * @swagger
 * tags:
 *   name: Spending
 *   description: Spending management
 */

/**
 * @swagger
 * /v1/spendings:
 *   post:
 *     summary: Create a spending record
 *     description: Create a new spending entry.
 *     tags: [Spending]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *               count:
 *                 type: integer
 *               type:
 *                 type: string
 *               model:
 *                 type: string
 *             example:
 *               userid: 1
 *               count: 100
 *               type: "Food"
 *               model: "Credit Card"
 *     responses:
 *       "201":
 *         description: Created
 *
 *   get:
 *     summary: Get all spending records
 *     description: Fetch all spending records with optional filters.
 *     tags: [Spending]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userid
 *         schema:
 *           type: integer
 *         description: Filter by user ID.
 *       - in: query
 *         name: startdate
 *         schema:
 *           type: string
 *         description: Filter by start date.
 *       - in: query
 *         name: enddate
 *         schema:
 *           type: string
 *         description: Filter by end date.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by spending type.
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Filter by spending model.
 *     responses:
 *       "200":
 *         description: OK
 *
 * /v1/spendings/{id}:
 *   get:
 *     summary: Get a single spending record by ID
 *     description: Fetch a spending record by its ID.
 *     tags: [Spending]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the spending record to fetch.
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 *
 *   put:
 *     summary: Update a spending record
 *     description: Update an existing spending record by its ID.
 *     tags: [Spending]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *               count:
 *                 type: integer
 *               type:
 *                 type: string
 *               model:
 *                 type: string
 *             example:
 *               userid: 1
 *               count: 150
 *               type: "Entertainment"
 *               model: "Cash"
 *     responses:
 *       "200":
 *         description: OK
 *
 *   delete:
 *     summary: Delete a spending record
 *     description: Delete a spending record by its ID.
 *     tags: [Spending]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the spending record to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       "200":
 *         description: OK
 */
