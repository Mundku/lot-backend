export const register = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400);
      throw new Error('Бүртгэлтэй хэрэглэгч байна');
    }
    const user = await User.create({ username, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Бүртгэл амжилтгүй');
    }
  } catch (err) {
    next(err);
  }
});