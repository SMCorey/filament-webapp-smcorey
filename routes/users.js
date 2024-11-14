import express, { json } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js'

const router = express.Router();

const prisma = new PrismaClient();

router.use(express.json());

router.post('/signup', async (req,res) => {
  // get user inputs
  console.log("Body: ",req.body);
  const { email, password, firstName, lastName } = req.body;
  // validate the inputs (to-do: validate email, enforce password policy)
  if(!email || !password || !firstName || !lastName) {
    return res.status(400).send('2Missing required fields' + req.body.email);
  }

  // check for existing user
  const existingUser = await prisma.User.findUnique({
    where: {
      email: email,
    }
  });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // hash (encrypt) the password
  const hashedPassword = await hashPassword(password);

  // add user to database
  const user = await prisma.User.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword
      },
    });

  // send a response
  res.json({'user' : email});
});

router.post('/login', async (req,res) => {
  // get user inputs
  const { email, password } = req.body;

  // validate the inputs
  if(!email || !password) {
    return res.status(400).send('Missing required fields');
  }

  // find user in database
  const existingUser = await prisma.User.findUnique({
    where: {
      email: email,
    }
  });
  if (!existingUser) {
    return res.status(404).send('User not found');
  }

  // compare/verify the password entered
  const passwordMatch = await comparePassword(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(401).send('Invalid password');
  }

  // setup user session data
  req.session.email = existingUser.email;
  req.session.user_id = existingUser.id;
  req.session.name = existingUser.firstName + ' ' + existingUser.lastName;
  console.log('logged in user: ' + req.session.email);

  // send response
  res.send('Login successful');
});

router.post('/logout', (req,res) => {
  req.session.destroy();
  res.send('Successful logout');
});

router.get('/getSession', (req,res) => {
  // return logged in user  
  res.json({ 'user' : req.session.email});
});


export default router;