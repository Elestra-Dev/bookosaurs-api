import { Request, Response } from 'express';
import { User } from '../models/User.js';
import { hashPassword, comparePasswords } from '../utils/hashPassword.js';
import { generateToken } from '../utils/generateToken.js';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashed = await hashPassword(password);
    const user = await User.create({ email, password: hashed });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
    });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString());

    res.json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

