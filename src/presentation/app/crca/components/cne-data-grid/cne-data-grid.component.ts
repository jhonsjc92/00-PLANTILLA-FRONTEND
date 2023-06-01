import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Headers } from '../../interfaces/cne-data-grid.interface';
import { HeadersDataGrid } from 'src/presentation/app/shared/interfaces/headers-datagrid.interface';

@Component({
  selector: 'cne-data-grid',
  templateUrl: './cne-data-grid.component.html',
  styleUrls: ['./cne-data-grid.component.css']
})
export class CneDataGridComponent {
  /**
   * methodo que se ejecuta cuando se cambia de seleccion
   * @param valor objeto seleccionado
   */
  public onSelectionChangedLibrary(valor: any[]) {
    this.onSelectionChanged.emit(valor);
  }
  /** bandera para verificar si ya se termino de cargar los datos */
  public hasLoader:boolean=false;

  //**  variable de salida cuando escucha el evento de selection change del DataGrid*/
  @Output()
  onSelectionChanged = new EventEmitter<any>();

  //**  variable de entrada de los datos que se van a mostrar en el grid*/
  @Input()
  public datasource: any[] = [];

  /** Variable de entrada para indicar que columna va a ser como llave primaria */
  @Input()
  public keyExpr: string = '';

  /** Variable de entrada para indicar tipo de seleccion puede ser 
   * single
   * multiple
   */
  @Input()
  public selection_mode: string = ''

  /** Variable de entrada para activar o desactivar el filtro del grid */
  @Input()
  public filterActive: boolean = false

  /** Variable  de entrada de tipo array<HeadersDataGrid> que permite obtener los campos que se van a mostrar y diferentes attributos*/
  @Input()
  public headers: HeadersDataGrid[] = []

  /** Variable  de entrada para mostrar las columnas automaticamente sin necesidad de utilizar los headers 
   * Nota: Solo utilizar cuando no va a utilizar la variable headers
  */
  @Input()
  public columns: string[] = [];

  /**variable para almacenar los keys seleccionados */
  public _selectedRowKeys: any[] = [];
 
  /** get method para obtener los keys seleccionados */
  public get selectedRowKeys(): Array<any> {
    return this._selectedRowKeys;
  };

  /** set method  de tipo input para asignar a la variable _selectedRowKeys y  selectedRowKeysChange */
  @Input()
  set selectedRowKeys(value: Array<any>) {
    this._selectedRowKeys = value;
    this.selectedRowKeysChange.emit(value);
  };

  /**EventEmiter de tipo Salida que se ejecuta cuando se selecciona */
  @Output() selectedRowKeysChange: EventEmitter<Array<any>> = new EventEmitter();

  /**EventEmiter de tipo salida para el evento click */
  @Output() editButton: EventEmitter<number | string> = new EventEmitter();

  /**
   * Method que se ejectura al momento de finalizar la carga de datos del DataGrid
   */
  onLoad(){
    // console.log("entro en onload");
    // setTimeout(() => {
     this.hasLoader=true;
    // }, 1000);
   }
}
