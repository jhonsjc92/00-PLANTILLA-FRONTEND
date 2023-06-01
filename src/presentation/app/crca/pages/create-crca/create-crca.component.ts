import { Component, OnInit } from '@angular/core';
import { Crca } from '../../interfaces/crca.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrcaService } from '../../services/crca.service';
import { ClaseArchivo, ClaseCrca, CrcaNumerario } from '../../interfaces/crca-numerario.interface';
import { FileContent } from 'src/presentation/app/shared/interfaces/file.interface';
import * as customValidators from '../../../shared/validators/validators';
import { alerts } from 'src/presentation/app/shared/messages/alerts';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { EstadoPipe } from 'src/presentation/app/shared/pipes/estado.pipe';
@Component({
  selector: 'app-create-crca',
  templateUrl: './create-crca.component.html',
  styleUrls: ['./create-crca.component.css']
})
export class CreateCrcaComponent implements OnInit {
  /**
   * obtener los mensajes de la alertas configuradas en messages/alerts.ts
   */
  public menssage = alerts;

  /** Variable para cambiar de nombre al boton guardar o Actualizar */
  public nameSaveUpdate: string = 'Guardar';

  /**
    * objeto de tipo ClaseArchivo
    */
  public claseArchivo?: ClaseArchivo;

  /** objeto de tipo ClaseArchivo array */
  public arrayClaseArchivo: ClaseArchivo[] = [];

  /** variable para almacenar tipo de aportante  */
  public tipoAportante: any[] = [];

  /** variable para almacenar aporte en  */
  public aporteEn: any[] = [];

  /** variable array para almacenar objeto de tipo FileContent  */
  public archivos!: FileContent[];

  constructor(private fb: FormBuilder, private crcaService: CrcaService, private router: Router, private activatedRoute: ActivatedRoute) { }

