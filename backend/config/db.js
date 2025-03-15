const mongoose=require('mongoose')

const connectToDB= ()=>{
  
        mongoose
        .connect('mongodb://127.0.0.1:27017/',{
            dbName: 'fundtastic'
        })
        .then(()=>{
            console.log("conected to DB");
        })
        .catch(()=>{
            console.log("error conecting to DB");
        });
      
    
};

module.exports= connectToDB