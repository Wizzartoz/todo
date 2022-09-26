import {Component, Injectable, OnInit} from '@angular/core';
import {Task} from "../../model/task";
import {TaskService} from "../../services/task-service";
@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tasks: Task[] = [];
  tableSize: any = 10;
  count: string | number;
  description: string
  name: string


  constructor(private service: TaskService) {
  }

  ngOnInit() {
    this.service.entities$
      .subscribe(data => {
        this.tasks = data;
      });
    this.service.getAll()
  }

  delete(id: any) {
    this.service.remove(id);
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.service.getAll();
  }
  page: string | number;
  isEdit: boolean;
  taskId: any = -1;

  updateTaskStatus(id: any, status: string) {
    let newStatus: string = "Close";
    if (status === "Close") {
      newStatus = "Open"
    }
    this.service.updateStatus(id, newStatus);
  }


  setId(id: any) {
    this.taskId = id;
  }

  setDescription(description: HTMLInputElement) {
    this.description = description.value

  }

  setName(name: HTMLInputElement) {
    this.name = name.value;

  }
}

