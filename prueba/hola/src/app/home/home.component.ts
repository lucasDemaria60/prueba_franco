import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router para la redirección

interface Task {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule, CommonModule]
})
export class HomeComponent {
  tasks: Task[] = [];
  newTask: string = '';
  editTaskIndex: number | null = null; // Para almacenar el índice de la tarea que se está editando
  editTaskTitle: string = ''; // Para almacenar el título de la tarea que se está editando

  constructor(private router: Router) { } // Inyecta el Router

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask, completed: false });
      this.newTask = ''; // Limpiar el campo de entrada
    }
  }

  startEditTask(index: number) {
    this.editTaskIndex = index; // Guarda el índice de la tarea que se va a editar
    this.editTaskTitle = this.tasks[index].title; // Guarda el título de la tarea
  }

  saveEditTask(index: number) {
    if (this.editTaskTitle.trim()) {
      this.tasks[index].title = this.editTaskTitle; // Actualiza el título de la tarea
      this.editTaskIndex = null; // Reinicia el índice de edición
      this.editTaskTitle = ''; // Limpia el campo de edición
    }
  }
  toggleCompletion(task: Task) {
    task.completed = !task.completed;
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
