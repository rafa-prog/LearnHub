import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import Reply from '../models/Reply';

@Injectable({
  providedIn: 'root'
})
export class CreateReplyService {
  firestore: Firestore = inject(Firestore)

  constructor() {}

  async execute(reply: Reply) {
    return addDoc(collection(this.firestore, 'replies'),
    {
      user: reply.user,
      content: reply.content,
      post: reply.post,
      replies: reply.replies,
      reply_date: reply.reply_date,
      edit_date: reply.edit_date,
      votes: reply.votes
    })
  }
}
