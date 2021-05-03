export interface PublicationInfo {
  data?: [{
      id_publication: string;
      tournament: {
        id_tournament: string;
        name: string;
        game: string;
        description: string;
        number_participants: number;
        user: {
          id_user: string;
          name: string;
        };
      };
  }]

  message?: string;
}
