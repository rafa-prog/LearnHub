import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Post from '../../models/Post';
import { Timestamp } from '@angular/fire/firestore/firebase';
import { ShowPostService } from '../../services/show.post.service';
import { UpdatePostService } from '../../services/update.post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Reply from '../../models/Reply';
import { AuthService } from 'src/utils/auth.service';
import User from 'src/app/users/models/User';
import { ShowUserService } from 'src/app/users/services/show.user.service';
import { CreateReplyService } from 'src/app/forum/services/create.reply.service';
import { ListReplyService } from 'src/app/forum/services/list.replies.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post | null
  replies: Reply[] | null
  postId: any
  uid: any
  username: any
  FormReply: FormGroup
  isSubmitted = false

  constructor(private showTopicS: ShowPostService,
    private authService: AuthService,
    private listReplyService: ListReplyService,
    private createReplyService: CreateReplyService,
    private showUserService: ShowUserService,
    private updatePostS: UpdatePostService,
    private formBuilder: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.setData()

    this.isSubmitted = false;
    this.FormReply = this.formBuilder.group({
      text: ['', [Validators.required]]
    })
    this.getUsername()
  }

  async getUsername() {
    let user = this.authService.getUserLogged()

    if(user) {
      this.uid = user.uid
      let userData: User | null = await this.showUserService.execute(this.uid)
      this.username = userData?.username
    }
  }

  onSumbit() {
    this.isSubmitted = true

    if(!this.FormReply.valid || this.username == null) {
      this.isSubmitted = false
      this.FormReply.reset()

      if(this.username == null) {
        this.navigate('/sign-in')
        alert('Usuário desconectado!')
      }

      alert('Campo(s) de cadastro inválido(s)!')
      return false
    }

    this.reply()
    return true
  }

  async reply() {
    let reply = new Reply()

    reply.user = this.username
    reply.content = this.FormReply.controls['text'].value

    reply.post = this.postId
    reply.replies = []

    reply.reply_date = new Date()
    reply.edit_date = reply.reply_date

    reply.votes = 0

    await this.createReplyService.execute(reply)
    .then((documentReference) => {
      this.post?.replies.push(documentReference.id)

      if(this.post){
        this.updatePostS.findAndUpdateDocument(this.postId, this.post)
        .then(() => {
          location.reload()
          alert('Comentário criado com sucesso!')
        })
      }
    })
  }

  setData() {
    this.post = history.state.topic

    if (this.post == undefined) {
      this.aRoute.params.subscribe(async params => {
        this.postId = params['id'];
        try {
          this.post = await this.showTopicS?.getPostById(this.postId);

          this.replies = await this.listReplyService.getRepliesByPosts(this.postId)

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

    goToUser(user: any) {
      if(user){
        this.router.navigateByUrl('/u/' + user, {state: {user: user}});
      }
    }
    
    goToPost(post: Post) {
      this.router.navigateByUrl('/t/'+ post.topic + "/" + post.id, {state: {post: post}});
    }

    navigate(link: string) {
      this.router.navigate([link])
    }
  }
