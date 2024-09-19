const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer =require('multer')

const path = require("path");

const app=express();


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.json())

let imageNameForDb;
// ***************************create instance for upload****************************************************************

// const upload = multer({ dest: 'uploads/' })
 
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      imageNameForDb=`${Date.now()}-${file.originalname}`;
  return cb(null,`${Date.now()}-${file.originalname}`)
          
    }
  })

const upload = multer({ storage: storage })

// setting up express-session middleware
app.use(session({
  secret:"iAmSecret",
  resave:false,
  saveUninitialized:false,
  cookie:{
    secure:false,
    expires:600000,
  }
}))
const db=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"admin"
})
db.connect((err)=>{
  if(err){
    console.log("Connection error")
  }
  else{
    console.log("connected successfully..")
  }
})
app.get('/',(req,res)=>{
   const sql='SELECT * FROM login';
   db.query(sql,(err,data)=>{
    if(err){
      return res.json({success:false,message:"something went wrong"})
    }
    return res.json(data);
   })
})

 
app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  
  const sql = 'SELECT * FROM login WHERE email = ? AND password = BINARY ?';
  
  db.query(sql, [email, password], (err, data) => {
    
    if (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }

     
    if (data.length > 0) {
      req.session.user={email}  
      return res.status(200).json({ success: true, message: "Validation completed." ,user:req.session.user.email });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }
  });
});


app.get('/dashboard',(req,res)=>{
  if(req.session.user){
    res.json({success:true,message:`welcome to the dashboard ${req.session.user.email}`})
  }
  else{
    res.status(401).json({success:false,message:"unauthorized please login"})
  }
})
app.post('/logout', (req, res) => {
 
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    
    
    res.clearCookie('connect.sid');  

 
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
});

 
app.post('/add',upload.single('image'),(req,res)=>{
  
 
 
    const sql= "INSERT INTO category (CategoryName,image,Sequence) VALUES (?, ?,?)"
    const values=[
      req.body.category,
      imageNameForDb,
      req.body.sequence,
    ];
    db.query(sql,values,(err,data)=>{
      if(err) return res.status(400).json({success:false,message:"something went wrong"})
   })
     return res.status(200).json({success:true,message:"data added successfully!!"})
    })



  
    app.get('/viewcategory', (req, res) => {
     
    
     
      const sql = "SELECT * FROM category";
      
     
      db.query(sql, (err, data) => {
        if (err) {
          
          return res.status(400).json({
            success: false,
            message: "Cannot fetch data",
            error: err
          });
        }
    
       
        return res.status(200).json({
          success: true,
          message: "Data fetched successfully",
          data: data  
        });
      });
    });

  

    app.get('/viewproducts',(req,res)=>{
     
      
      const sql="SELECT products.*, category.categoryname, subcategory.subcategoryname FROM products INNER JOIN category ON category.id = products.CatID INNER JOIN subcategory ON subcategory.id = products.SubCatID"
      
       db.query(sql, (err, data) => {
         if (err) {
         
           return res.status(400).json({
            success: false,
             message: "Cannot fetch data",
             error: err
           });
         }
    
       
          return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: data  
         });
       });

    })









 
app.post('/delete',(req,res) => {

  const { id } = req.body
  const sql = "DELETE FROM Category where id=?"
  db.query(sql,id ,(err,data) => {
    if(err){
      return res.status(400).json({success:false,message:"Data was not deleted"})
    }
    return res.status(200).json({success:true,message:"Data has been deleted"})
  })

})

app.post('/deletesubcat',(req,res) => {
  const { id } = req.body;
  const sql = "DELETE FROM subcategory where id=?"
  db.query(sql,id ,(err,data) => {
    if(err){
      return res.status(400).json({success:false,message:"Data was not deleted"})
    }
    return res.status(200).json({success:true,message:"Data has been deleted"})
  })

})
app.post('/deleteproduct',(req,res)=>{
 
  const {id}=req.body;
  
  const sql="DELETE FROM products WHERE productid=?";
  db.query(sql,id,(err,data)=>{
    if(err){
      return res.status(200).json({success:false,message:"failed to delete file"})
    }
    return res.status(200).json({success:true,message:"deleted successfully"})
  })

})


app.post('/fetchcategory',(req,res)=>{
  const {id}=req.body;
 
  const sql="SELECT * FROM Category WHERE id=?";
  db.query(sql,id,(err,data)=>{
    if(err){
      return res.status(400).json({success:false,message:"somenting went wrong"})
    }
  
    return res.status(200).json({data});
  })
})

app.post('/fetchsubcategory',(req,res)=>{
  const {id}=req.body;
  const sql="SELECT * FROM subcategory WHERE id=?";
  
  db.query(sql,id,(err,data)=>{
    if(err){
      return res.status(400).json({success:false,message:"somenting went wrong"})
    }
    
    return res.status(200).json({data});
  })
})

