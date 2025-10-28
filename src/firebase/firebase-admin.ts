import * as admin from 'firebase-admin';
import { join } from 'path';

const serviceAccountPath = join(process.cwd(), 'firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

export { admin };
