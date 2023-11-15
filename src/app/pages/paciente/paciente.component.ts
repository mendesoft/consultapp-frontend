import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from 'src/app/material/material/material.module';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente',
  standalone:true,
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  imports:[MaterialModule,NgFor,RouterLink, RouterOutlet]
})
export class PacienteComponent implements OnInit{

  constructor(private service:PacienteService){}


  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  dataSource?: MatTableDataSource<Paciente>;


  pacientes:Paciente[] = [];

  ngOnInit(): void {
    this.listar();
  }

  listar() : any{
  this.service.listar().subscribe(data => {
    this.pacientes = data;
    this.dataSource = new MatTableDataSource(this.pacientes);
  });
  }




}
