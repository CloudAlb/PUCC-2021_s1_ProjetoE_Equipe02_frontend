export interface TournamentInfo {
  data?: {
    id_tournament: string;
    name: string;
    game: string;
    description: string;
    number_participants: number;
    user: {
      id_user: string;
      name: string;
      username: string;
      avatar_image: string;
    };
  };

  message?: string;
}
