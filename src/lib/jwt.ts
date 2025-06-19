import jwt, { SignOptions } from 'jsonwebtoken';
import getENV from '@/lib/env';

type JWTPayload = {
    userId: string;
    email: string;
    fullName?: string;
}

const JWT_SECRET = getENV('JWT_SECRET');

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

const signJWT = (payload: JWTPayload, expiresIn: number = 1): string => {
    const options: SignOptions = {
        expiresIn,
    };
    return jwt.sign(payload, JWT_SECRET as jwt.Secret, options);
}
// const signJWT = (payload: JWTPayload, expiresIn: string = '1h'): string => {
//     return jwt.sign(payload, JWT_SECRET as string, { expiresIn });
// }

const verifyJWT = (token: string) => {
    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET!);
        if (isValid) {
            return jwt.decode(token) as JWTPayload;
        }
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            console.warn('JWT expired');
        } else {
            console.error('JWT verification failed:', err);
        }
        return null;
    }
}

export {
    signJWT,
    verifyJWT
}


