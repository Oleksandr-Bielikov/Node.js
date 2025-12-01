import crypto from 'crypto';

export default function getRandomValue() {
    const buffer = crypto.randomBytes(8);
    return buffer.toString('hex');
};