// to edit category
app.post('/editcategory',upload.single('image'),(req,res)=>{
  let sql;
  if (req.file) { // if the image is given
   
    sql = "UPDATE Category SET CategoryName=?,Image=?,Sequence=?,Status=? WHERE id=?";
    db.query(sql,[req.body.category,imageNameForDb,req.body.sequence,req.body.status,req.body.id],(err,data) =>{
      if (err) {
        res.status(400).json({success:false,message:"data not inserted"})
      }
      res.status(200).json({success:true,message:"Data is updated"})
    })
  }   
   else { // if the image is not give, we wont update it
  
    sql = "UPDATE Category SET CategoryName=?,Sequence=?,Status=? WHERE id=?";
    db.query(sql,[req.body.category,req.body.sequence,req.body.status,req.body.id],(err,data) =>{
      if (err) {
        res.status(400).json({success:false,message:"Data not inserted"})
      }
      res.status(200).json({success:true,message:"Data is updated"})
    })

  }



})
// edit sub category api
app.post('/editsubcategory',upload.single('image'),(req,res)=>{
  let sql;
   if (req.file) { 

    sql = "UPDATE subcategory SET subcategoryname=?,categoryid=?,subcatimage=?,sequence=?,status=? WHERE id=?";
    db.query(sql,[req.body.subcategory,req.body.category,imageNameForDb,req.body.sequence,req.body.status,req.body.id],(err,data) =>{
      if (err) {
        res.status(400).json({success:false,message:"data not inserted"})
      }
      res.status(200).json({success:true,message:"Data is updated"})
     })
   }   

    else { // if the image is not give, we wont update it
   
      sql = "UPDATE subcategory SET subcategoryname=?,categoryid=?,sequence=?,status=? WHERE id=?";
      db.query(sql,[req.body.subcategory,req.body.category,req.body.sequence,req.body.status,req.body.id],(err,data)=>{
       if (err) {
         res.status(400).json({success:false,message:"Data not inserted"})
      }
      res.status(200).json({success:true,message:"Data is updated"})
    })
  }
})

app.post('/editproduct',upload.single('image'),(req,res)=>{
  let sql;
   if (req.file) { // if the image is given

    sql = "UPDATE products SET productname=?,subcatid=?,catid=?,productimage=?,Status=? WHERE productid=?";
    db.query(sql,[req.body.productName,req.body.subCatID,req.body.catID,imageNameForDb,req.body.status,req.body.productid],(err,data) =>{
      if (err) {
        res.status(400).json({success:false,message:"data not inserted"})
      }
      res.status(200).json({success:true,message:"Data is updated"})
     })
   }   

    else { // if the image is not give, we wont update it
   
      sql = "UPDATE products SET productname=?,subcatid=?,catid=?,Status=? WHERE productid=?";
      db.query(sql,[req.body.productName,req.body.subCatID,req.body.catID,req.body.status,req.body.productid],(err,data)=>{
       if (err) {
         res.status(400).json({success:false,message:"Data not inserted"})
      }
      res.status(200).json({success:true,message:"Data is updated"})
    })
  }
})

 







app.post("/viewsubcategory",(req,res)=>{
 
 const sql = "SELECT subcategory.*, category.categoryname FROM subcategory INNER JOIN category ON Subcategory.categoryID = Category.id";
      
 db.query(sql, (err, data) => {
   if (err) {
     return res.status(400).json({
       success: false,
       message: "Cannot fetch data",
       error: err
     });
   }

   return res.status(200).json({
     success: true,
     message: "Data fetched successfully",
     data: data
   });
 });})


//  view product
app.post("/viewproduct",(req,res)=>{
  // console.log("rquest hit  jdjf")
  const {productid}=req.body;
   
  const sql = "SELECT * FROM products WHERE productid=?";
    
  db.query(sql,productid,(err, data) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Cannot fetch data",
        error: err
      });
    }
 
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: data
    });
  });})
 







//  following apis to handle subcategory 
app.post("/fetchcategorynames",(req,res)=>{
  const categoryID=req.body.categoryid;
  let sql;
  if(categoryID){
    sql="SELECT categoryname FROM category where id=?";
  }
  else{ sql="SELECT id,categoryname FROM category";}
  db.query(sql,[categoryID||null],(err,data)=>{
    if(err){
      res.status(200).json({success:false,message:"something went wrong"})
    }
    res.status(200).json({success:true, message: "Data fetched successfully",data:data})
  })


})

app.post("/fetchsubcategorynames",(req,res)=>{
  const subcatID=req.body.subcatID;
  let sql;
  if(subcatID){
    sql="SELECT subcategoryname FROM subcategory where id=?";
  }
   sql="SELECT id,subcategoryname FROM subcategory";
  db.query(sql,[subcatID || null],(err,data)=>{
    if(err){
      res.status(200).json({success:false,message:"something went wrong"})
    }
    res.status(200).json({success:true, message: "Data fetched successfully",data:data})
  })


})


app.post("/addsubcategory",upload.single('image'),(req,res)=>{
  

  const sql= "INSERT INTO subcategory (subcategoryname,categoryid,subcatimage,sequence) VALUES (?, ?,?,?)"
  const values=[
    req.body.subCategory,
    req.body.category,
    imageNameForDb,
    req.body.subcategorysequence,
  ];

  db.query(sql,values,(err,data)=>{
    if(err) return res.status(400).json({success:false,message:"something went wrong"})
 })
   return res.status(200).json({success:true,message:"data added successfully!!"})
  })
  

  app.post('/addproduct',upload.single('image'),(req,res)=>{
    const sql= "INSERT INTO products (productname,subcatid,catid,productImage) VALUES (?,?,?,?)"
  const values=[
    req.body.productName,
    req.body.subCategory,
    req.body.category,
    imageNameForDb,
     
  ];
  db.query(sql,values,(err,data)=>{
    if(err) return res.status(400).json({success:false,message:"something went wrong"})
 })
   return res.status(200).json({success:true,message:"data added successfully!!"})
  })
  



app.listen(8084,()=>{
  console.log("app  is listening on 8084");
})