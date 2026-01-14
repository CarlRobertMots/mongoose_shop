const User = require('../models/user');

class UserController {
  // Create a new user
  async createUser(req, res) {
    try {
      const { personalCode, email, firstName, lastName, telephone, address, password, admin } = req.body;
      const newUser = new User({
        personalCode,
        email,
        firstName,
        lastName,
        telephone,
        address,
        password,
        admin,
        created: new Date()
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  // Get a user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    } }

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}

module.exports = new UserController();