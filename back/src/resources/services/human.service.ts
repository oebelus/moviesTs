import { Human } from "../models/Human";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TokenService } from "./token.service";

export default class HumanService {
  private human = Human;
  private tokenService = new TokenService();

  private generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }

  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResult> {
    try {
      const usernameExists = await this.human.findOne({ username });
      if (usernameExists) {
        return {
          success: false,
          error: "Username already exists",
        };
      }

      const emailExists = await this.human.findOne({ email });
      if (emailExists) {
        return {
          success: false,
          error: "Email already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.human.create({
        username,
        email,
        password: hashedPassword,
      });

      return {
        success: true,
        data: {
          userId: user._id.toString(),
          message: "User created successfully",
        },
      };
    } catch (err) {
      return {
        success: false,
        error: `Registration error: ${(err as Error).message}`,
      };
    }
  }

  async login(username: string, password: string): Promise<LoginResult> {
    try {
      const user = await this.human.findOne({ username });

      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          success: false,
          error: "Invalid Password",
        };
      }

      const accessToken = this.tokenService.generateAccessToken({
        userId: user._id.toString(),
        username: user.username,
      });

      const refreshToken = this.tokenService.generateRefreshToken();

      await this.tokenService.saveRefreshToken(
        user._id.toString(),
        refreshToken
      );

      return {
        success: true,
        data: {
          userId: user._id.toString(),
          accessToken,
          refreshToken,
          message: "Login successful",
        },
      };
    } catch (err) {
      return {
        success: false,
        error: `Login error: ${(err as Error).message}`,
      };
    }
  }

  async refreshToken(refreshToken: string): Promise<RefreshTokenResult> {
    try {
      const tokenDoc = await this.tokenService.verifyRefreshToken(refreshToken);

      const user = await this.human.findById(tokenDoc.userId);
      if (!user) {
        throw new Error("User not found");
      }

      const accessToken = this.tokenService.generateAccessToken({
        userId: user._id.toString(),
        username: user.username,
      });

      return {
        success: true,
        data: {
          accessToken,
          message: "Token refreshed successfully",
        },
      };
    } catch (err) {
      return {
        success: false,
        error: `Token refresh error: ${(err as Error).message}`,
      };
    }
  }

  async logout(refreshToken: string): Promise<LogoutResult> {
    try {
      await this.tokenService.deleteRefreshToken(refreshToken);
      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (err) {
      return {
        success: false,
        error: `Logout error: ${(err as Error).message}`,
      };
    }
  }

  async findUserByUsername(username: string): Promise<UserSearchResult> {
    try {
      if (!username) {
        return {
          success: false,
          error: "Username is required",
        };
      }

      const user = await this.human
        .findOne({ username })
        .select("-password")
        .lean(); // Convert to plain JavaScript object

      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }

      return {
        success: true,
        data: {
          user,
          message: "User found successfully",
        },
      };
    } catch (err) {
      return {
        success: false,
        error: `Error finding user: ${(err as Error).message}`,
      };
    }
  }

  async findUser(username: string): Promise<UserSearchResult> {
    try {
      if (!username) {
        return {
          success: false,
          error: "Username is required",
        };
      }

      const user = await this.human
        .findOne({ username })
        .select("-password")
        .lean();

      if (!user) {
        return {
          success: false,
          error: "User not found",
        };
      }

      return {
        success: true,
        data: {
          user,
          message: "User found successfully",
        },
      };
    } catch (err) {
      return {
        success: false,
        error: `Error finding user: ${(err as Error).message}`,
      };
    }
  }
}
