const express = require('express')
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const user = require('./models/user')
const cookieParser = require('cookie-parser')
const ws = require('ws')
app.use(express.json())

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

mongoose.connect('mongodb://localhost:27017/Chat');
const salt = bcrypt.genSaltSync(10);
app.get('/',(req,res)=> {
    res.json('test');
})
app.get('/profile',(req,res)=> {
    const {token} = req.cookies?.token;
   if(token)
   {
    jwt.verify(token,"chat",{}, (err,data)=> 
        {
            if(err)
            {
                console.log(err)
                throw err;
            }
            const {id,userName} = data
            res.json(data);
        })
   }
   else
   {
    res.status(420).json('no token')
   }
})

app.post('/login',async(req,res)=> {
    const {userName,password} = req.body
    const isUser = await user.findOne({userName})
    if(isUser)
    {
        const isPass = bcrypt.compareSync(password,isUser.password);
        if(isPass)
        {
            jwt.sign({userId:isUser._id,userName},"chat",{},(err,data)=> {
                if(err)
                    throw err;
                res.cookie('token',data,{sameSite:'none',secure:true}).json({
                    id:isUser._id,

                })
            })
        }
    }
})

app.post('/register',async(req,res)=> {
    const {userName,password} = req.body;
    try
    {
        const hashedPassword = bcrypt.hashSync(password,salt)
        const createdUser = await user.create({userName,password:hashedPassword});

        jwt.sign({userId:createdUser._id,userName},"chat",{},(err,token)=> {
            if(err) 
            {
                console.log(err);
                throw err;
            }
            res.cookie('token',token,{sameSite:'none',secure:true}).status(201).json({
                _id:createdUser._id,
                userName:createdUser.userName
            })
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({msg:"Internal Error"})
    }

})

const server = app.listen(4000,()=> console.log('server is running'))

const wss = new ws.WebSocketServer({server})
wss.on('connection',(connection,req)=> {
    console.log('connected');
    connection.send('hello');
    const cookies = req.headers.cookie
    if(cookies)
    {
       const tokenString =  cookies.split(';').find(str=> str.startsWith('token = '));
       console.log(tokenString)
       if(tokenString)
       {
        const token = tokenString.split('=')[1];
        if(token)
        {
            jwt.verify(token,"chat",{},(err,data)=> {
                if(err)
                    throw err;
                const {userId,userName} = data;
                connection.userId = userId;
                connection.userName = userName;
             })
        }
       }
    }
    // showing who is online
    [...wss.clients].forEach(client =>{
        client.send(JSON.stringify(
            {
                online:[...wss.clients].map(c => ({userId:c.userId,userName:c.userName}))
            }
            
        ))
    })
})
