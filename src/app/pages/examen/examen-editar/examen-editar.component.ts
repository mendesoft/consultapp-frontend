import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamenService } from 'src/app/services/examen.service';
import { Examen } from 'src/app/model/examen';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-examen-editar',
  standalone: true,
  imports:[MaterialModule, ReactiveFormsModule,RouterLink,NgIf],
  templateUrl: './examen-editar.component.html',
  styleUrl: './examen-editar.component.css'
})
export class ExamenEditarComponent  implements OnInit {
  form:FormGroup;
  id:number;
  isEdit:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExamenService,
    private _snackBar: MatSnackBar

  ) { }

ngOnInit(): void {


  //Inicializar
  this.form = new FormGroup({
    idExamen:new FormControl(0),
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
        idExamen:new FormControl(data.idExamen),
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

  const examen:Examen = new Examen();
  examen.idExamen = this.form.value['idExamen'];
  examen.nombre = this.form.value['nombre'];

  if(this.isEdit){
    //Acutalizar
    //No ideal - practica comun

    this.service.modificar(this.id,examen).subscribe(() => {
      this.service.listar().subscribe(data => {
        this.service.setExamenChange(data);
        this.service.setMensajeChange('ACTUALIZADO!');
      });
    });

  }else{
    //Registrar
    //Ideal - practica recomendada
    this.service.registrar(examen).pipe(switchMap(()=> {
      return this.service.listar();

    }))
    .subscribe(data => {
      this.service.setExamenChange(data);
      this.service.setMensajeChange('REGISTRADO!');
    })
  }

  this.router.navigate(['/pages/examen']);

}


  //Para evitar el forms.control en el html
  get f(){
    return this.form.controls;
  }

}
