type LoginResult = {
  success: boolean;
  data?: {
    userId: string;
    message: string;
  };
  error?: string;
};

type RegisterResult = {
  success: boolean;
  data?: any;
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
