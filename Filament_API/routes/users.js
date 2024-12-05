import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js'
import passValidator from '../lib/passpolicy.js';

const router = express.Router();

const prisma = new PrismaClient();

router.use(express.json());

router.post('/signup', async (req,res) => {
  // GET USER INPUT
  console.log("Body: ",req.body);
  const { email, password, firstName, lastName } = req.body;

  // VALIDATE INPUTS
  if(!email || !password || !firstName || !lastName) {
    return res.status(400).send('Missing required fields');
  }
  // VALIDATE PASSWORD
  else if(!passValidator.validate(password)){
    return res.status(400).send('Password does not meet requirements. ' + passValidator.validate(password, {list: true}));
  }

  // CHECK FOR EXISTING USER
  const existingUser = await prisma.User.findUnique({
    where: {
      email: email,
    }
  });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // HASH PASSWORD
  const hashedPassword = await hashPassword(password);

  // ADD USER TO DB
  const user = await prisma.User.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword
      },
    });

  // SEND RESPONSE
  res.json({'user' : email});
});

router.post('/login', async (req,res) => {
  // GET INPUT
  const { email, password } = req.body;

  // VALIDATE INPUTS
  if(!email || !password) {
    return res.status(400).send('Missing required fields');
  }

  // FIND USER IN DB
  const existingUser = await prisma.User.findUnique({
    where: {
      email: email,
    }
  });
  if (!existingUser) {
    return res.status(404).send('User not found');
  }

  // COMPARE/VERIFY PASSWORD
  const passwordMatch = await comparePassword(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(401).send('Invalid password');
  }

  // SESSION SETUP
  req.session.email = existingUser.email;
  req.session.user_id = existingUser.customer_id;
  req.session.first_name = existingUser.first_name
  req.session.last_name =  existingUser.last_name;
  console.log('User ID: ' + req.session.user_id +'\nUser Email: ' + req.session.email + '\nUser First Name: ' + req.session.first_name + '\nUser last Name: ' + req.session.last_name);

  // SEND RESPONSE
  res.send('Login successful');
});

router.post('/logout', (req, res) => {
  // DESTROY SESSION
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Logout failed.');
    }
    // CLEAR COOKIE
    res.clearCookie('connect.sid', { path: '/' }); 
    res.send('Successful logout');
  });
});


router.get('/getSession', (req, res) => {
  // CHECK IF SESSION EXISTS & GET SESSION DETAILS
  if (req.session && req.session.email) {
    res.json({
      'user_id': req.session.user_id,
      'email': req.session.email,
      'first_name': req.session.first_name,
      'last_name': req.session.last_name
    });
  } else {
    res.status(401).send('Not logged in.');
  }
});


export default router;