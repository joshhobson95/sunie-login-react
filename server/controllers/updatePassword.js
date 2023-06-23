//2
//This file is just one function, the updatePassword function. The second step of the process, after receiving email for resetting from passwordResetRequest file.


const { User } = require('../models/user');
const bcrypt = require('bcrypt');

const updatePassword = async (req, res) => {
  //pull token off end of URL 
  try {
    const { passwordToken } = req.params;
  //pulls password and confirmed password from req.body
    const { password, confirmPassword } = req.body;

    // Find user by token, rejects users without token added
    const user = await User.findOne({ where: { passwordToken: passwordToken } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Check if password and confirmedPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and resets token in database to null 
    user.hashedPass = hashedPassword;
    user.passwordToken = null;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = updatePassword;
