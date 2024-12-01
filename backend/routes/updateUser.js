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
            topScore: {
                wpm: 80,
                cpm: 100,
                accuracy: 95,
                error: 5,
                score: 200
            },
            rank: 2
        });
        await newUser.save();
        res.send('User created successfully');
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).send(`Error creating user: ${error.message}`);
    }
});

router.post('/saveResults', (req, res) => {
    try {
      const { wpm, cpm, accuracy, error} = req.body;
  
      // Validate the incoming data
      if (
        typeof wpm !== 'number' ||
        typeof cpm !== 'number' ||
        typeof accuracy !== 'number' ||
        typeof error !== 'number'
      ) {
        return res.status(400).json({ message: 'Invalid input data' });
      }
  
      // Log the data to simulate saving (replace this with actual database logic)
      console.log('Received test result:', {
        wpm,
        cpm,
        accuracy,
        error
      });
  
      // Respond with success
      res.status(200).json({ message: 'Test result saved successfully!' });
    } catch (error) {
      console.error('Error handling test result:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router