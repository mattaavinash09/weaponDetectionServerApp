import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface PeriodicElement {
  location: string;
  detection: string;
  alertSentTo: string;
  time: string;
}

const ELEMENT_DATA: PeriodicElement[] =[];
const containerPath = 'https://demotestml0100163724.blob.core.windows.net/avicontainer/';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['detection', 'location', 'alertSentTo', 'time'];
 

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
     this.http.get<string[]>(this.url + '/listfiles')
       .subscribe({
         next: (result) => {
          debugger
          result?.forEach(element => {
            ELEMENT_DATA.push({detection: containerPath+element, location: 'Houston', alertSentTo: '', time: '2023-10-15 12:10:10'});
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
