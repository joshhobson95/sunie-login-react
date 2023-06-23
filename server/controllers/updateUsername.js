const { User } = require('../models/user');


const updateUsername = async (req, res) => {
  //pull token off end of URL 
  try {
    const { usernameToken } = req.params;
  //pulls username and confirmUsername from req.body
    const { username, confirmUsername } = req.body;

    // Find user by token, rejects users without token added
    const user = await User.findOne({ where: { usernameToken: usernameToken } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Check usernames match
    if (username !== confirmUsername) {
      return res.status(400).json({ message: 'Usernames did not match or Username already exists' });
    }

    


    // Update username and resets token in database to null 
    user.username = username
    user.usernameToken = null;
    await user.save();

    return res.status(200).json({ message: 'Username updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = updateUsername;
