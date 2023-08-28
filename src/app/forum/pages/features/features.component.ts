import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ListTopicService } from '../../services/list.topic.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  items$: Observable<any[]>;

  constructor(private listTopicService: ListTopicService) {
    this.items$ = this.listTopicService.execute();
  }
}
