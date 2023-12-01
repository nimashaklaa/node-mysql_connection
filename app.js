import express from 'express';
import { getNotess } from './database.js';

const app = express();


app.get("/notes",async(req,res) =>{
    const notes = await getNotess();
    res.send(notes)
})
app.use((err,req,res,next) =>{
    console.log(err.stack)
    res.status(500).send('Something broke! ')
})

app.listen(8080,()=>{
    console.log('Server is running on port 8080')
})

//https://youtu.be/Hej48pi_lOc?si=oPJy6BVil2rRMuHH