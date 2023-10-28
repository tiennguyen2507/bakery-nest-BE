import { config } from 'dotenv';

config({ path: '.env' });

export const envConfig = (): void => {
  if (process.env.NODE_ENV === 'development') {
    config({ path: '.env.development' });
  } else {
    config({ path: '.env.production' });
  }
};
