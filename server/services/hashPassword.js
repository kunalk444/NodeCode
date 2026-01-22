import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password){
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password,hash){
  if(password==undefined || hash==undefined)return false;
  return await bcrypt.compare(password, hash);
}
