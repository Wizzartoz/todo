import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task-service";

@Component({
  selector: 'app-todopage',
  templateUrl: './todopage.component.html',
  styleUrls: ['./todopage.component.css']
})
export class TodopageComponent implements OnInit {
  value: any;


  constructor(private service: TaskService) {
  }

  ngOnInit(): void {
    this.service.entities$.subscribe(data => {
      let a = data.filter(data => data.status === 'Close').length
      let b = data.length
      this.value = (a / b) * 100;
    });

  }


}

