import { loadEnvFile } from "node:process"

loadEnvFile()

export const {
  PORT = 3000,
  SALT_ROUNDS = 10, // In production this can be 10, but in testing it can be 4
  SECRET_JWT_KEY
} = process.env
