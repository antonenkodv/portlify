import { env } from "process";
import * as dotenv from 'dotenv';
import  { resolve } from 'path';

dotenv.config({path : resolve(process.cwd(), `.env.${env.NODE_ENV}`)});

export const CONFIG = {
    "JWT": {
        "SECRET": env.JWT_SECRET,
        "EXPIRES_IN": env.JWT_EXPIRES_IN
    }
}

