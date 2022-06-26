import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
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
