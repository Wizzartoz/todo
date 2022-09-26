import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {TaskService} from "../../services/task-service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filters: any[] = [];
  fruitCtrl = new FormControl('');
  auto: any;

  constructor(private service: TaskService) {
  }

  ngOnInit(): void {
    // @ts-ignore

    let filters = JSON.parse(sessionStorage.getItem("search"))
    if (filters != null) {
      this.filters = filters;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.filters.push(value);
    }

    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
    sessionStorage.setItem("search",JSON.stringify(this.filters))
    this.service.getAll()
  }

  remove(fruit: string): void {
    const index = this.filters.indexOf(fruit);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
    sessionStorage.setItem("search",JSON.stringify(this.filters))
    this.service.getAll()
  }


  search(inputElement: HTMLInputElement) {
    let task = this.service.todoList.filter(data=>data.name.includes(inputElement.value))
    this.service.entities$.next(task);
  }
}
