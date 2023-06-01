import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileContent } from '../../interfaces/file.interface';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos-multiple.component.html',
  styleUrls: ['./anexos-multiple.component.css']
})
export class AnexosMultipleComponent   {
  
  @Input()
  public items: any = [];
  unitArray: any;
  fileInput: any;

  @Input()
  documentoBase64: FileContent[] = [];
  
  @Input()
  set pruebaData(value: FileContent[]) {
   
  }
  onSelected(e: any) {
    if(e.previousValue != e.value){
      this.filesToUint8Arrays(e.value);
      this.valueBase64Change.emit(this.documentoBase64);
    }
    // for (let index = 0; index < e.value.length; index++) {
    //   console.log(e);
    //   // e.value[index].arrayBuffer().then((e: any) => {
    //   //   console.log(e.value[index])
    //   //   const uint8Array = new Uint8Array(e);
    //   //   const arrayBuffer = uint8Array.buffer;
    //   //   const intArray = Array.from(uint8Array);
    //   //   // Convierte el array de números enteros a una cadena de texto
    //   //   const textString = String.fromCharCode(...intArray);
    //   //   // console.log(textString)
    //   //   // Codifica el Uint8Array a una cadena en formato Base64
    //   //   const base64String = btoa(textString);
    //   //   this.documentoBase64.push(base64String)
    //   //   this.valueChange.emit(this.documentoBase64);
    //   // });
    // }
    // console.log("selecciono",e.value);
    // this.items=e.value;
    // this.fileInput = document.getElementById('anexos') as HTMLInputElement;
    // this.fileInput.addEventListener('change', async (event:any) => {
    //   const file = event.target.files[0];
    //   try {
    //     const uint8Array = await this.fileToUint8Array(file);
    //     this.unitArray=uint8Array;
    //     console.log(uint8Array);
    //   } catch (error) {
    //     console.error(error);
    //   }});
  }

  filesToUint8Arrays(files: File[]): Promise<string[]> {
    this.documentoBase64 = [];
    const filePromises = files.map((file) => this.fileToUint8Array2(file));
    return Promise.all(filePromises);
  }

  fileToUint8Array2(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const intArray = Array.from(uint8Array);
        // Convierte el array de números enteros a una cadena de texto
        const textString = String.fromCharCode(...intArray);
        // Codifica el Uint8Array a una cadena en formato Base64
        const base64String = btoa(textString);
        const fileContent: FileContent = { name: file.name, size: file.size, type: file.type, lastModified: file.lastModified, base64String: base64String }
        this.documentoBase64.push(fileContent)
        resolve(base64String);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the file."));
      };

      reader.readAsArrayBuffer(file);
    });
  }
 
  uint8ArrayToFile(uint8Array: Uint8Array, fileName: string): File {
    const file = new File([uint8Array], fileName);
    return file;
  }

  get value(): any {
    return this.items;
  };

  @Input()
  set value(value: any) {

     this.items = value;
     this.valueChange.emit(value);
  };

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

 
  get valueBase64(): any {
    return this.documentoBase64;
  };
  @Input()
  set valueBase64(value: FileContent[]) {

    if(value){
      const vari:any[]=[];
      value.forEach(element => {
        const uint8Array = Uint8Array.from(atob(element.base64String), c => c.charCodeAt(0));
        const archivoFile = this.uint8ArrayToFile(uint8Array, element.name);
        // vari.push(archivoFile);
        this.items.push(archivoFile);
      });
    }
    this.documentoBase64 = value;
    this.valueBase64Change.emit(value);
  };
  @Output() valueBase64Change: EventEmitter<any> = new EventEmitter();
}
