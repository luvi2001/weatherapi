import User from '../models/user.js';

export const createUser = async (req, res) => {
  const { email, location } = req.body;
  try {
    const user = new User({ email, location });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
};

export const updateUserLocation = async (req, res) => {
  const { location } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { location },
      { new: true }
    );
    res.status(200).send('Location updated successfully');
  } catch (error) {
    res.status(500).send('Error updating location');
  }
};
