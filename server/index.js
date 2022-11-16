const express= require("express");
const app= express();
const mysql= require("mysql2");
const bodyParser = require("body-parser");
const cors= require("cors");
const { application } = require("express");


const db= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"fast123",
    database:"airport_management"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/api/get",(req,res)=>{
    const sqlGet="select * from clients;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


app.post('/api/post',(req,res)=>{
    const client_id=req.body.client_id;
    const fname=req.body.fname;
    const mname=req.body.mname;
    const lname=req.body.lname;
    const phone=req.body.phone;
    const email=req.body.email;
    const passport = req.body.passport;
    const sqlInsert='insert into clients values (?,?,?,?,?,?,?)';
    db.query(sqlInsert,[client_id,fname,mname,lname,phone,email,passport],(err,result)=>{
        if(err)
        res.send({err:err});
    })
})



app.delete('/api/remove/:id',(req,res)=>{
    const {id}=req.params;
    const sqlRemove='delete from clients where client_id=?';
    db.query(sqlRemove,[id],(err,result)=>{
        if(err)
        res.send({err:err});
    })
})


app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from clients where client_id=?;"
    db.query(sqlGet,[id],(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


app.put("/api/put/:id",(req,res)=>{
    const {id}=req.params;
    const client_id=req.body.client_id;
    const fname=req.body.fname;
    const mname=req.body.mname;
    const lname=req.body.lname;
    const phone=req.body.phone;
    const email=req.body.email;
    const passport = req.body.passport;
    const sqlRemove="update clients set client_id=?,fname=?,mname=?,lname=?,phone=?,email=?,passport=? where client_id=?";
    db.query(sqlRemove,[client_id,fname,mname,lname,phone,email,passport,id],(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


app.post("/login",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    db.query('select * from admin where username=? and password=?',[username,password],(err,result)=>{
        if(err)
        res.send({err: err})
        if(result.length>0)
        res.send(result);
        else
        {
            res.send({msg: 'Invalid Admin Login'})
        }
    })
})


app.listen(5000, ()=>{
    console.log("Server is running on port 5000!");
});
