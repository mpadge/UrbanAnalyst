import * as crypto from 'crypto';

function rsaKey() {
    const key = process.env.RSA_PRIVATE_KEY;
    const keycrypt = crypto.createPrivateKey(key);
    return keycrypt;
}

export async function GET(Request) {

    return new Promise((resolve, reject) => {
        const rsakey = rsaKey();
        const symKey = process.env.SYMMETRIC_KEY;

        resolve(new Response("Hi there!"));
    });
}

export async function POST(request) {
   return new Promise(async (resolve, reject) => {
       const rsakey = rsaKey();
       const symKeyBase64 = process.env.SYMMETRIC_KEY;

       const symKeyBuffer = Buffer.from(symKeyBase64, 'base64');
       if (symKeyBuffer.length !== 32) {
           reject(new Error('Invalid key length'));
           return;
       }

       const iv = Buffer.from(request.headers.get('X-IV'), 'hex');

       // Get encrypted data from request body and convert to a Buffer
       const reader = request.body.getReader();
       let chunks = [];
       while (true) {
           const { done, value } = await reader.read();
           if (done) break;
           chunks.push(value);
       }
       const encryptedData = Buffer.concat(chunks);

       const decipher = crypto.createDecipheriv('aes-256-cbc', symKeyBuffer, iv);
       decipher.setAutoPadding(false);
       let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
       decryptedData += decipher.final('utf8');

       resolve(new Response(decryptedData));
   });
}
