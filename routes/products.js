import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js'

const router = express.Router();
// router.use(cors());

const prisma = new PrismaClient();

// const prisma = new PrismaClient({
//     log: ["query", "info", "warn", "error"],
//   });

// Get all units
router.get("/all", async (req, res, next) => {
    const products = await prisma.Products.findMany();
    res.json(products);
  });


  // Get a unit by id
router.get("/get/:id", async (req, res) => {
    const id = req.params.id;
  
   // validate if ID is a number
    if (isNaN(id) ){
      res.status(400).json({message: "Invalid ID"});
      return;
    }
  
    const product = await prisma.Products.findUnique({
      where: {
        id: parseInt(id),
      }
    });
  
    product ? res.json(product) : res.status(404).json("Could not find a unit with that ID");
  });
  
  router.post("/purchase", async (req, res) => {
    // PLACEHOLDER

  });

  export default router;