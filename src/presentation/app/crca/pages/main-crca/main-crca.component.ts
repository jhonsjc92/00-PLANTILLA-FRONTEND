import { Component, OnInit } from '@angular/core';
import { CrcaService } from '../../services/crca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Crca } from '../../interfaces/crca.interface';
import { HeadersDataGrid } from 'src/presentation/app/shared/interfaces/headers-datagrid.interface';

@Component({
  selector: 'app-main-crca',
  templateUrl: './main-crca.component.html',
  styleUrls: ['./main-crca.component.css']
})
export class MainCrcaComponent implements OnInit {
  // private activateRouter: ActivatedRoute;
  public headers!:HeadersDataGrid[];
  public allCrca: Crca[] = [];
  public contabilidad: any = {codigoContabiliad:1};
  constructor(private crcaService: CrcaService,private router: Router) { }
  ngOnInit(): void {
    this.crcaService.getAllCrca(this.contabilidad).subscribe(
      crca => {
        if(crca){
          this.allCrca = crca;
          this.headers=[
            {name:'codigoCrca',aligment:'center',visible:true,width:'10%',caption:'Cod'},
            {name:'dniAportante',aligment:'center',visible:true,width:'10%',caption:'Cédula'},
            {name:'nombreAportante',aligment:'center',visible:true,width:'30%',caption:'Aportante'},
            {name:'detalleAporteEspecie',aligment:'center',visible:true,width:'30%',caption:'Detalle'},
            {name:'valorNumero',aligment:'center',visible:true,width:'15%',caption:'Valor',format:'$,###,###,##0.00'},
          ]
        }
      }
    );
  }
  numerario(){
    this.router.navigateByUrl('create');
  }
  especie(){
    this.router.navigateByUrl('create');
  }
  onloades(){
    console.log("entro al seleccionar");
  }
  editarCrca(id:string | number){
    
    this.router.navigateByUrl(`edit/${id}`);
  }
}
