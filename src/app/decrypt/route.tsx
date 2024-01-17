import * as crypto from 'crypto';

// https://nextjs.org/docs/messages/api-routes-response-size-limit:
export const config = {
    api: {
        responseLimit: false,
    },
}

function getSymmetricKey(): crypto.CipherKey {
    const symKeyBase64: string = process.env.SYMMETRIC_KEY || '';

    const symKeyBuffer = Buffer.from(symKeyBase64, 'base64');
    if (symKeyBuffer.length !== 32) {
        throw new Error('Invalid key length: ' + symKeyBuffer.length);
    }

    return symKeyBuffer as crypto.CipherKey;
}

export async function POST(request: any): Promise<Response> {
   return new Promise(async (resolve, reject) => {

       const key = getSymmetricKey();

       const algorithm = 'aes-256-cbc';
       const clearEncoding: crypto.BinaryToTextEncoding = 'binary';
       const cipherEncoding: crypto.BinaryToTextEncoding = 'binary';
       const iv = Buffer.from(request.headers.get('X-IV'), 'hex');

       const arrayBuffer = await request.arrayBuffer();
       const encryptedData = Buffer.from(arrayBuffer, 'binary');

       var decipher = crypto.createDecipheriv(algorithm, key, iv);
       var decryptedData = [];
       decryptedData.push(decipher.update(encryptedData as any, cipherEncoding, clearEncoding));
       decryptedData.push(decipher.final());

       const decryptedObject = JSON.parse(decryptedData.join(''));
       const formattedDecryptedObject = JSON.stringify(decryptedObject, null, 2);

       resolve(new Response(formattedDecryptedObject, { headers: { 'Content-Type': 'application/json' } }));
   });
}
