import dotenv from "dotenv";
dotenv.config();

const config = {
  port: 4000,
  domain: "localhost",
  dbUri: process.env.MONGO_URL,
  cloud: process.env.CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  cloudinarySeceret: process.env.CLOUDINARY_SECRET,
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  // makeup product categories
};

export default config;
