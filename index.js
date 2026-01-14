import express from 'express';
const app = express();
const port = 3000;
app.use(express.json());
let teaData = []
let nextId =1;
app.post('/teas',(req,res) =>{
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    teaData.push(newTea);
    res.status(201).json(newTea);

}); 
app.get('/teas',(req,res) =>{
    res.json(teaData);   
});
app.get('/teas/:id',(req,res) =>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).json({message: "tea not found"});
    }
    res.json(tea);
})

app.put('/teas/:id',(req,res) =>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id));     
    if(!tea){
        return res.status(404).json({message: "tea not found"});
    }   
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.json(tea);
});
app.delete('/teas/:id',(req,res) =>{
    const teaIndex = teaData.findIndex(t=> t.id === parseInt(req.params.id));
    if(teaIndex === -1){
        return res.status(404).json({message: "tea not found"});
    }
    teaData.splice(teaIndex,1);
    res.status(204).send("deleted successfully");
});

 
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})