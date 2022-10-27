import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltOfRounds = 10;
  const hashedpassword = await bcrypt.hash(password, saltOfRounds);

  return hashedpassword;
};
