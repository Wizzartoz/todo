import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Task} from "../model/task";
import {BehaviorSubject} from "rxjs";
import {TokenStorageService} from "./token-storage-service";
import {Filter} from "../main.page/toolbar/toolbar.component";
import {environment} from "../../../environments/environment";


@Injectable({providedIn: "root"})
export class TaskService {

  public todoList: Task[] = [];
  // @ts-ignore
  public entities$: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  private url: string = environment.url + 'tasks';

  constructor(private http: HttpClient, private storage: TokenStorageService) {
    this.http = http;
    this.storage = storage;
  }

  public getAll() {
    this.http.get<Task[]>(this.url + "?username=" + this.storage.getUsername())
      .subscribe(data => {
        let filter1: Task[] = this.filterByTopic(data)
        let filter2: Task[] = this.filterByStatus(filter1);
        this.todoList = this.filterBySearch(filter2);
        this.entities$.next(this.todoList);
      })
  }

  public add(task: Task) {
    this.http.post<Task>(this.url + "/" + this.storage.getUsername(), task)
      .subscribe(data => {
        let tasks = [data]
        this.todoList.forEach(data => tasks.push(data))
        let todo: Task[] = this.filterByTopic(tasks)
        this.todoList = this.filterByStatus(todo);
        this.entities$.next(this.todoList);
      });

  }

  public remove(id: any) {
    this.http.delete<void>(this.url + "/" + id)
      .subscribe(() => {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
        this.entities$.next(this.todoList);
      })
  }

  public updateStatus(id: any, status: string) {
    this.http.patch<Task>(this.url + "/" + id + "/" + status, [])
      .subscribe(todo => {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
        let tasks = this.filterByStatus([todo]);
        if (tasks.length != 0) {
          this.todoList.push(todo);
        }
        this.entities$.next(this.todoList);
      });
  }

  private filterByStatus(todo: Task[]) {
    let newTask: Task[] = [];
    let namesStatus: string[] = this.getNamesStatus();
    if (namesStatus.length != 0) {
      for (let index in todo) {
        let isPassed = namesStatus.find(data => data === todo[index].status)
        if (isPassed !== undefined) {
          newTask.push(todo[index])
        }
      }
      return newTask;
    }
    return todo;
  }

  public filterBySearch(tasks: Task[]) {
    let newTask: Task[] = [];
    // @ts-ignore
    let names: string[] = JSON.parse(sessionStorage.getItem("search"));
    if (names == null) {
      return tasks
    }

    if (names.length != 0) {
      for (let index in tasks) {
        let isPassed = names.find(data => tasks[index].name.includes(data))
        if (isPassed !== undefined) {
          newTask.push(tasks[index])
        }
      }
      console.log(newTask)
      return newTask;
    }
    return tasks;
  }


  public filterByTopic(tasks: Task[]) {
    let newTask: Task[] = [];
    let namesTopic: string[] = this.getNamesTopic();
    if (namesTopic.length != 0) {
      for (let index in tasks) {
        let isPassed = namesTopic.find(data => data === tasks[index].topic)
        if (isPassed !== undefined) {
          newTask.push(tasks[index])
        }
      }
      return newTask;
    }
    return tasks;
  }

  public getNamesStatus(): string[] {
    // @ts-ignore
    let statusFilters: Filter[] = JSON.parse(sessionStorage.getItem("statusFilter"))
    let filters: string[] = [];

    if (statusFilters != null) {
      statusFilters.filter(data => data.completed).map(data => data.name).forEach(data => filters.push(data))
    }
    return filters;
  }

  public getNamesTopic(): string[] {
    // @ts-ignore
    let topicFilters: Filter[] = JSON.parse(sessionStorage.getItem("topicFilter"))
    // @ts-ignore
    let filters: string[] = [];
    if (topicFilters != null) {
      topicFilters.filter(data => data.completed).map(data => data.name).forEach(data => filters.push(data));
    }
    return filters;
  }


  public update() {

  }

}
