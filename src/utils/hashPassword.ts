import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (plain: string, hashed: string) => {
  return await bcrypt.compare(plain, hashed);
};
