import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { ApiService } from './service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LoaderService } from './service/loader.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime, timer } from 'rxjs';
import { UserInterface } from './interfaces/userInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Users App List';

  Data: Array<UserInterface> = [];
  resultsLength = 0;

  dataSource = new MatTableDataSource<UserInterface>(this.Data);
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(CdkVirtualScrollViewport) scroller!: CdkVirtualScrollViewport;

  displayedColumns: string[] = ['name', 'gender', 'location', 'email', 'current_age', 'registration', 'phone', 'picture'];

  constructor(private ngZone: NgZone, private api: ApiService, public loader: LoaderService) { }
  ngOnInit(): void {

    //calling getData function
    this.getData();
    // console.log(this.Data);
  }
  ngAfterViewInit() {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset("bottom")),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1) && (y2 < 140)),
      throttleTime(1200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.getData();
      });
    });
  }
  //subscribe to the service class to get data
  getData() {
    let resp = this.api.getUserInformation();
    resp.subscribe((response: any) => {
      this.loader.isLoading.next(true)
      this.dataSource.data = response.results as UserInterface[];
    });
  }
  //add columns to display
  updateDisplay(column_name: string) {
    console.log(column_name)
    let index = this.displayedColumns.findIndex(d => d == column_name);
    console.log(index)
    if (index >= 0)
      this.displayedColumns.splice(index, 1);
    else
      this.displayedColumns.push(column_name);
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
