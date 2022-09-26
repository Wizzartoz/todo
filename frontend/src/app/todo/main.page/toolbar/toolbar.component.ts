import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task-service";

export interface Filter {
  name: string;
  completed: boolean;
  subtasks?: Filter[];
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  topic: Filter = {
    name: 'Topic',
    completed: false,
    subtasks: [
      {name: 'Life', completed: false},
      {name: 'Sport', completed: false},
      {name: 'Study', completed: false},
      {name: 'Other', completed: false}
    ],
  };

  status: Filter = {
    name: 'Status',
    completed: false,
    subtasks: [
      {name: 'Open', completed: false},
      {name: 'Close', completed: false}
    ],
  };

  constructor(private service: TaskService) {

  }

  ngOnInit(): void {
    console.log(this.topic)
    // @ts-ignore
    let subsTopic = JSON.parse(sessionStorage.getItem("topicFilter"));
    if (subsTopic != null) {
      this.topic.subtasks = subsTopic;
    }
    // @ts-ignore
    let subsStatus = JSON.parse(sessionStorage.getItem("statusFilter"));
    if (subsStatus != null) {
      this.status.subtasks = subsStatus;
    }
  }

  allCompleteTopic: boolean = false;
  allCompleteStatus: boolean = false;

  updateAllCompleteTopic() {
    this.allCompleteTopic = this.topic.subtasks != null && this.topic.subtasks.every(t => t.completed);
    sessionStorage.setItem("topicFilter", JSON.stringify(this.topic.subtasks));
    this.service.getAll();
  }

  someCompleteTopic(): boolean {
    if (this.topic.subtasks == null) {
      return false;
    }
    return this.topic.subtasks.filter(t => t.completed).length > 0 && !this.allCompleteTopic;
  }

  setAllTopic(completed: boolean) {
    this.allCompleteTopic = completed;
    if (this.topic.subtasks == null) {
      return;
    }
    this.topic.subtasks.forEach(t => (t.completed = completed));
    sessionStorage.setItem("topicFilter", JSON.stringify(this.topic.subtasks));
    this.service.getAll();
  }

  updateAllCompleteStatus() {
    this.allCompleteStatus = this.status.subtasks != null && this.status.subtasks.every(t => t.completed);
    sessionStorage.setItem("statusFilter", JSON.stringify(this.status.subtasks));
    this.service.getAll();
  }

  someCompleteStatus(): boolean {
    if (this.status.subtasks == null) {
      return false;
    }
    return this.status.subtasks.filter(t => t.completed).length > 0 && !this.allCompleteStatus;
  }

  setAllStatus(completed: boolean) {
    this.allCompleteStatus = completed;
    if (this.status.subtasks == null) {
      return;
    }
    this.status.subtasks.forEach(t => (t.completed = completed));
    sessionStorage.setItem("statusFilter", JSON.stringify(this.status.subtasks));
    this.service.getAll();
  }
}
