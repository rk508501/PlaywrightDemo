// utils/encryption.ts
import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('playwright_demo_secret', 'salt', 32); // Use a secure key in production
const iv = Buffer.alloc(16, 0); // Initialization vector

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
