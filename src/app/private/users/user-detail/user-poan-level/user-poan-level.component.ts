import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClubService} from 'src/app/core/Services/Feature Services/club.service';
import {ToastrMessagesService} from 'src/app/core/Services/Shared Services/toastr-messages.service';

export const PoanLevels = [
  "Normal level",
  "Bronze level",
  "Silver level",
  "Golden level",
  "Diamond level"
]

@Component({
  selector: 'app-user-poan-level',
  templateUrl: './user-poan-level.component.html',
  styleUrls: ['./user-poan-level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPoanLevelComponent implements OnInit {

  constructor(
    private router:Router,
    private clubService:ClubService,
    private activatedRoute:ActivatedRoute,

  ) {}

  messageService = inject(ToastrMessagesService)
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params["id"]

    this.clubService.getUserLevel(this.userId).subscribe({
      next: (poanLevel) => {
        this.value = poanLevel.id
        this.loading.set(false)
      }
    })

  }
  loading = signal<boolean>(true)
  poanLevels = PoanLevels
  userId!: any;
  ValueColor = [
    'blue',
    'brown',
    'gray',
    'gold',
    'purple',
  ]
  value: number = 0;

  onLevelSubmit(){
    this.clubService.updateUserLevel(Number(this.userId), { admin_poan_level_id: this.value }).subscribe((res) => {
      this.messageService.showSuccess(res.message)
    })
  }






}
