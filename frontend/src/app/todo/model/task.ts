export class Task {
  status:string
  name:string
  description:string
  topic:string
  createTime?:string
  id?:number


  constructor(topic: string, name: string, description: string,status: string, createTime?:string,id?:number) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.topic = topic;
    this.createTime = createTime;
    this.id = id;
  }
}
