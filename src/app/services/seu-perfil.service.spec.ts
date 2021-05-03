import { TestBed } from '@angular/core/testing';

import { SeuPerfilService } from './seu-perfil.service';

describe('SeuPerfilService', () => {
  let service: SeuPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeuPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
