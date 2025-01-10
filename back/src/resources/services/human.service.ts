import { Human } from "../models/Human";
import bcrypt from "bcrypt";

export default class HumanService {
  private human = Human;

  public async register(
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResult> {
    try {
      if (!email) {
        return {
          success: false,
          error: "The Email Field is Important",
        };
      }
      if (!username) {
        return {
          success: false,
          error: "The Username Field is Important",
        };
      }
      if (!password) {
        return {
          success: false,
          error: "The Password Field is Important",
        };
      }

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
          user,
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

      return {
        success: true,
        data: {
          userId: user._id.toString(),
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
        .select("-password") // Exclude password from the result
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
        .select("-password") // Exclude password from the result
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
}
