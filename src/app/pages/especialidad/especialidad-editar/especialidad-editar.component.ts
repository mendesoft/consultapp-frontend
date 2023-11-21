import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material/material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Especialidad } from 'src/app/model/especialidad';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-especialidad-editar',
  standalone: true,
  imports:[MaterialModule, ReactiveFormsModule,RouterLink,NgIf],
  templateUrl: './especialidad-editar.component.html',
  styleUrl: './especialidad-editar.component.css'
})
export class EspecialidadEditarComponent implements OnInit {
  form:FormGroup;
  id:number;
  isEdit:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EspecialidadService,
    private _snackBar: MatSnackBar

  ) { }

ngOnInit(): void {


  //Inicializar
  this.form = new FormGroup({
    idEspecialidad:new FormControl(0),
    nombre:new FormControl('', [Validators.required,Validators.minLength(3)]),
  });

  this.route.params.subscribe(data => {
    this.id = data['id'];
    this.isEdit = data['id'] !=null;
    this.initForm()
  })
}

initForm(){
  if(this.isEdit){
    this.service.listarPorId(this.id).subscribe(data => {
      this.form = new FormGroup({
        idEspecialidad:new FormControl(data.idEspecialidad),
        nombre:new FormControl(data.nombre, [Validators.required,Validators.minLength(3)]),


    })
  })
  }
}


operate(){
  if(this.form.invalid) {
    this._snackBar.open('Formulario invalido', 'INFO', {duration:2000});
    return;
  }

  const especialidad:Especialidad = new Especialidad();
  especialidad.idEspecialidad = this.form.value['idEspecialidad'];
  especialidad.nombre = this.form.value['nombre'];

  if(this.isEdit){
    //Acutalizar
    //No ideal - practica comun

    this.service.modificar(this.id,especialidad).subscribe(() => {
      this.service.listar().subscribe(data => {
        this.service.setEspecialidadChange(data);
        this.service.setMensajeChange('ACTUALIZADO!');
      });
    });

  }else{
    //Registrar
    //Ideal - practica recomendada
    this.service.registrar(especialidad).pipe(switchMap(()=> {
      return this.service.listar();

    }))
    .subscribe(data => {
      this.service.setEspecialidadChange(data);
      this.service.setMensajeChange('REGISTRADO!');
    })
  }

  this.router.navigate(['/pages/especialidad']);

}


  //Para evitar el forms.control en el html
  get f(){
    return this.form.controls;
  }

}

