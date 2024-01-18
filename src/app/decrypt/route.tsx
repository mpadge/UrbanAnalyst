import * as crypto from 'crypto';

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
       const varname = Buffer.from(request.headers.get('X-VARNAME'), 'utf8').toString();

       const arrayBuffer = await request.arrayBuffer();
       const encryptedData = Buffer.from(arrayBuffer, 'binary');

       var decipher = crypto.createDecipheriv(algorithm, key, iv);
       var decryptedData = [];
       decryptedData.push(decipher.update(encryptedData as any, cipherEncoding, clearEncoding));
       decryptedData.push(decipher.final());

       const decryptedObject = JSON.parse(decryptedData.join(''));
       const filteredDecryptedObject = decryptedObject.map((item: { [key: string]: unknown }) => ({ [varname]: item[varname] }));
       const formattedDecryptedObject = JSON.stringify(filteredDecryptedObject, null, 2);

       resolve(new Response(formattedDecryptedObject, { headers: { 'Content-Type': 'application/json' } }));
   });
}
