const express =require("express");
const mongoose =require("mongoose");

const app =express();

app.use(express.json())
const connect=()=>{
    return mongoose.connect("mongodb+srv://SnehaNaik:sneha12347@cluster0.1cxuc.mongodb.net/bank?retryWrites=true&w=majority")
}


const userSchema =new mongoose.Schema({
    firstName :{type:String,required:true},
    lastName :{type:String,required:true},
//     age (required)
// email (required )
// address ( required )
// gender ( optional and should default to Female )
    age:{type:Number,required:true},
    email:{type:String,required:true},
    address:{type:String,required:true},
    gender:{type:String,required:true},

},
{
    versionKey:false,
    timestamps:true,
})

const User =mongoose.model("user",userSchema);


// BranchDetail

// name (required)
// address (required)
// IFSC (required and string)
// MICR (required and number )
// createdAt (required)
// updatedAt (required)

const branchSchema= new mongoose.Schema({
    branchname:{type:String,required:true},
    branchaddress:{type:String,required:true},
    ifsc:{type:String,required:true},
    micr:{type:Number,required:true},

},{
    versionKey:false,
    timestamps:true,
})

const Branch =mongoose.model("branch",branchSchema)


//3. MasterAccount

// balance (required) This is the total balance that the person has in the bank
// createdAt (required)
// updatedAt (required)


const masterSchema =new mongoose.Schema({
    balance:{type:Number,required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        path:"user",
        required:true,
    },
    branchId:{
            type:mongoose.Schema.Types.ObjectId,
            path:"branch",
            required:true,
    }

},{
    versionKey:false,
    timestamps:true,
})

const Master =mongoose.model("master",masterSchema)

// SavingsAccount

// account_number ( required and should be unique)
// balance ( required )
// interestRate ( required )
// createdAt (required)
// updatedAt (required)

const savingSchema= new mongoose.Schema({
    account_number:{type:String,required:true,unique:true},
    balance:{type:Number,required:true},
    interestRate:{type:Number,required:true},
    masterId:{
        type:mongoose.Schema.Types.ObjectId,
        path:"master",
        required:true,
}

},{

    versionKey:false,
    timestamps:true, 

})

const Saving =mongoose.model("saving",savingSchema)

// FixedAccount

// account_number ( required and should be unique)
// balance ( required )
// interestRate ( required )
// startDate ( required )
// maturityDate (required )
// createdAt (required)
// updatedAt (required)

const fixedSchema= new mongoose.Schema({
    account_number:{type:String,required:true,unique:true},
    balance:{type:Number,required:true},
    interestRate:{type:Number,required:true},
    startDate:{type:String,required:true},
    maturityDate:{type:String,required:true},
    masterId:{
        type:mongoose.Schema.Types.ObjectId,
        path:"master",
        required:true,
}

},{

    versionKey:false,
    timestamps:true, 

})

const Fixed = mongoose.model("fixed",fixedSchema)


app.get("/users",async(req,res)=>{
    try{
        const users = await User.find().lean.exec();

        return res.status(200).send({users:users});
    }
    catch(err){
        return res.status(500).send(err);
    }
   
});


app.post("/users",async(req,res)=>{
    try{
        const user = await User.create(req.body)

        return res.status(201).send(user);
    }
    catch(err){
        return res.status(500).send(err);
    }
   
})
app.listen(5000,async(req,res)=>{
    try{
        await connect();
        console.log("listening at port 5000");
    }
    catch(error){
      console.log(error);
    }
})