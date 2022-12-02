const express=require('express')
const app=express()
const fs= require('fs');
app.use(express.json())
app.use(express.urlencoded({extended:false}));
const PORT=5000;
app.set('view engine','ejs')
app.set('views','./views')
app.get("/",(req,res)=>{
    res.render('home')
})
app.get("/login",(req,res)=>{
    res.render('login',{errmsg:'',succmsg:""})
})





app.post("/logindata",(req,res)=>{
    const {email,pass}= req.body;
    console.log(req.body)
    if(fs.existsSync(`./users/${email}.txt`)){
   let data= fs.readFileSync(`./users/${email}.txt`);
        var array = data.toString().split("\n");
        for(i in array){
        if(array[2]===pass)
         {
             res.render("login",{errmsg:"",succmsg:`Welcome ${email}`})
             
        }
        else{
            res.render("login",{errmsg:"Please Enter right password",succmsg:""})
         }
        }
}
else{
    res.render("login",{errmsg:"File is not exists",succmsg:""})
}

})


















// // app.post("/logindata",(req,res)=>{
// //     const email= req.body.email
// //     const pass=req.body.pass
// //     if(fs.existsSync(`./users/${email}.txt)`)){
// //     let data = fs.readFileSync(`./users/${email}.txt`)
// //     let array= data.toString().split("\n")
// //     for( i in array){
// //         if(pass==array[2]){
// //             res.render("login",{errmsg:"",succmsg:`Welcome ${email}`})
// //         }
// //         else{
// //             res.render("login",{errmsg:"Please Enter right password",succmsg:""})
// //         }
// //     }
// // }else{
// //     res.render("login",{errmsg:"File is not exists",succmsg:""})
// // }

//     console.log(email);
//     console.log(pass);
    
// })
app.get("/registration",(req,res)=>{
    res.render('registration',{errmsg:'',successmsg:''});
})
app.post("/regisdata",(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    
    const age=req.body.age;
    const city=req.body.city;

    let data=(name+'\n'+email+'\n'+password+'\n'+age+'\n'+city);
    if(!fs.existsSync(`./users/${email}.txt`)){
        
        fs.writeFileSync(`./users/${email}.txt`,`${data.toString()}`);
        res.render('registration',{successmsg:'User registered successfully',errmsg:''});
    }
    else{
        res.render('registration',{errmsg:'User Already Exists',successmsg:''});
    }

})

app.listen(PORT)