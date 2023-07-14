import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowForumService } from '../../services/show.topic.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  items$: Observable<any[]>;

  constructor(private showTopicsService: ShowForumService) {
    this.items$ = this.showTopicsService.execute();
  }
}
