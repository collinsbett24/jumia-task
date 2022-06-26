import { Component, ViewChild, OnInit, NgZone } from '@angular/core';
import { ApiService } from './service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LoaderService } from './service/loader.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import { UserInterface } from './interfaces/userInterface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Users App List';
  Data: Array<UserInterface> = [];
  dataSource = new MatTableDataSource<UserInterface>(this.Data);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(CdkVirtualScrollViewport) scroller!: CdkVirtualScrollViewport;

  displayedColumns: string[] = ['name', 'gender', 'nationality', 'email', 'current_age', 'seniority', 'phone', 'picture'];

  constructor(private ngZone: NgZone, private api: ApiService, public loader: LoaderService) { }
  ngOnInit(): void {
    //calling getData function
    this.getData();

    //assigning data for call
    this.dataSource.sort = this.sort;

    //filterPredicate to filter gender using start characters
    this.dataSource.filterPredicate = function (data: UserInterface, filter: string): boolean {
      return data.gender.toLowerCase().startsWith(filter) || data.location['state'].toLowerCase().includes(filter);
    };

  }

  //function including ngZone to run infinite Virtual scrolling based on scroll height
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset("bottom")),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1) && (y2 < 140)),
      throttleTime(1200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.getData();
        this.scroller.scrollToOffset(0);
      });
    });
  }

  //function to subscribe to the Api service class to get data
  getData() {
    let resp = this.api.getUserInformation();
    resp.subscribe((response: any) => {
      this.loader.isLoading.next(true)
      this.dataSource.data = response.results as UserInterface[];
    });
  }

  //function to Remove and Add Columns to display
  updateDisplay(column_name: string) {
    console.log(column_name)
    let index = this.displayedColumns.findIndex(d => d == column_name);
    console.log(index)
    if (index >= 0)
      this.displayedColumns.splice(index, 1);
    else
      this.displayedColumns.push(column_name);
  }

  //function to filture data on Material data table on KeyUp
  applyFilter(event: string) {
    const filterValue = event;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterByNationality(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayAll() {
    this.displayedColumns.splice(0);
    this.displayedColumns.push('name', 'gender', 'nationality', 'email', 'current_age', 'seniority', 'phone', 'picture');
  }
}
