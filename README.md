# ConsultAPP
![texto alt](https://www.brainandlife.org/siteassets/online-exclusives/covid-19/telehealth-computer-main.jpg) 
### Temas desarrollados
1. ***Angular***
2. Guard
3. Angular Material
4. Integración con Spring

[Documentación](https://angular.io/)

```typescript
export class GenericService<T> {

  constructor(
    protected http:HttpClient,
    @Inject("url") protected url:string
  ) { }


  listar(){
    return this.http.get<T[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<T>(`${this.url}/${id}`);
  }

  registrar(t: T){
    return this.http.post(this.url, t);
  }

  modificar(t: T){
    return this.http.put(this.url, t);
  }

  eliminarPorId(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}

```

> El código perfecto no existe


### Dependencias

```cmd
$ npm install @auth0/angular-jwt

```
