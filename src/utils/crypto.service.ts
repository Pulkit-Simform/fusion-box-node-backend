import { createHash as hash } from 'crypto';
import { hashSync } from 'bcryptjs';

export function generateHash(str: string) {
  return hash('sha256').update(str).digest('hex');
}

export function createHash(password: string): string {
  return hashSync(password, 10);
}
