export interface UserInfo {
  data?: {
    id_user: string;

    name: string;
    username: string;
    email: string;
    birth_date: string;

    avatarImage: string;
    backgroundImage: string;

    bio: string;
    level: string;
    coins: string;
    followers: string;
  };

  error?: string;
  message?: string;
}
