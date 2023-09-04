import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import Topic from '../models/Topic';

@Injectable({
  providedIn: 'root'
})
export class CreateTopicService {
  firestore: Firestore = inject(Firestore)

  constructor() {}

  async execute(topic: Topic) {
    return addDoc(collection(this.firestore, 'topics'),
    {
      name: topic.name,
      posts: topic.posts,
      users: topic.users,
      owner: topic.owner
    })
  }
}
