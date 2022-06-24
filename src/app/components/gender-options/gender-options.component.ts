import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gender-options',
  templateUrl: './gender-options.component.html',
  styleUrls: ['./gender-options.component.css']
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
