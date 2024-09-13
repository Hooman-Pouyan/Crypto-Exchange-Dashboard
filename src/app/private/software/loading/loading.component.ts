import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  tableData: any[] = [];

  ngOnInit() {
    this.tableData = [
      {
        firstname: 'Varun',
        lastname: 'Pratap',
        age: 20,
        occupation: "Student"
      },
      {
        firstname: 'Badal',
        lastname: 'Mishra',
        age: 21,
        occupation: "Engineer"
      },
      {
        firstname: 'Abhishek',
        lastname: 'Thakur',
        age: 23,
        occupation: "Businessman"
      },
      {
        firstname: 'Karan',
        lastname: 'Patel',
        age: 19,
        occupation: "Sportsman"
      },
      {
        firstname: 'Pallavi',
        lastname: 'Yadav',
        age: 20,
        occupation: "Student"
      },
      {
        firstname: 'Abhinav',
        lastname: 'Yadav',
        age: 21,
        occupation: "Software Developer"
      },
      {
        firstname: 'Abhay',
        lastname: 'Rathore',
        age: 23,
        occupation: "Intern"
      },
      {
        firstname: 'Abhishek',
        lastname: 'Kumar',
        age: 34,
        occupation: "Doctor"
      },
    ];


  }
}
