import { Component, OnInit } from '@angular/core'
import { Observable, map } from 'rxjs';
import { ListTopicService } from '../../services/list.topic.service';
import { ListUserService } from 'src/app/users/services/list.user.service';
import { ListPostService } from '../../services/list.post.service';
import User from 'src/app/users/models/User';
import { Router } from '@angular/router';
import Topic from '../../models/Topic';
import { Timestamp } from '@angular/fire/firestore/firebase';
import Post from '../../models/Post';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
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

  ngOnInit() {
  }

  setCurrent(pos: number) {
    this.currentFilter = pos
  }

  goToUser(user: User) {
    this.router.navigateByUrl('/u/' + user.username, {state: {user: user}});
  }

  goToTopic(topic: Topic) {
    this.router.navigateByUrl('/t/'+ topic.name, {state: {topic: topic}});
  }

  goToPost(post: Post) {
    this.router.navigateByUrl('/t/'+ post.topic + "/" + post.id, {state: {post: post}});
  }

  formatTimeAgo(postDate: Timestamp): string {
    const now = new Date();
    const timeDifference: number = now.getTime() - postDate.toDate().getTime();
    // Calcula a diferença em segundos
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `há ${seconds} segundo${seconds !== 1 ? 's' : ''}`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `há ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `há ${hours} hora${hours !== 1 ? 's' : ''}`;
    } else if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `há ${days} dia${days !== 1 ? 's' : ''}`;
    } else if (seconds < 31536000) {
      const months = Math.floor(seconds / 2592000);
      return `há ${months} mês${months !== 1 ? 'es' : ''}`;
    } else {
      const years = Math.floor(seconds / 31536000);
      return `há ${years} ano${years !== 1 ? 's' : ''}`;
    }
  }
}
