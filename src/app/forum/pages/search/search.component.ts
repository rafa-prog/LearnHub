import { Component } from '@angular/core'
import { Observable } from 'rxjs';
import { ListTopicService } from '../../services/list.topic.service';
import { ListUserService } from 'src/app/users/services/list.user.service';
import { ListPostService } from '../../services/list.post.service';
import User from 'src/app/users/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  filters = ["Posts", "Tópicos", "Usuários"]
  queryData = ["posts", "topics", "users"]
  currentFilter = 0
  posts$: Observable<any[]>;
  topics$: Observable<any[]>;
  users$: Observable<any[]>;

  constructor(private listPostService: ListPostService,
  private listTopicService: ListTopicService,
  private listUsersService: ListUserService,
  private router: Router) {
    this.posts$ = this.listPostService.execute()
    this.topics$ = this.listTopicService.execute()
    this.users$ = this.listUsersService.execute()
  }

  teste(pos: number) {
    this.currentFilter = pos
  }

  userProfile(user: User) {
    this.router.navigateByUrl('/u/' + user.username, {state: {user: user}});
  }
}
