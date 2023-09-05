import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Post from '../../models/Post';
import { ListPostService } from '../../services/list.post.service';
import { Timestamp } from '@angular/fire/firestore/firebase';
import { ShowPostService } from '../../services/show.post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  goToUser(arg0: string) {
    throw new Error('Method not implemented.');
    }
    aaaa() {
    alert('aaa')
    }
      post: Post | null

      constructor(private showTopicS: ShowPostService,
        private aRoute: ActivatedRoute,
        private router: Router) {}

      ngOnInit() {
        this.setData()
      }

      setData() {
        this.post = history.state.topic

        if (this.post == undefined) {
          this.aRoute.params.subscribe(async params => {
            const id = params['id'];
            try {
              this.post = await this.showTopicS?.getPostById(id);
              console.log(this.post)
              if(this.post == null || this.post == undefined) {
                alert('Erro ao buscar tópico, tente novamente!')
                this.navigate('')
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

      navigate(link: string) {
        this.router.navigate([link])
      }
    }
