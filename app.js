const express = require('express');
const app = express();
app.use(express.json());

let users =[];
let idCounter = 1;


// post: for adding the data in users
app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if(!name || !email){
        return res.status(400).json({message: 'Name and email are required'});
    }
    const user={
        id: idCounter++,
        name: name,
        email: email
    }

    users.push(user);
    res.status(200).json(user);
})

// get: Read all the users
app.get('/users', (req, res)=>{
    res.status(200).json(users);
})

// get: Read single user by id as params
app.get('/users/:id', (req, res)=>{
    const user = users.find((user)=>{
        return user.id === Number(req.params.id)
    })

    if(!user){
        return res.status(404).json({message:'User not found'});
    }

    res.status(200).json(user);

})

//put: update the user by id as params
app.put('/users/:id', (req, res)=>{

    const user = users.find((user)=>{
        return user.id === Number(req.params.id)
    })

    if(!user){
        return res.status(404).json({message:'User not found'});
    }

    const {name, email} = req.body;

    if(name){
        user.name = name;
    }
    if(email){
        user.email = email;
    }
    res.status(200).json(user)
    
})

// delete: delete the user by id as params

app.delete('/users/:id', (req, res)=>{
    const index = users.findIndex((u)=>{
        u.id === Number(req.params.id)
    });
    users.splice(index, 1);
    res.status(200).json({message:'user deleted successfully'})
})


app.listen(3000, () =>{
    console.log('server is running on port 3000')
})
// localhost:3000/ => localhost:3000