import { Component, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WeaponDetected } from '../Models/weapon.detected';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-send-alert',
  templateUrl: './send-alert.component.html',
  styleUrls: ['./send-alert.component.css']
})
export class SendAlertComponent {
  containerPath: string = 'https://demotestml0100163724.blob.core.windows.net/avicontainer/';
  public popupData: WeaponDetected;
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<SendAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WeaponDetected) {
   
      this.popupData = {
        fileName: data.fileName,
        location: data.location,
        alertReceiver: data.alertReceiver,
        time: data.insertedOn,
        isAlertSent: data.isAlertSent,
        userId: data.userId,
        insertedOn: data.insertedOn,
        id: data.id
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendAlert(popUpData: WeaponDetected): void{
    this.dialogRef.close(popUpData);
    this.http.post<WeaponDetected[]>(`${environment.baseUrl}/api/SendEmailAlert/SendAlert`
    ,popUpData)
    .subscribe({
      next: (result: any) => {
         alert(result.message);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
       // this.showLoader = false;
      }
    });


  }
}
