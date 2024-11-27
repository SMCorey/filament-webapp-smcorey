
import express from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../lib/utility.js";

const router = express.Router();
// router.use(cors());

const prisma = new PrismaClient();

// const prisma = new PrismaClient({
//     log: ["query", "info", "warn", "error"],
//   });

// GET ALL PRODUCTS
router.get("/all", async (req, res, next) => {
  const products = await prisma.Products.findMany();
  res.json(products);
});

// GET BY ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  // VALIDATE ID IS #
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  const product = await prisma.Products.findUnique({
    where: {
      product_id: parseInt(id),
    },
  });

  product
    ? res.json(product)
    : res.status(404).json("Could not find a unit with that ID");
});

router.post("/purchase", async (req, res) => {
  // VERIFY USER IS LOGGED IN
  if (!req.session || !req.session.email) {
    return res.status(401).send('Cannot Process Transaction, not logged in.');
  }

  // EXTRACT INPUT FROM BODY
  const {
    street,
    city,
    province,
    country,
    postal_code,
    credit_card,
    credit_expire,
    credit_cvv,
    cart,
    invoice_amt,
    invoice_tax,
    invoice_total,
  } = req.body;

  // VALIDATE INCLUSION
  if (
    !street ||
    !city ||
    !province ||
    !country ||
    !postal_code ||
    !credit_card ||
    !credit_expire ||
    !credit_cvv ||
    !cart ||
    !invoice_amt ||
    !invoice_tax ||
    !invoice_total
  ) {
    return res.status(400).send("Missing required purchase field(s).");
  }

  // VALIDATE CART
  const productIds = cart.split(",").map(Number);
  if (productIds.some(isNaN)) {
    return res.status(400).send("Invalid cart format.");
  }

  // GET USER ID FROM SESSION
  const userId = req.session.user_id;

  // CREATE PURCHASE
  const newPurchase = await prisma.Purchase.create({
    data: {
      customer_id: userId,
      street,
      city,
      province,
      country,
      postal_code,
      credit_card,
      credit_expire,
      credit_cvv,
      invoice_amt: parseFloat(invoice_amt),
      invoice_tax: parseFloat(invoice_tax),
      invoice_total: parseFloat(invoice_total),
      order_date: new Date(),
    },
  });

  // PROCESS CART
  const purchaseItemsData = productIds.reduce((acc, productId) => {
    //accumulator is an array of objects that accumulate qty for each product ID. Adding or incrementing products accordingly.
    const existingItem = acc.find((item) => item.product_id === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      acc.push({
        purchase_id: newPurchase.purchase_id,
        product_id: productId,
        quantity: 1,
      });
    }
    return acc;
  }, []);

  // INSERT PURCHASEITEM RECORDS
  // await PROMISE ALL - https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
  await Promise.all(
    purchaseItemsData.map((item) =>
      prisma.PurchaseItem.create({
        data: item,
      })
    )
  );

  // RESPONSE
  res.status(201).json({
    message: "Purchase completed successfully.",
    purchase: newPurchase,
    purchase_items: purchaseItemsData,
  });
});

export default router;
