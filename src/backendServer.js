// server.js
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 4000;
const secretKey = 'Xy5rWv2Z8AqBn3SpK9MlP4oQ'; 

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));


const users = [
  {
    id: 1,
    username: 'denny',
    password: 'denny123',
  },
  {
    id: 2,
    username: 'dexx',
    password: 'd3nxy12',
  },
  { id: '3',
   username: 'testx',
   password: 'Denny1234' }
];

// Authentication route
app.post('/login', (req, res) => {

  console.log("Data from front end", req.body);
    
  const { username, password } = req.body.user;

  const user = users.find((u) => u.username === username && u.password === password);


  if (!user) {
    return res.status(401).json({ message: 'User Authentication failed' });
  }
  

  // Generate and send a JWT
  const token = jwt.sign({ userId: user.id, username: user.username }, 
    secretKey, { expiresIn: '1h' });

  const responseObj = {
    token,
    message: 'Authentication successful',
    user: user
  };

  res.status(200).json(responseObj);
});



// Protected route for testing authentication

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  console.log("Auth Token", req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized Action' });
  }

  jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    // If the token is valid, you can access its payload in decoded
    req.user = decoded;
    next();
  });
}

app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route' });
});+




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
