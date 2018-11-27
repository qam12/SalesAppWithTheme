import { Component, OnInit, Pipe, ChangeDetectorRef, NgModule } from '@angular/core';

import { Http } from '@angular/http';
import { MyNewInterface } from '../Interfaces/my-new-interface';
import { Observable } from 'rxjs/Observable';
import { FormGroup } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { MatDialog } from '@angular/material';
import { GlobalResources } from '../Shared/GlobalFunctions';
import 'rxjs/add/observable/of';
import { DsrList } from '../Interfaces/DsrList';
import { LoadercontentComponent } from '../loadercontent/loadercontent.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]

})
export class DashboardComponent implements OnInit {

  displayFormat(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }

  Lastdate: Date = new Date();
  Firstdate: Date = new Date();
  getData(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  roomsFilter: any;
  @Pipe({
    name: 'truncate'
  })
  GlobalResources: any;
  zoomValue: number = 8;
  _FilteredPostsArray: MyNewInterface[];
  public _FilteredPostsArray$: Observable<MyNewInterface[]>
  _distributorList: any[];
  _loading: boolean = false;
  _IsDataLoaded: boolean = false;
  _Loader: boolean = true;
  public Shoplisting: any = [];
  SelectedShopID: number;
  public DistributorList: any = [];
  SelecteDistID: number;
  public DsrList: any = [];
  public DsrListFiltered: any = [];
  SelecteDsrtID: number;
  theForm: FormGroup;
  dialogRef: any;

  data = [
    { label: 'one', checked: false },

    ];

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2019, 0, 1);

  constructor(private apiSerivce: ApiService,public dialog: MatDialog,private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
  } 

  load(){ 
    this._IsDataLoaded = false;
    this._loading = false;
    this._Loader = true;
    this.ShowLoader();
    this.getPosts();
  }

  // getRandomColor2() {
  //   var length = 6;
  //   var chars = '0123456789ABCDEF';
  //   var hex = '#';
  //   while (length--) hex += chars[(Math.random() * 16) | 0];
  //   return hex;
  // }

  // getRandomColor() {
  //   var color = Math.floor(0x1000000 * Math.random()).toString(16);
  //    return '#' + ('000000' + color).slice(-6);
  // }

  getPosts(): void {
    // var fromDate: String = GlobalResources.ApplyDateFormat(this.Firstdate,'yyyy-MM-dd');
    // var toDate: String = GlobalResources.ApplyDateFormat(this.Lastdate,'yyyy-MM-dd');
    var fromDate: String = '2018-01-01';
    var toDate: String = '2018-01-30';
      this.apiSerivce.getPosts(fromDate,toDate).
      subscribe(
        resultArray => {
          
          GlobalResources._MainDataArray = resultArray;
          this._FilteredPostsArray = resultArray;
          this._FilteredPostsArray$ = Observable.of(this._FilteredPostsArray);
  
          console.log(this._FilteredPostsArray$);
  
          this.getDistinctDistributors();
          this.getDistinctDsr();
  
          this._loading = true;
          this._IsDataLoaded = true;
          this._Loader= true;
          this.HideLoader();
  
         },
        err => {
          console.log('Error :: Some thing went wrong with the API Call' + err)
          this._IsDataLoaded = false;
          this._Loader = false;
          this._loading = false;
        }
      );
    }
  
    getDistinctDistributors() {
      const tmpDist = GlobalResources.removeDuplicatesValues(GlobalResources._MainDataArray, 'DistributorID');
      this.DistributorList = [];  
      tmpDist.forEach((x) => {
          this.DistributorList.push({'DistributorID': x.DistributorID, 'DistributorRefNo': x.DistributorRefNo,
          'DistributorTitle': x.DistributorTitle,
          'DistributorAddress': x.DistributorAddress, 'Latitude': x.Latitude, 'Longitude': x.Longitude, 
          'DistributorInvoicedShops': 0, 'DistributorNotInvoicedShops': 0, 
          'DistributorTotalShops':GlobalResources._MainDataArray.filter((d) => d.DistributorID === x.DistributorID).length, 'IsSelected':true});
        });
      }  
      getDistinctShops() {
        const tmpShops = GlobalResources.removeDuplicatesValues(GlobalResources._MainDataArray, 'ShopTitle');
        tmpShops.forEach((x) => {
          this.Shoplisting.push({'ShopID': x.ShopID, 'ShopTitle': x.ShopTitle,
            'Address': x.Address, 'Latitude': x.Latitude, 'Longitude': x.Longitude });
        });
    
    }
  
    getDistinctDsr() {
      const tmpDSR = GlobalResources.removeDuplicatesValues(GlobalResources._MainDataArray, 'DSRID');
      this.DsrList = [];
      this.DsrListFiltered = [];
      tmpDSR.forEach((x) => {
        this.DsrList.push({'DSRID': x.DSRID, 'DSRTitle': x.DSRTitle, 'DSRCode':x.DSRRefNo, 
        'DistributorID': x.DistributorID, 'DistributorTitle':x.DistributorTitle, 
        'DSRInvoicedShops':0, 'DSRNotInvoicedShops': 0, 'DSRTotalShops':GlobalResources._MainDataArray.filter((d) => d.DSRID === x.DSRID).length, 
        'IsSelected':true});
        this.DsrListFiltered.push({'DSRID': x.DSRID, 'DSRTitle': x.DSRTitle, 'DSRCode':x.DSRRefNo, 
        'DistributorID': x.DistributorID, 'DistributorTitle':x.DistributorTitle, 
        'DSRInvoicedShops':0, 'DSRNotInvoicedShops': 0, 'DSRTotalShops':GlobalResources._MainDataArray.filter((d) => d.DSRID === x.DSRID).length, 
        'IsSelected':true});
        
      });
    }
  
     private convertStringToNumber(value: string): number {
       return +value;
     }
  

  
  
    //Replace This function with the old one
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
  
    
    //Replace This function with the old one
    FilterMap_Dsr(index:any) {
  
      this.SelecteDsrtID = this.DsrListFiltered[index].DSRID;
      this.DsrListFiltered[index].IsSelected = !this.DsrListFiltered[index].IsSelected;
      
      this.ApplyFilter();    
    }
  
    //Add this function
    ApplyFilter()
    {
       //Filter Main Data According to Selected DSRS
       let tmpDsrArr = [];
       this.DsrListFiltered.forEach((x) => {
         if (x.IsSelected === true) {
            tmpDsrArr.push(x.DSRID);
         }
       })
  
       if (tmpDsrArr.length > 0) {
        
          //First Filter the data for All DSR Selected        
          this._FilteredPostsArray =
          GlobalResources._MainDataArray.filter((r: MyNewInterface) => tmpDsrArr.includes(r.DSRID));
   
       } else {
        this._FilteredPostsArray = []
       }     
  
       this._FilteredPostsArray$ = Observable.of(this._FilteredPostsArray);
       this._FilteredPostsArray = [];
  
    }

  
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
  
    trackByDSR(index:number, dsr:MyNewInterface):string{
    
      //console.log(shop.ShopID);
      if(!dsr) return null;
      return dsr.ShopID.toString();
    }


}

