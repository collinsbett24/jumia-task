
import { Component, ViewChild, OnInit, NgZone, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, Subscription, throttleTime } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInterface } from 'src/app/interfaces/userInterface';
import { ApiService } from 'src/app/service/api.service';
import { LoaderService } from 'src/app/service/loader.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {

  animal!: string;
  name!: string;

  title = 'Users App List';
  Data: Array<UserInterface> = [];
  dataSource = new MatTableDataSource<UserInterface>(this.Data);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(CdkVirtualScrollViewport) scroller!: CdkVirtualScrollViewport;

  displayedColumns: string[] = ['name', 'gender', 'nationality', 'email', 'current_age', 'seniority', 'phone', 'picture'];

  private subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog, private ngZone: NgZone, private api: ApiService, public loader: LoaderService) { }
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
    this.subscriptions.push(resp.subscribe((response: any) => {
      this.loader.isLoading.next(true)
      this.dataSource.data = response.results as UserInterface[];
    }));
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterTableContent, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './templates/dialog-overview-example-dialog.html',
  styleUrls: ['./table-component.component.css']
})
export class DialogOverviewExampleDialog {
  displayedColumns: string[] = ['name', 'gender', 'nationality', 'email', 'current_age', 'seniority', 'phone', 'picture'];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  updateDisplay(column_name: string) {
    console.log(column_name)
    let index = this.displayedColumns.findIndex(d => d == column_name);
    console.log(index)
    if (index >= 0)
      this.displayedColumns.splice(index, 1);
    else
      this.displayedColumns.push(column_name);
  }

  displayAll() {
    this.displayedColumns.splice(0);
    this.displayedColumns.push('name', 'gender', 'nationality', 'email', 'current_age', 'seniority', 'phone', 'picture');
  }
}

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'filter-table-content',
  templateUrl: './templates/filter-table-content.html',
  styleUrls: ['./table-component.component.css']
})
export class FilterTableContent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'app-columns',
  templateUrl: './templates/columns.component.html',
  styleUrls: ['./templates/columns.component.css']
})
export class ColumnsComponent implements OnInit {

  toppings = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }
  task: string[] = ['name', 'gender', 'nationality', 'email', 'current_age', 'seniority', 'phone', 'picture'];

  @Output() displayColumn = new EventEmitter<any>()

  removeColumn(value: any) {
    this.displayColumn.emit(value);
  }
}

@Component({
  selector: 'app-gender-options',
  templateUrl: './templates/gender-options.component.html',
  styleUrls: ['./templates/gender-options.component.css']
})
export class GenderOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  gender: string[] = ['Male', 'Female'];

  @Output() filterGender = new EventEmitter<any>()

  getGender(value: any) {
    this.filterGender.emit(value);
  }
}
