import { Component, OnInit, Pipe } from '@angular/core';
import { ApiService } from 'app/Services/api.service';
import { PjpNewInterface } from 'app/Interfaces/pjp-new-interface';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { GlobalResources } from 'app/Shared/GlobalFunctions';
import { DsrList } from 'app/Interfaces/DsrList';
import { LoadercontentComponent } from 'app/loadercontent/loadercontent.component';


@Pipe({
  name: 'filter'
})

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  providers: [ApiService],
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  toggleSelect: boolean = true;
  // ShowDetailMap: boolean =  true;
  ShowDetailMap: boolean =  false;
  count: number = 0;
  buttonDisabled: boolean = false;
  Firstdate: Date = new Date();
  getData(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  minDate = new Date(2017, 0, 1);
  maxDate = new Date(2019, 0, 1);
  roomsFilter: any;
  GlobalResources: any;
  zoomValue: number = 8;
  _FilteredPostsArray: PjpNewInterface[];
  public _FilteredPostsArray$: Observable<PjpNewInterface[]>
  _loading: boolean;
  _IsDataLoaded: boolean = false;
  _Loader: boolean = true;
  _ShowMode : String = 'A';
  totalFilteredShops : number = 0;
  totalFilteredInvoicedShops : number = 0;
  totalFilteredNotInvoicedShops : number = 0;
  public Shoplisting: any = [];
  SelectedShopID: number;
  public DistributorList: any = [];
  SelecteDistID: number;
  public DsrList: any = [];
  public DsrListFiltered: any = [];
  public Status: any = [];
  public StatusFiltered: any = [];
  SelecteDsrtID: number;
  stateCtrl: FormControl;
  IsSelected:boolean = false;
  dialogRef: any;
 
  constructor(private apiSerivce: ApiService,public dialog: MatDialog){}
 
  ngOnInit() {
  }

  load(){
    if(GlobalResources.ApplyDateFormat(this.Firstdate,'yyyy-MM-dd') === '')
    {
      return;
    }

    this._IsDataLoaded = false;
    this._loading = false;
    this._Loader = true;
    this.ShowLoader();
    this.getPosts();
   }


  getPosts(): void {
    
    var fromDate: String = GlobalResources.ApplyDateFormat(this.Firstdate,'yyyy-MM-dd');
    var toDate: String = GlobalResources.ApplyDateFormat(this.Firstdate,'yyyy-MM-dd');
    
    this.apiSerivce.getPJPData(fromDate,toDate).subscribe
    (
      resultArray => {
        
        this._FilteredPostsArray = resultArray;
        GlobalResources._MainPJPDataArray = resultArray;
        this.ShowTotalValues();
        this._FilteredPostsArray$ = Observable.of(this._FilteredPostsArray);
          
        this.getDistinctDistributors();
        this.getDistinctDsr();
        this._loading = true;
        this._IsDataLoaded = true;
        this._Loader= true;
        this.HideLoader();
      
        },
 
      err => console.log('Error :: Something went Wrong ' + err)
    );
  }

  getDistinctDistributors() {

    const tmpDist = GlobalResources.removeDuplicatesValues(GlobalResources._MainPJPDataArray, 'DistributorTitle');
      this.DistributorList = [];
      tmpDist.forEach((x) => {
        this.DistributorList.push({'DistributorID': x.DistributorID, 'DistributorRefNo': x.DistributorRefNo,
        'DistributorTitle': x.DistributorTitle,
        'DistributorAddress': x.DistributorAddress, 'Latitude': x.Latitude, 'Longitude': x.Longitude, 
        'DistributorInvoicedShops': x.DistributorInvoicedShop, 'DistributorNotInvoicedShops': x.DistributornotInvoicedShop,
        'DistributorTotalShops': x.DistributorTotalShop,'IsSelected':true});
      });
      
    }

    getDistinctShops() {
      const tmpShops = GlobalResources.removeDuplicatesValues(GlobalResources._MainDataArray, 'ShopTitle');

      tmpShops.forEach((x) => {
        this.Shoplisting.push({'ShopID': x.ShopID, 'ShopTitle': x.ShopTitle,
          'Address': x.Address, 'Latitude': x.Latitude, 'Longitude': x.Longitude });
      });

      // console.log(this.Shoplisting);

  }

  getDistinctDsr() {
    const tmpDSR = GlobalResources.removeDuplicatesValues(GlobalResources._MainPJPDataArray, 'DSRTitle');

    this.DsrList = [];
    this.DsrListFiltered = [];

    tmpDSR.forEach((x) => {
      
      this.DsrList.push({'DSRID': x.DSRID, 'DSRTitle': x.DSRTitle, 'DSRCode': x.DSRRefNo, 'DistributorID': x.DistributorID, 'DistributorTitle':x.DistributorTitle, 
      'DSRInvoicedShops': x.DSRInvoicedShop, 'DSRNotInvoicedShops': x.DSRnotInvoicedShop,
      'DSRTotalShops': x.DSRTotalShop, 'IsSelected':true});

      this.DsrListFiltered.push({'DSRID': x.DSRID, 'DSRTitle': x.DSRTitle, 'DSRCode': x.DSRRefNo, 'DistributorID': x.DistributorID, 'DistributorTitle':x.DistributorTitle, 
      'DSRInvoicedShops': x.DSRInvoicedShop, 'DSRNotInvoicedShops': x.DSRnotInvoicedShop,
      'DSRTotalShops': x.DSRTotalShop, 'IsSelected':true});
            
    });
  }

   private convertStringToNumber(value: string): number {
     return +value;
   }

//This is old function for Distributor Replace this function with old one for Select/Unselect Distributor
SelectAllDistributor() {
  this.ShowLoader();
  console.log('Loader loaded');
  this.toggleSelect = !this.toggleSelect;
  //Filter DSR List According to Selected Distributors
   this.DistributorList.forEach((x) => {
    x.IsSelected = this.toggleSelect;
   })

   var intLength: number  = this.DistributorList.length;

   if(intLength >=0)
   {
      //First Remove the selected Check on Last item of Array 
      this.DistributorList[intLength-1].IsSelected = !this.toggleSelect;
      //Reselect the last item of Array for loading the DSRs list for all selected Distributors.
      this.FilterMapByDistributor(intLength-1);
   }

}






//This is new function for DSR Select/UnSelect Paste this function and use 
SelectAllDSR() {

  this.toggleSelect = !this.toggleSelect;
  //Filter DSR List According to Selected Distributors
  this.DsrListFiltered.forEach((x) => {
    x.IsSelected = this.toggleSelect;
   })
   
   let intDsrLen = this.DsrListFiltered.length-1;
   if(this.DsrListFiltered.length>=0)
   {
    this.SelecteDsrtID = this.DsrListFiltered[intDsrLen].DSRID;
   }
   
   this.ApplyFilter();
}

trackByShop(index:number, shop:PjpNewInterface):string{
  
  //console.log(shop.ShopID);
  if(!shop) return null;
  return shop.ShopID.toString();
}

   FilterMapByDistributor(index:any) {
    
     this.SelecteDistID = this.DistributorList[index].DistributorID;
     this.DistributorList[index].IsSelected = !this.DistributorList[index].IsSelected;

     //Filter DSR List According to Selected Distributors
      let tmpDistArr = [];
      this.DistributorList.forEach((x) => {
        if (x.IsSelected === true) {
          tmpDistArr.push(x.DistributorID);
        }
      })
      
      if (tmpDistArr.length > 0) {
        this.DsrListFiltered = this.DsrList.filter((d:DsrList) => tmpDistArr.includes(d.DistributorID));
      } else {
        this.DsrListFiltered = []
      }     

      this.ApplyFilter();  
   }
  

setFilterMode(strFilterString:any){
  this._ShowMode = strFilterString;
  this.ApplyFilter();
}


   FilterMap_Dsr(index:any) {

    this.SelecteDsrtID = this.DsrListFiltered[index].DSRID;
    this.DsrListFiltered[index].IsSelected = !this.DsrListFiltered[index].IsSelected;
    
    this.ApplyFilter();
    
  }

 
 MapMode(LoadDetailMap:boolean){
  this.ShowDetailMap = LoadDetailMap;
}

search(query: string){
        this.DistributorList = (query) ? this.DistributorList.filter(DistributorList => 
        DistributorList.DistributorTitle.toLowerCase().includes(query.toLowerCase()) ):
        this.DistributorList; 


        // this.DistributorList = (query) ? this.DistributorList.filter(DistributorList => 
        //   DistributorList.DistributorTitle.toLowerCase().includes(query.toLowerCase()) || DistributorList.DistributorAddress.toLowerCase().includes(query.toLowerCase() ):
        //   this.DistributorList; 
}



ApplyFilter()
  {
     //Filter Main Data According to Selected DSRS
     let tmpDsrArr = [];
     this.DsrListFiltered.forEach((x) => {
       if (x.IsSelected === true) {
          tmpDsrArr.push(x.DSRID);
       }
     })

     this.totalFilteredShops = 0 
     this.totalFilteredInvoicedShops =  0;
     this.totalFilteredNotInvoicedShops =  0;

     if (tmpDsrArr.length > 0) {
      
        //First Filter the data for All DSR Selected
        this._FilteredPostsArray =
        GlobalResources._MainPJPDataArray.filter((r: PjpNewInterface) => tmpDsrArr.includes(r.DSRID));
        
        this.ShowTotalValues();

        //Second Filter for Status Like InvoicedShops, NotInvoicedShops OR AllShops.
        if(this._ShowMode != 'A')
        {
          this._FilteredPostsArray =
          this._FilteredPostsArray.filter((r: PjpNewInterface) => r.Status == this._ShowMode);

        }

     } else {
      this._FilteredPostsArray = []
     }     

     this._FilteredPostsArray$ = Observable.of(this._FilteredPostsArray);
     this._FilteredPostsArray = [];
     //console.log(this._FilteredPostsArray$);
     this.HideLoader();
     console.log('Loader Unloaded');
  }

    // openDialog(): void {
    //   if(this._Loader===true){

    //     console.log("_loader");
    //     this.dialogRef = this.dialog.open(LoadercontentComponent, {
    //       width: '120px',
    //       height:'120px',
    //     });

    //     //dialogRef.close();

    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log('The dialog was closed');
    //     });
    //   }
    //   else{
    //     alert("Lead");
    //   }
    // }

    
    ShowLoader(): void {
        
        this.dialogRef = this.dialog.open(LoadercontentComponent, {
          width: '120px',
          height:'120px',
          disableClose: true,
        });
    }

    HideLoader(): void {
      this.dialogRef.close();
    }

  ShowTotalValues()
  {
    this.totalFilteredShops =  this._FilteredPostsArray.length;
    this.totalFilteredInvoicedShops = this._FilteredPostsArray.filter((r: PjpNewInterface) => r.Status == 'I').length
    this.totalFilteredNotInvoicedShops = this.totalFilteredShops - this.totalFilteredInvoicedShops;
  }
}