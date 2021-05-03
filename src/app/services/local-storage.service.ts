import { Injectable } from '@angular/core';
import { SessionManagerService } from './session-manager.service';

interface localUserData {
  id_user: string;
  name: string;
  username: string;
  avatar_image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private storage: Storage;

  constructor(private sessionManagerService: SessionManagerService) {
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      return JSON.parse(this.storage.getItem(key));
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }

  setUserInfo({ id_user, name, username, avatar_image }: localUserData) {
    this.set('user.id_user', id_user);
    this.set('user.name', name);
    this.set('user.username', username);
    if (avatar_image) this.set('user.avatar_image', avatar_image);
  }

  getUserInfo(): localUserData {
    return {
      id_user: this.get('user.id_user'),
      name: this.get('user.name'),
      username: this.get('user.username'),
      // TODO, consertar depois
      // avatar: this.get("user.avatar_image")
    };
  }

  clearUserInfo() {
    this.remove('user.id_user');
    this.remove('user.name');
    this.remove('user.username');
    this.remove('user.avatar_image');
    this.remove('token');
  }
}
