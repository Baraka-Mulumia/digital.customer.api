import CUSTOMER_LIST from "../data/customer-list.mjs";

export const getAllCustomers = (req, res) =>
  res.status(200).json(CUSTOMER_LIST);

export const createCustomer = async (req, res) => {
  const { first_name, last_name, email, gender, image } = req.body;

  //! validation can be done on the front end  and with a mongo schema
  if (!first_name || !last_name || !email || !gender) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (CUSTOMER_LIST.find((customer) => customer?.email === email)) {
    // email address already exists throw
    return res.status(409).json({ message: "Email address already exists" });
  }

  const newEntry = {
    id: CUSTOMER_LIST.length + 1,
    first_name,
    last_name,
    email,
    gender,
    image,
  };

  CUSTOMER_LIST.push(newEntry);

  return res.status(201).json(newEntry);
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  const customer = CUSTOMER_LIST.find((customer) => customer?.id === +id);

  if (!customer) {
    res.status(404).json({ message: "Customer not found" });
  }

  res.status(200).json(customer);
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  const customer = CUSTOMER_LIST.find((customer) => customer?.id === +id);

  if (!customer) {
    res.status(404).json({ message: "Customer not found" });
  }

  CUSTOMER_LIST.splice(CUSTOMER_LIST.indexOf(customer), 1);

  res.status(204).json();
};
