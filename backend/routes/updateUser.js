const router = require("express").Router();
const users = require('../Models/users.js');

//Finds specific user based on their userID
router.post('/userData/update/:userId', async (req, res) => {
    try {
        const { userId, email, topScore } = req.body;
        const paramUserId = req.params.userId;

        // Validate userId
        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
            return res.status(400).json({ message: 'Invalid or missing userId' });
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate topScore
        const { wpm, cpm, accuracy, error } = topScore || {};
        if (
            typeof wpm !== 'number' ||
            typeof cpm !== 'number' ||
            typeof accuracy !== 'number' ||
            typeof error !== 'number'
        ) {
            return res.status(400).json({ message: 'Invalid score data' });
        }

        // Calculate score if not provided
        const score = Math.round((wpm + cpm + accuracy - error) / 4);

        // Check if userId in body matches userId in params
        if (userId !== paramUserId) {
            return res.status(400).json({ message: 'User ID mismatch' });
        }

        // Try to find existing user
        let user = await users.findOne({ 
            $or: [
                { userId: userId },
                { email: email }
            ]
        });

        // If user doesn't exist, create new user
        if (!user) {
            user = new users({
                userId: userId,
                email: email,
                topScore: {
                    wpm: wpm,
                    cpm: cpm,
                    accuracy: accuracy,
                    error: error,
                    score: score
                }
            });
        } else {
            // If user exists, update only if new score is higher
            if (!user.topScore || (score > user.topScore.score)) {
                user.topScore = {
                    wpm: wpm,
                    cpm: cpm,
                    accuracy: accuracy,
                    error: error,
                    score: score
                };
            }

            // Update email if different
            if (user.email !== email) {
                // Check if the new email is already in use by another user
                const emailExists = await users.findOne({ 
                    email: email,
                    userId: { $ne: userId }
                });

                if (emailExists) {
                    return res.status(400).json({ message: 'Email already in use by another user' });
                }
                
                user.email = email;
            }
        }

        // Save the user (new or updated)
        await user.save();

        res.status(200).json({ 
            message: user.isNew ? 'User created successfully' : 'User updated successfully', 
            user 
        });

    } catch (error) {
        // Handle unique constraint errors
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: 'User with this userId or email already exists',
                duplicateField: Object.keys(error.keyPattern)[0]
            });
        }

        res.status(500).json({ message: error.message });
    }
});

module.exports = router