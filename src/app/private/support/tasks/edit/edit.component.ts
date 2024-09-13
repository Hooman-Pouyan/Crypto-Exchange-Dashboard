import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Api_Endpoints } from 'src/app/core/Configs/Api_Endpoints';
import { SupportService } from 'src/app/core/Services/Feature Services/support.service';
import { ToastrMessagesService } from 'src/app/core/Services/Shared Services/toastr-messages.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent {

  task = signal<any>({})
  taskId!: number;

  profileImage = computed(() => this.task().info.profile_image !== null ? environment.fileUrl + this.task().info.profile_image.id : '')
  documentImage = computed(() => {
    const imageColumn = this.task().callback.find((cols: any) => cols.column_name == 'image')
    return environment.fileUrl + imageColumn?.value?.id
  })

  documentBackImage = computed(() => {
    const imageColumn = this.task().callback.find((cols: any) => cols.column_name == 'back_image')
    return environment.fileUrl + imageColumn?.value?.id
  })


  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private supportservice:SupportService,
    private toast:ToastrMessagesService,
  ) {
    this.taskId = this.activatedroute.snapshot.params["id"]

    this.fetchTaskData()
  }

  updateTaskStatus(updatedStatus: boolean) {

    Swal.fire({
      title: !updatedStatus ? 'توضیحات رد کردن کردن درخواست' : 'آیا از تایید درخواست مطمئن هستید ؟',
      input: !updatedStatus ? 'text' : undefined,
      showCancelButton: true,
      confirmButtonText: 'ارسال',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        var status = {
          accept_type: updatedStatus == true ? 1 : -1,
          reason_reject: !updatedStatus ? result.value : null
        }
        this.supportservice.updateData(this.task().info.id,status, Api_Endpoints.support.task.update_status).subscribe(
          (response) => {
          if (response.message) {
            this.toast.showSuccess("وضعیت درخواست ثبت شد")
            this.task.set([])
            this.fetchTaskData()

            if (!updatedStatus) {
              Swal.fire({
                title: response.message,
                titleText: `توضیحات رد شدن درخواست`,
                text: result.value,
              })
            }
          }}
        )}else {

        }
        })

      }


  fetchTaskData(){
    this.supportservice.fetchById(this.taskId, Api_Endpoints.support.task.details).subscribe(taskDetail => {
      this.task.set(taskDetail)
    })
  }

}
