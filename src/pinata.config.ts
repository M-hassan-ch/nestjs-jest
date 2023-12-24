import { registerAs } from '@nestjs/config';

export default registerAs('pinata', () => ({
  apiKey: process.env.PINATA_API_KEY,
  apiSecret: process.env.PINATA_API_SECRET,
}));
