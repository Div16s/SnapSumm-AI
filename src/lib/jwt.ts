import jwt from 'jsonwebtoken';
import getENV from '@/lib/env';

type JWTPayload = {
    userId: string;
    email: string;
    fullName?: string;
}

const JWT_SECRET = getENV('JWT_SECRET');

const signJWT = (payload: JWTPayload, expiresIn: string = '1h'): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

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


