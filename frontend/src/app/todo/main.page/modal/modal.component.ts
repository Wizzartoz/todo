import {Component,  OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Task} from "../../model/task";
import {NgForm} from "@angular/forms";
import {TaskService} from "../../services/task-service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  constructor(public dialog: MatDialog) {
  }

  openDialog() {
     this.dialog.open(ModalContent);
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'modal-content.html',
})
export class ModalContent {

  url = 'http://localhost:8080/tasks';

  constructor(public service:TaskService) {
  }

  addUser(taskForm: NgForm) {
    let task: Task = this.createUser(taskForm)
    this.service.add(task);
  }

  createUser(taskForm: NgForm) {
    return new Task(taskForm.value.topic, taskForm.value.name, taskForm.value.description, 'Open');
  }
}
