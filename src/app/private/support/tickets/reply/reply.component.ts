import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { SupportService } from 'src/app/core/Services/Feature Services/support.service';
import { ToastrMessagesService } from 'src/app/core/Services/Shared Services/toastr-messages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReplyComponent implements OnInit {

  ticketId = signal<number>(0)
  ticketDetail = signal<any>({})
  comments = signal<any>([])
  users = signal<any>({})
  user = signal<any>({})
  operator = signal<any>({})
  loading$ = signal<boolean>(true)

  fileUrl = environment.fileUrl;

  commentFile = signal<File | null>(null);
  newCommentUploadProgress: number = 0;
	sendCommentLoading: boolean = false;
	submitNewComment: boolean = false;

  ticketForm: FormGroup = this.fb.group({
    ticket_id: [this.ticketId()],
    description_ticket: ["", [Validators.required]],
    attachment: null
  })

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private supportService:SupportService,
    private fb:FormBuilder,
    private toast:ToastrMessagesService
  ) {}

  ngOnInit(): void {
     this.activatedRoute.paramMap.subscribe(params => {
      this.ticketId.set(+params.get("id")!)
      this.fetchTciketDetail(this.ticketId())
     })
  }

  fetchTciketDetail(ticketId: number){
    this.loading$.set(true)
      this.supportService.fetchById(this.ticketId(), Api_Endpoints.support.ticket.details).subscribe(ticketDetail => {
        if (ticketDetail) this.loading$.set(false)
        this.ticketDetail.set(ticketDetail["ticket_details"])
        this.comments.set(ticketDetail["comments"].reverse())
        this.users.set(ticketDetail["users"])
        this.user.set(ticketDetail["ticket_details"].user_id)
        this.operator.set(ticketDetail["ticket_details"].user_id)
      })
  }

  onChangeFile(e: any){
    this.commentFile.set(e.target.files[0]);
    console.log(e.target.files[0])
  }

  discardAttachments() {
		this.commentFile.set(null);
	}

  replyTicket(){
    this.loading$.set(true)
    var f = new FormData();
    f.set("description_ticket", this.ticketForm.get("description_ticket")?.value)
    f.set("attachment", this.commentFile()!)
    f.set("ticket_id", this.ticketId().toString()!)
    this.supportService.replyTicket(f).subscribe(response => {
      this.toast.showSuccess(response.message)
    }).add(() => {
      this.ticketForm.reset()
      this.commentFile.set(null)
      this.fetchTciketDetail(this.ticketId())
    })
  }




}
