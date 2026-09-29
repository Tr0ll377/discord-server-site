import mongoose from 'mongoose';
import { config } from './config.js';

export async function connectDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB :', error.message);
    process.exit(1);
  }
}
