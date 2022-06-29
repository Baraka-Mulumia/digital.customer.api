import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
} from "../controllers/customers.controller.mjs";

import { Router } from "express";

const customerRouter = Router();

customerRouter.route("/").get(getAllCustomers).post(createCustomer);
customerRouter.route("/:id").get(getCustomerById).delete(deleteCustomer);

export default customerRouter;
