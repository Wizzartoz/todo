import {Task} from "./task";

interface Embedded {
  taskModelList: Task[]
}

export interface Links {
  first: string;
  last: string;
  next: string;
  self: string
}

export interface Page {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Paginate {
  _embedded: Embedded;
  _links: Links;
  page: Page;
}
