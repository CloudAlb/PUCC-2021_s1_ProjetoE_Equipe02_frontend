import { Component, OnInit } from '@angular/core';
import { FollowService } from 'src/app/services/follow.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

interface Seguidor {
  user_following: {
    id_user: string;
    name: string;
    username: string;
  }[];
}

@Component({
  selector: 'app-seguidores',
  templateUrl: './seguidores.page.html',
  styleUrls: ['./seguidores.page.scss'],
})
export class SeguidoresPage implements OnInit {
  id_user: string;

  seguidores: Seguidor;

  constructor(
    private followService: FollowService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const { id_user } = this.localStorageService.getUserInfo();
    this.id_user = id_user;

    this.getFollowers();
  }

  getFollowers() {
    this.followService.getFollowers(this.id_user).subscribe((response) => {
      this.seguidores = response.data;

      console.log(this.seguidores);
    });
  }
}
