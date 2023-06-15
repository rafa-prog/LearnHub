import { TestBed } from '@angular/core/testing';

import { ShowForumService } from './show.forum.service';

describe('ShowForumService', () => {
  let service: ShowForumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowForumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
