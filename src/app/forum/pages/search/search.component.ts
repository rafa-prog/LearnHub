import { Component, OnInit } from '@angular/core'
import { Observable, map, tap } from 'rxjs';
import { ListTopicService } from '../../services/list.topic.service';
import { ListUserService } from 'src/app/users/services/list.user.service';
import { ListPostService } from '../../services/list.post.service';
import User from 'src/app/users/models/User';
import { ActivatedRoute, Router } from '@angular/router';
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

  filteredPosts: any[] = []
  filteredTopics: any[] = []
  filteredUsers: any[] = []

  constructor(private listPostService: ListPostService,
  private aRoute: ActivatedRoute,
  private listTopicService: ListTopicService,
  private listUsersService: ListUserService,
  private router: Router) {}

  ngOnInit() {
    this.aRoute.paramMap.subscribe(params => {
      const busca = params.get('param');
  
      if (busca) {
        // Filtrar posts com base na busca
        this.posts$ = this.listPostService.execute().pipe(
          tap(posts => {
            this.filteredPosts = posts.filter(post =>
              post['title'].toLowerCase().includes(busca.toLowerCase()) ||
              post['content'].toLowerCase().includes(busca.toLowerCase()) ||
              (post['tags'] as string[]).some((tag: string) => tag.toLowerCase().includes(busca.toLowerCase()))
            )
          })
        )
        
  
        // Filtrar tópicos com base na busca
        this.topics$ = this.listTopicService.execute().pipe(
          tap(topics => {
            this.filteredTopics = topics.filter(topic => 
              topic['name'].toLowerCase().includes(busca.toLowerCase()) ||
              (topic['about'] ? topic['about'].toLowerCase().includes(busca.toLowerCase()) : false)
            );
          })
        );

  
        // Filtrar usuários com base na busca
        this.users$ = this.listUsersService.execute().pipe(
          tap(users => {
            this.filteredUsers = users.filter(user => 
              user['username'].toLowerCase().includes(busca.toLowerCase()) ||
              (user['about'] ? user['about'].toLowerCase().includes(busca.toLowerCase()) : false)
            );
          }) 
        );


        // Atualizar dados salvos nas pipes
        this.posts$.pipe(tap()).subscribe()
        this.topics$.pipe(tap()).subscribe()
        this.users$.pipe(tap()).subscribe()
      }
    });  
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
