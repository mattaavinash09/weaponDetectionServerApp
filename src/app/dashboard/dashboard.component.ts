import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {WeaponDetected} from 'src/app/Models/weapon.detected';
export interface PeriodicElement {
  location: string;
  detection: string;
  alertSentTo: string;
  time: string;
}

const ELEMENT_DATA: WeaponDetected[] =[];
const containerPath = 'https://demotestml0100163724.blob.core.windows.net/avicontainer/';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['detection', 'location', 'alertReceiver', 'time','isAlertSent'];
 

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  private url = environment.baseUrl + 'api/Items';
  files: string[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.showBlobs();
  }

  showBlobs() {
    // this.showLoader = true;
     debugger
     this.http.get<WeaponDetected[]>(this.url)
       .subscribe({
         next: (result) => {
          debugger
          result?.forEach(ele => {
            ELEMENT_DATA.push({fileName: containerPath+ele.fileName
              , location: ele.location
              , alertReceiver: ele.alertReceiver
              , time: ele.insertedOn
              ,isAlertSent: ele.isAlertSent
              ,userId: ele.userId
              ,insertedOn: ele.insertedOn});
           });
           this.dataSource = new MatTableDataSource(ELEMENT_DATA);
         },
         error: (err) => {
           console.error(err);
         },
         complete: () => {
          // this.showLoader = false;
         }
       });
   }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