  /**
   * creacion de variables y validación del formulario
   */
  formCrca: FormGroup = this.fb.group({
    codigoCrca: [''],
    dniAportante: ['', [Validators.required, Validators.minLength(10), Validators.pattern(customValidators.twoDecimal)]],
    nombreAportante: ['', [Validators.required]],
    codigoCatalogoTipoCrca: [26, [Validators.required]],
    codigoCatalogoTipoAporteCrca: ['', [Validators.required]],
    codigoDatoPersonal: [21, [Validators.required]],
    codigoContabilidad: [1],
    fechaRecepcion: ['', [Validators.required]],
    valorLetras: ['', [Validators.required]],
    valorNumero: ['', [Validators.required, Validators.pattern(customValidators.twoDecimal)]],
    detalleAporte: ['', [Validators.required]],
    detalleAporteEspecie: ['detalle', [Validators.required]],
    estado: [1, [Validators.required]]
  });
  /**
   *  Se ejecuta al cargar este componente
   * @returns 
   */
  ngOnInit(): void {
    //servicio para obtener aporte en
    let codPadre: any = { codigoPadre: 64 };
    this.crcaService.GetCatalogoByCodPad(codPadre).subscribe(
      result => {
        if (result) {
          this.aporteEn = result;
        }
      }
    );
    // servicio para obtener tipo de aportante
    codPadre = { codigoPadre: 21 };
    this.crcaService.GetCatalogoByCodPad(codPadre).subscribe(
      result => {
        if (result) {
          this.tipoAportante = result;
        }
      }
    );
    //** entra cuando es crear y retorna vacio */ 
    if (!this.router.url.includes('edit')) return;
    /**Cambia el nombre del boton si entra al formulario edit */
    this.nameSaveUpdate = 'Actualizar';
    //** entra cuando es edit y obtiene el parametro para consultar al servicio de crca */   
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.crcaService.getCrcaById(id)),
      ).subscribe(crca => {
        if (!crca) {
          /** Retorna a la ruta raiz  */
          return this.router.navigateByUrl('/');
        }
        /** Objeto cuerpo para enviar al servicio */
        const bodyArchivo = { codigoTabla: crca.codigoCrca, nombreTabla: 'CRCA' };
        
        this.crcaService.GetArchivoByCodTab(bodyArchivo).subscribe(result => {
          if (!result) {
            return;
            // return this.router.navigateByUrl('/');
          }
          const archivoTemp:FileContent[]=[];
          for (let index = 0; index < result.length; index++) {
            archivoTemp.push({ base64String: result[index]["documento"], name: result[index]["nombre"], size: 0, type: 'pdf' });
          }
          this.archivos=archivoTemp;
          // const decodedBytes = Buffer.from(result[0]["documento"], 'base64');
          return;
        })
        this.formCrca.reset(crca);
        return;
      });
  }


  /** Obtener el valor del formulario convertir a tipo ClaseCrca */
  get currentCrca(): ClaseCrca {
    const crca = this.formCrca.value as ClaseCrca;
    return crca;
  }

  /**
   *  guardar o actualizar crca
   * @param event 
   * @returns 
   */
  guardar(event: any) {
    /** para que no recargue la pagina*/
    event.preventDefault;
    

    /** Verificar si el formulario esta valido */
    if (this.formCrca.invalid) {
      this.formCrca.markAllAsTouched();
      alert("Campos vacios");
      return;
    };

    if(!this.archivos) {
      alert("no tiene archivos de respaldo");
      return;
    }
    /** Convertir el array de archivos a un tipo Clase Archivo antes de enviar al servicio */
    this.archivos?.forEach(element => {
      this.arrayClaseArchivo.push({ documento: element.base64String, tipoExtension: null, nombre: element.name, descripcion: "gasgas", tipoArchivo: 46, estado: 1, fechaFirma: "2023-05-23T18:45:59.402Z", estadoFirma: null, localizacionFirma: null, ruta: null });
    });
    /** Variables con todos lo campos que necesita el servicio */
    const crcaNumerario: CrcaNumerario = { auditoria: "2edf8b3e2f5a424fa8333ba742154869|1202|151|192.168.1.1|Chrome|I|Guardar información del Crca en Especie|01" };
    /** Consolidar la informacion claseCrca y claseArchivo */
    crcaNumerario.claseCrca = <ClaseCrca>this.formCrca.value;
    crcaNumerario.claseArchivo = this.arrayClaseArchivo;
    /** Entra al if si existe el codigoCrca o esta vacio --- Nuevo o editar */
    if (this.currentCrca.codigoCrca) {
      alert("entro en actualizar")
      // this.crcaService.updateCrcaNumerario( this.currentCrca )
      //   .subscribe( result => {
      //     console.log(result)

      //     // this.showSnackbar(`${ hero.superhero } updated!`);
      //   });
      return;
    }
    /** Se ejecuta el servicio solo si no cumple con el if anterior
     * esto siempre y cuando viene por Nuevo
     */
    this.crcaService.saveCrca(crcaNumerario).subscribe(
      result => {
        if (result.status) {
          alert("se guardo correctamente");
        } else {
          alert(result.message);
        }
      }
    );
    return;
  }

  /**
   * valida si el campo es valido
   * @param field nombre del campo colocado el fieldControlName
   * @returns true o false
   */
  isValidField(field: string): boolean | null {
    // obterner validacion de servicio
    return this.formCrca.controls[field].errors && this.formCrca.controls[field].touched;
  }
  /**
   * Salirse del formulario y navegar a la pantalla principal
   * @param event evento que se ejecuta al dar clic en el boton
   */
  salirFormulario(event: any) {
    event.preventDefault;
    /** navegar al formulario que esta configurado en app-routing.module.ts */
    this.router.navigateByUrl('');
  }
  /** Method para buscar persona por Cedula */
  buscarPersona() {
    //servicio para obtener información de la persona
    let codPadre: any = { cedulaIdentidad: this.formCrca.value['dniAportante'] };
    this.crcaService.GetPersonaByCi(codPadre).subscribe(
      result => {
        /** se ejecuta cuando no encuentra una persona con  */
        if (result == null) {
          this.formCrca.reset({ ...this.formCrca.value, nombreAportante: null, codigoDatoPersonal: 21 })
          alert("no se encontro el aportante");
          return;
        }
        if (result) {
          this.formCrca.reset({ ...this.formCrca.value, nombreAportante: result['apellidosNombres'], codigoDatoPersonal: 21 })
        }
      }
    );
  }
  cambioss(eve: any) {
    this.archivos = eve;
    console.log("cambios", eve);
  }
}

