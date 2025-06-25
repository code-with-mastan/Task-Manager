import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: \`
    <h2>Task Manager</h2>
    <input [(ngModel)]="newTask" placeholder="Add task" />
    <button (click)="addTask()">Add</button>
    <ul>
      <li *ngFor="let task of tasks">{{ task.title }}</li>
    </ul>
  \`
})
export class AppComponent implements OnInit {
  tasks: any[] = [];
  newTask = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get<any[]>('http://localhost:3000/api/tasks')
      .subscribe(data => this.tasks = data);
  }

  addTask() {
    this.http.post<any>('http://localhost:3000/api/tasks', { title: this.newTask })
      .subscribe(task => {
        this.tasks.push(task);
        this.newTask = '';
      });
  }
}