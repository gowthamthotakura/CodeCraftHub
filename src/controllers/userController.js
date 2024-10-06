exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username exists
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: existingUser._id }, '53ec968cc7c85696b377e107b1dca53326080c03f3fc443de2043a5eb9780e36', { expiresIn: '3h' });
  
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };