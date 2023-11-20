import { NgIf } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MaterialModule } from 'src/app/material/material/material.module';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-paciente-editar',
  templateUrl: './paciente-editar.component.html',
  styleUrls: ['./paciente-editar.component.css'],
  standalone:true,
  imports:[MaterialModule, ReactiveFormsModule,RouterLink,NgIf]
})
export class PacienteEditarComponent implements OnInit {
  form:FormGroup;
  id:number;
  isEdit:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PacienteService,
    private _snackBar: MatSnackBar
  ) { }

ngOnInit(): void {


  //Inicializar
  this.form = new FormGroup({
    idPaciente:new FormControl(0),
    nombres:new FormControl('', [Validators.required,Validators.minLength(3)]),
    apellidos:new FormControl('', [Validators.required,Validators.minLength(3)]),
    dni:new FormControl('', [Validators.required,Validators.minLength(8), Validators.maxLength(8)]),
    email:new FormControl('', [Validators.required,Validators.email])
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
        idPaciente:new FormControl(data.idPaciente),
        nombres:new FormControl(data.nombres, [Validators.required,Validators.minLength(3)]),
        apellidos:new FormControl(data.apellidos, [Validators.required,Validators.minLength(3)]),
        dni:new FormControl(data.dni, [Validators.required,Validators.minLength(8), Validators.maxLength(8)]),
        email:new FormControl(data.email, [Validators.required,Validators.email])

    })
  })
  }
}


operate(){
  if(this.form.invalid) {
    this._snackBar.open('Formulario invalido', 'INFO', {duration:2000});
    return;
  }

  const paciente:Paciente = new Paciente();
  paciente.idPaciente = this.form.value['idPaciente'];
  paciente.nombres = this.form.value['nombres'];
  paciente.apellidos = this.form.value['apellidos'];
  paciente.dni = this.form.value['dni'];
  paciente.email = this.form.value['email'];

  if(this.isEdit){
    //Acutalizar
    //No ideal - practica comun

    this.service.modificar(this.id,paciente).subscribe(() => {
      this.service.listar().subscribe(data => {
        this.service.setPacienteChange(data);
        this.service.setMensajeChange('ACTUALIZADO!');
      });
    });

  }else{
    //Registrar
    //Ideal - practica recomendada
    this.service.registrar(paciente).pipe(switchMap(()=> {
      return this.service.listar();

    }))
    .subscribe(data => {
      this.service.setPacienteChange(data);
      this.service.setMensajeChange('REGISTRADO!');
    })
  }

  this.router.navigate(['/pages/paciente']);

}


  //Para evitar el forms.control en el html
  get f(){
    return this.form.controls;
  }

}
