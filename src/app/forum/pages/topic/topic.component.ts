import { Component, OnInit } from '@angular/core';
import Topic from '../../models/Topic';
import { ShowTopicService } from '../../services/show.topic.service';
import { ActivatedRoute, Router } from '@angular/router';
import Post from '../../models/Post';
import { ListPostService } from '../../services/list.post.service';
import { Timestamp } from '@angular/fire/firestore/firebase';
import User from 'src/app/users/models/User';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  topic: Topic | null
  posts: Post[] | null

  constructor(private showTopicS: ShowTopicService,
    private listPostsS: ListPostService,
    private aRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.setData()
  }

  setData() {
    this.topic = history.state.topic

    if (this.topic == undefined) {
      this.aRoute.params.subscribe(async params => {
        const name = params['name'];
        try {
          this.topic = await this.showTopicS?.getTopicByName(name);
          
          if(this.topic == null || this.topic == undefined) {
            alert('Erro ao buscar tópico, tente novamente!')
            this.navigate('')
          }

          if (this.topic?.name !== undefined) {
            this.posts = await this.listPostsS.getPostsByTopic(this.topic.name)
          }

        } catch (error) {
          alert('Erro ao buscar tópico, tente novamente!')
          this.navigate('')
        }
      });
    }
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

  goToUser(user: string) {
    this.router.navigateByUrl('/u/' + user, {state: {user: user}});
  }

  goToPost(post: Post) {
    this.router.navigateByUrl('/t/'+ post.topic + "/" + post.id, {state: {post: post}});
  }

  goToSubmit(topic: any) {
    this.router.navigateByUrl('/submit', {state: {topic: topic}});
  }

  navigate(link: string) {
    this.router.navigate([link])
  }
}
