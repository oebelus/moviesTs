type LoginResult = {
  success: boolean;
  data?: {
    userId: string;
    message: string;
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
};

type RegisterResult = {
  success: boolean;
  data?: {
    userId: string;
    message: string;
  };
  error?: string;
};

type LogoutResult = {
  success: boolean;
  message?: string;
  error?: string;
};

type RefreshTokenResult = {
  success: boolean;
  data?: {
    accessToken: string;
    message: string;
  };
  error?: string;
};

type UserSearchResult = {
  success: boolean;
  data?: {
    user: User;
    message: string;
  };
  error?: string;
};
