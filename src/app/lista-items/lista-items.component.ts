import { Component } from '@angular/core';
import { Citas } from '../models/citas';

@Component({
  selector: 'app-lista-items',
  templateUrl: './lista-items.component.html',
  styleUrls: ['./lista-items.component.css']
})
export class ListaItemsComponent {
  //pendiente:string = 'Hola Mundo'

  nuevoItemDesc:string = "";
  nuevoItemTitulo:string = "";
  nuevoItemFecha:Date = new Date;
  nuevoItemCompleted: boolean = false;
  lista : Citas[] = [];
  itemActual:Citas = {
    id : -1,
    titulo: '',
    descripcion: '',
    fecha: new Date,
    completed: false,
  }

  agregar(){
    if(this.nuevoItemTitulo.trim().length && this.nuevoItemDesc.trim().length && this.nuevoItemFecha){
      let ultimoItem:Citas = {
        id : this.lista.length+1,
        titulo: this.nuevoItemTitulo,
        descripcion: this.nuevoItemDesc,
        fecha: this.nuevoItemFecha,
        completed: this.nuevoItemCompleted
      }
      this.lista.push(ultimoItem);
    } else {
      alert('Especifique datos');
    }
  }

  eliminarItem(index:number){
    this.lista.splice(index,1);
    for (let i = 0; i < this.lista.length; i++){
      this.lista[i].id = i+1;
    }
    this.itemActual.id = 0;
  }

  modificarItem(index:number){
    if(index+1 == this.itemActual.id){
      this.itemActual.id = 0
    } else {
      this.itemActual = {
        id : this.lista[index].id,
        titulo: this.lista[index].titulo,
        descripcion: this.lista[index].descripcion,
        fecha: this.lista[index].fecha, //TODO placeholder de modificacion correspondiente a la fecha cuando no se especifica fecha al agregar
        completed: this.lista[index].completed
      }
    }
  }

  completarItem(index:number){
    this.lista[index].completed = !this.lista[index].completed;
  }

  guardarLista(){
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(this.lista, null, 2)], {
      type: "text/plain"
    }));
    a.setAttribute("download", "Tareas.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
