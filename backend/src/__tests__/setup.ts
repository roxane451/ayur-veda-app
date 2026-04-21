import mongoose from 'mongoose';

// Env de test — doit être défini AVANT l'import de config/env
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_secret_key_minimum_32_chars_long_for_tests';
process.env.MONGODB_URI = 'mongodb://localhost:27017/ayur_test';
process.env.PORT = '5001';
process.env.CORS_ORIGIN = 'http://localhost:5173';

// Fermer la connexion Mongoose après tous les tests
afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});
