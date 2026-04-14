import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Бүртгэлтэй хэрэглэгч байна' });
    }
    const user = await User.create({ username, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ error: 'Нэвтрэх нэр эсвэл нууц үг буруу' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Серверийн алдаа' });
  }
};