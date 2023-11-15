import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material/material/material.module';

@Component({
  selector: 'app-paciente-editar',
  templateUrl: './paciente-editar.component.html',
  styleUrls: ['./paciente-editar.component.css'],
  standalone:true,
  imports:[MaterialModule, ReactiveFormsModule,RouterLink,NgIf]
})
export class PacienteEditarComponent {

}
