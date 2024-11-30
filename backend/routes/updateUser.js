const router = require("express").Router();
const users = require('../Models/users.js');

//gets all users
router.get('/users', async (req, res) => {
    try {
        const allUsers = await users.find();
        res.json(allUsers);
    }
    catch(error) {
        res.status(500).json({message: error.msg})
    }
})

router.get('/create-user', async (req, res) => {
    try {
        const newUser = new users({
            userId: 'Dev',
            email: 'dev@gmail.com',
            topScore: 80,
            rank: 2
        });
        await newUser.save();
        res.send('User created successfully');
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).send(`Error creating user: ${error.message}`);
    }
});

module.exports = router