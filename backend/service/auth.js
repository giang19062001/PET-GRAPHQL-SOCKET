import bcrypt  from 'bcrypt';
import jwt  from 'jsonwebtoken';

export async function hashPassword(password) {
    try {
        const saltRounds = 10;
        const result = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
        return result;
    } catch (err) {
        console.error(err);
        return null; 
    }
}
export async function comparePassword(password, hashedPassword) {
    try {
        const saltRounds = 10;
        const result = await new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result) {
                        // Passwords match
                        resolve(true);
                    } else {
                        // Passwords do not match
                        resolve(false);
                    }
                }
            });
        });
        return result;
    } catch (err) {
        console.error(err);
        return null; 
    }
}
export function generateToken(payload) {
    const secretKey = 'pet-zone';

    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
}