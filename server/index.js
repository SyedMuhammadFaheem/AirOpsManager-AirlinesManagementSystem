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

//select
app.get("/api/get",(req,res)=>{
    const sqlGet="select * from clients;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})



app.get("/airplane/api/get",(req,res)=>{
    const sqlGet="select * from airplane;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.get("/flightStatus/api/get",(req,res)=>{
    const sqlGet="select * from FlightStatus;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


app.get("/airport/api/get",(req,res)=>{
    const sqlGet="select * from airport;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.get("/gates/api/get",(req,res)=>{
    const sqlGet="select * from gates;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


app.get("/reviews/api/get",(req,res)=>{
    const sqlGet="select * from customer_review;"
    db.query(sqlGet,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})



//insert
app.post('/api/post',(req,res)=>{

    const {client_id,fname,mname,lname,phone,email,passport}=req.body;
    const sqlInsert='insert into clients values (?,?,?,?,?,?,?)';
    db.query(sqlInsert,[client_id,fname,mname,lname,phone,email,passport],(err,result)=>{
        if(err)
        res.send({err:err});
    })
})

app.post('/airplane/api/post',(req,res)=>{

    const {airplane_id,max_seats}=req.body;
    const sqlInsert='insert into airplane values (?,?)';
    db.query(sqlInsert,[airplane_id,max_seats],(err,result)=>{
        if(err)
        res.send({err:err});
    })
})

//delete
app.delete('/api/remove/:id',(req,res)=>{
    const {id}=req.params;
    const sqlRemove='delete from clients where client_id=?';
    db.query(sqlRemove,[id],(err,result)=>{
        if(err)
        res.send({err:err});
    })
})

app.delete('/airplane/api/remove/:id',(req,res)=>{
    const {id}=req.params;
    const sqlRemove='delete from airplane where airplane_id=?';
    db.query(sqlRemove,[id],(err,result)=>{
        if(err)
        res.send({err:err});
    })
})

//view
app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from clients where client_id=?;"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.get("/airplane/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from airplane where airplane_id=?;"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.get("/flightStatus/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from FlightStatus where flightStatus_id=?;"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


app.get("/airport/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from airport where airport_code=?;"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.get("/gates/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from gates where gate_no=?;"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


app.get("/reviews/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="select * from customer_review where client_id=?;"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})


//update
app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const {client_id,fname,mname,lname,phone,email,passport}=req.body;
    const sqlUpdate="update clients set client_id=?,fname=?,mname=?,lname=?,phone=?,email=?,passport=? where client_id=?";
    db.query(sqlUpdate,[client_id,fname,mname,lname,phone,email,passport,id],(err,result)=>{
        if(err)
        res.send({err: err});
        else
        res.send(result);
    })
})

app.put("/airplane/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const {airplane_id,max_seats}=req.body;
    const sqlUpdate="update airplane set airplane_id=?,max_seats=? where airplane_id=?";
    db.query(sqlUpdate,[airplane_id,max_seats,id],(err,result)=>{
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
