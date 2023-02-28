import  express from "express";
import {getUsers, updateUser} from "../db/index.js";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express()

app.use(cors());
app.use(bodyParser.json());

app.get('/',(_req,res) => {
  res.send('Hello world')
})

app.post('/api/auth', (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    getUsers()
      .then(({data}) => {
        const [user] = data.users.map(user => {
          if(email === user.email && password === user.password) return user;
        })
        if(user) res.send(JSON.stringify({user: user}))
        else res.send({user: null});
      })
      .catch(_err => res.status(500).send('Internal Server Error'));
});

app.post('/api/update',(req,res) => {
  const { _id } = req.body;
  updateUser(_id, req.body)
    .then(user => {
      res.send(JSON.stringify(user));
    })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})