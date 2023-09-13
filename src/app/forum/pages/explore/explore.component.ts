import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore/firebase';
import { Router } from '@angular/router';
import { ListPostService } from '../../services/list.post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {
  goToUser(arg0: string) {
    throw new Error('Method not implemented.');
  }

  goToSubmit() {
    alert('aaa')
  }
  posts$: Observable<any[]>;
    
  constructor(private listPostService: ListPostService,
    private router: Router) {}
    
    ngOnInit() {
      this.posts$ = this.listPostService.execute()
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
