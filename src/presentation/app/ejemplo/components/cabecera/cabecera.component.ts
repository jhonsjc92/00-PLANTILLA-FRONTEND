import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cabecera } from '../../interfaces/cabecara.interface';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {

  cabecera: Cabecera ={ codigo: 0, descripcion: '', fecha: "", archivo: [], estado: 0, detalle:''} 

  onUploadStarted(e: any) {
    console.log("start", e);
  }

  onUploadProgress(e: any) {
    console.log("pro", e);
  }
 
  handleFile() {
     let inputs:any='';
    let binaryContent= null;
     inputs= document.getElementsByName('cargar');
    if (inputs[1].files && inputs[1].files[0]) {
      var file = inputs[1].files[0];
      // var reader = new FileReader();
      // reader.onloadend = async function(e:any) {
      //   const arrayBuffer = e.target.result;
      //   // Crea un Uint8Array a partir del ArrayBuffer
      //   const uint8Array = new Uint8Array(arrayBuffer);
      //   binaryContent=uint8Array;
      //   // console.log(uint8Array);
      // }
      // reader.readAsArrayBuffer(file);
      file.arrayBuffer().then((e:any)=>{
        const uint8Array = new Uint8Array(e);
        const arrayBuffer = uint8Array.buffer;
        const intArray = Array.from(uint8Array);

        // Convierte el array de números enteros a una cadena de texto
        const textString = String.fromCharCode(...intArray);
        console.log(textString);
        // Codifica el Uint8Array a una cadena en formato Base64
        const base64String = btoa(textString);
        
        this.cabecera.archivo=base64String;

        // console.log(e)
      });
    }
    
  }

  get value(): Cabecera {
    return this.cabecera;
  };

  @Input()
  set value(value: Cabecera) {
    this.cabecera = value;
    this.valueChange.emit(value);
  };

  @Output() valueChange: EventEmitter<Cabecera> = new EventEmitter();
}
