import dotenv from "dotenv";

dotenv.config();

const { API_PORT, SECRET_PASSPHRASE } = process.env;

if (!API_PORT || !SECRET_PASSPHRASE) {
  throw new Error("Missing environment variables");
}

const config = {
  API_PORT,
  SECRET_PASSPHRASE,
};

export default config;
