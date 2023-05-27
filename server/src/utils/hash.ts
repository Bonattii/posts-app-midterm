import crypto from 'crypto';

export function hashPassword(password: string) {
  // Create a salt to change the hash, then the passwords will not be the same
  const salt = crypto.randomBytes(16).toString('hex');

  // Create a hash for the password using the salt create above
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return { hash, salt };
}

export function verifyPassword({
  candidatePassword,
  salt,
  hash
}: {
  candidatePassword: string;
  salt: string;
  hash: string;
}) {
  // Create a hash for the password using the salt stored on the DB
  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512')
    .toString('hex');

  return candidateHash === hash;
}
