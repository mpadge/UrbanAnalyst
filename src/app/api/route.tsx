import * as crypto from 'crypto';

export async function POST(request: any): Promise<Response> {
   return new Promise(async (resolve, reject) => {

       const symKeyBase64: string = process.env.SYMMETRIC_KEY || '';

       const symKeyBuffer = Buffer.from(symKeyBase64, 'base64');
       if (symKeyBuffer.length !== 16) {
           reject(new Error('Invalid key length: ' + symKeyBuffer.length));
           return;
       }

       var algorithm = 'aes-128-cbc';
       var clearEncoding = 'buffer';
       var cipherEncoding = 'binary';
       var iv = Buffer.from(request.headers.get('X-IV'), 'hex');

       const arrayBuffer = await request.arrayBuffer();
       const encryptedData = Buffer.from(arrayBuffer, 'binary');

       var decipher1 = crypto.createDecipheriv(algorithm, symKeyBuffer, iv);
       var decryptedData = [];
       decryptedData.push(decipher1.update(encryptedData, cipherEncoding, clearEncoding));
       decryptedData.push(decipher1.final(clearEncoding));

       const decryptedString = decryptedData.join('');

       resolve(new Response(decryptedString, { headers: { 'Content-Type': 'text/plain' } }));
   });
}
