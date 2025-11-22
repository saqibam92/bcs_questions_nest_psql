// apps/api/src/auth/constants.ts
import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

if (!jwtConstants.secret) {
  throw new Error('JWT_SECRET is not defined in your .env file');
}