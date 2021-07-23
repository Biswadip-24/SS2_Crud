const express = require("express")
require("./db");
const User = require("./models")

const app = express()
app.use(express.json())

app.get('/', (req,res) => {
    return res.send("Welcome to summer school");
})

app.post('/api/users', async(req,res) => {
    try{
        const user = new User({
            name : req.body.name,
            email: req.body.email
        })
        await user.save();
        return res.status(201).send(user);
    } catch (e) {
        return res.status(500).send(e)
    }
})

app.get('/api/users', async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);
    } catch (e) {
        return res.status(500).send(e)
    }
})

app.get('/api/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const users = await User.findById(_id);
        return res.status(200).send(users);
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.patch('/api/users/:id',async (req, res) => {
    const _id = req.params.id
    try {
        const users = await User.findByIdAndUpdate(_id, req.body)
        if(users) {
            return res.status(200).send(newUser)
        } 
        else{
            return res.status(400).send("Update Failed")
        }
    } catch(e) {
       return res.status(500).send(e) 
    }
})

app.delete('/api/users/:id', async (req, res) => {
    const _id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(_id);
        if(user) {
            return res.status(400).send("Product Succesfully deleted")
        }
        return res.send("Product deletion failed");
    } catch (e) {
        return res.status(500).send(e)
    }
})
app.listen(3000, () => {console.log("Listening on port 3000")})