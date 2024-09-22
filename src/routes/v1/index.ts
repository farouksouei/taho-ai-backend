import { Router } from "express";

import docsRouter from "./docsRoute";
import spendingRouter from "./spendingRouter";

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: "/docs",
    router: docsRouter,
  },
  {
    path: "/spendings",
    router: spendingRouter,
  }
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
