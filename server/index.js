const express = require('express')
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const user = require('./models/user')
app.use(express.json())


app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

mongoose.connect('mongodb://localhost:27017/Chat');

app.get('/',(req,res)=> {
    res.json('test');
})
app.get('/profile',(req,res)=> {
    const {token} = req.cookies;
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
})
app.post('/register',async(req,res)=> {
    const {userName,password} = req.body;
    try
    {
        const createdUser = await user.create({userName,password});
        jwt.sign({userId:createdUser._id},"chat",{},(err,token)=> {
            if(err) 
            {
                console.log(err);
                throw err;
            }
            res.cookie('token',token).status(201).json({
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

app.listen(4000,()=> console.log('server is running'))