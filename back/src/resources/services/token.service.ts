import jwt from "jsonwebtoken";
import { Token } from "../models/Token";
import crypto from "crypto";

export class TokenService {
  private ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;

  generateAccessToken(payload: { userId: string; username: string }): string {
    console.log(this.ACCESS_TOKEN_SECRET);
    console.log(
      jwt.sign(payload, this.ACCESS_TOKEN_SECRET as string, {
        expiresIn: "1d",
      })
    );
    return jwt.sign(payload, this.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "1d",
    });
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(40).toString("hex");
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await Token.create({
      userId,
      refreshToken,
      expiresAt,
    });
  }

  async verifyRefreshToken(refreshToken: string) {
    const tokenDoc = await Token.findOne({
      refreshToken,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenDoc) {
      throw new Error("Invalid or expired refresh token");
    }

    return tokenDoc;
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    await Token.deleteOne({ refreshToken });
  }
}
