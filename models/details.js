const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors')
app.use(cors());
app.use(bodyParser.json);
  
mongoose.connect('mongodb://127.0.0.1:27017/companies')
.then(()=>{
    console.log('connection established');
})
.catch((err)=>{
    console.log('error ocuured');
})
const companySchema=new mongoose.Schema({ 
  location:String, 
   name:String,
   email:String,
});
const Company=mongoose.model('Company',companySchema);
app.post('/company',(req,res)=>{
    try{
    const {location,name,email}=req.body;
    const company=new Company({location,name,email})
    company.save()
    return res.status(201).json(company);
    } catch (err) {
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}
});

app.get('/company',(req,res)=>{
    Company.find()
    .then(companies=>{
        res.status(200).json(companies)
    })
    .catch(err=>{
        res.status(500).json({error:err});
    })
})
app.get('/company/:id',(req,res)=>{
    const companyId=req.params.id;
    Company.findById(companyId)
    .then(company=>{
        if(company){
        res.status(200).json(company)
        }else{
            res.status(404).json({message:'company not found'})
        }
    })
    .catch(err=>{
        res.status(500).json({error:err});
    })
})
app.put('/company/:id', (req, res) => {
    const id = req.params.id;
    const update = { name: req.body.name, location: req.body.location,email:req.body.email };
  
    Company.findByIdAndUpdate(id, update, { new: true })
      .then((company) => {
        if (!company) {
          return res.status(404).send();
        }
        res.send(company);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
app.delete('/company/:id', (req, res) => {
    let id=req.params.id;
    Company.findByIdAndDelete(id)
      .then((company) => {
        if (!company) {
          return res.status(404).send();
        }
        res.send(company);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})

