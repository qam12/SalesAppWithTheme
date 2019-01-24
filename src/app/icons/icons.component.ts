import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from 'app/Services/api.service';
import { FormControl } from '@angular/forms';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { GlobalResources } from 'app/Shared/GlobalFunctions';
import { TrackUserList } from 'app/Interfaces/TrackUserList';
import { UserLocation } from 'app/Interfaces/UserLocation';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ApiService],
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  ngOnInit(){
    this.getTrackuserList();
  }

  Firstdate: Date = new Date();
  fc_TrackUserType = new FormControl();
  public selected: string;
  strSelectedUserType: String;
  public UserTypeList: TrackUserList[];
  public UserLocationType: UserLocation[];
  SelectedPhoneId: number;
  lat: number = 51.678418;
  lng: number = 7.809007;
  public origin: any
  public destination: any
  public objDir : any = [];
  public infoWindow: InfoWindow;


  public renderOptions = {
    suppressMarkers: true,
    preserveViewport: false
    }


  constructor(private apiSerivce: ApiService) {}

  getData(){
    this.createArrayUser();
    this.GetuserLocation(); 
}

getDirection() {
  this.origin = { lat: 24.799448, lng: 120.979021 }
  this.destination = { lat: 24.799524, lng: 120.975017 }

  // this.origin = 'Taipei Main Station'
  // this.destination = 'Taiwan Presidential Office'
}
  GetuserLocation(): void{
    // var EDate: String = '2018-11-06';
    // var EPhonNumber: String = '923331203067';
    var fromDate: String = GlobalResources.ApplyDateFormat(this.Firstdate,'yyyy-MM-dd');

    if(this.selected.length <= 0){
      
      return;
    }

	  this.apiSerivce.Userlocation(fromDate,this.strSelectedUserType).subscribe
    (
    
      resultArray => {
        this.UserLocationType = resultArray;
          this.CreateDirectionArray();
          
  
       },
      err => console.log('Error :: Something went Wrong ' + err)
    );
  }

  
  getTrackuserList() {
    this.apiSerivce.getTrackingUserList().subscribe
    ( resultArray => {
        this.UserTypeList = resultArray;
      },
      err => console.log('Error :: Something went Wrong ' + err)
    );
  } 

  createArrayUser() {

    this.strSelectedUserType = this.selected;
  }

  
  CreateDirectionArray(){

		var x:number; 
    var len: number = this.UserLocationType[0].Locations.length-1;

    class MarkerIconSize {
      static create() {
        return { height: 40, width: 80 };
      }
    }

    
    var iconsize = MarkerIconSize.create();

			if(len>=0){
          for(x=0; x<len; x++)
          {	
      
            let dir = {
              origin: { lat: parseFloat(this.UserLocationType[0].Locations[x].Latitude), lng: parseFloat(this.UserLocationType[0].Locations[x].Longitude) },
              destination: { lat: parseFloat(this.UserLocationType[0].Locations[x+1].Latitude), lng: parseFloat(this.UserLocationType[0].Locations[x+1].Longitude) },
              visible: true,
              travelMode:"DRIVING",

              markerOpt:{
                origin: {
                    icon: {
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(this.getWarehouseMarkerIcon(this.UserLocationType[0].Locations[x].TimeAtLocation,x)),
                      scaledSize: iconsize,
                    },
                    strokeColor: "#AA287E",
                    
                    infoWindow:
                    '<table>'
                      +'<tr>'
                      +'<td>' + 'Name' + '</td>' 
                      +'<td>'+ '<b>' + (this.UserLocationType[0].UserName.toString()) + '</b>' +'</td>' 
                      +'</tr>'
                      +'<tr>'
                      +'<td>' + 'Time' + '</td>' 
                      +'<td>'+ '<b>' + (this.UserLocationType[0].Locations[x].Time.toString()) + '</b>' +'</td>' 
                      +'</tr>'
                      +'<tr>'
                      +'<td>' + 'Date' + '</td>' 
                      +'<td>'+ '<b>' + (this.UserLocationType[0].Locations[x].Date.toString()) + '</b>' +'</td>' 
                      +'</tr>'
                      +'</table>'
                }
                // ,
                // destination: {
                //     //icon:'http://maps.google.com/mapfiles/kml/pushpin/pink-pushpin.png',
                //     icon: {
                //       url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(this.getWarehouseMarkerIcon(this.UserLocationType[0].Locations[x+1].TimeAtLocation,x+1)),
                //       scaledSize: iconsize,//new google.maps.Size(80, 40),
                //     },
                //     strokeColor: "#ff9c00",
                //     infoWindow:
                //     '<table>'
                //       +'<tr>'
                //       +'<td>' + 'Name' + '</td>' 
                //       +'<td>'+ '<b>' + (this.UserLocationType[0].UserName.toString()) + '</b>' +'</td>' 
                //       +'</tr>'
                //       +'<tr>'
                //       +'<td>' + 'Time' + '</td>' 
                //       +'<td>'+ '<b>' + (this.UserLocationType[0].Locations[x+1].TimeAtLocation.toString()) + 'am' + '</b>' +'</td>' 
                //       +'</tr>'
                //       +'<tr>'
                //       +'<td>' + 'Date' + '</td>' 
                //       +'<td>'+ '<b>' + (this.UserLocationType[0].Locations[x+1].Date.toString()) + '</b>' +'</td>' 
                //       +'</tr>'
                //       +'</table>'
                // }				
              },
          }  
          this.objDir.push(dir);

        }

    }

	}
  
  getCircle(){
    const ic = [
      '<svg width="100" height="100">',
      '<circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />',
      '</svg>'
    ]

    return ic;
  }

  getWarehouseMarkerIcon(searchCard,intPosition) {
    const markericon = [
      '<?xml version="1.0" encoding="utf-8"?>',
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 80 42" style="enable-background:new 0 0 80 42;" xml:space="preserve" class="svgIcon">',
      '<style type="text/css">',
      '@import url("https://use.typekit.net/gwn1jtf.css");',
      '.st0 { fill: #AD0005;}',
      '.st1 { fill: #FF0B20; }',
      '.price{font-family:"pragmatica",sans-serif;}',
      '</style>',
      '<g>',
      '<path class="st0" d="M32.72,32.57l-1.02,1.03L40,42l7.88-7.96h28.61c1.94-0.01,3.51-1.59,3.51-3.55V3.55',
      'C79.99,1.59,78.43,0.01,76.49,0H3.51C1.57,0.01,0.01,1.59,0,3.55v26.94c0.01,1.96,1.57,3.54,3.51,3.55h29.21V32.57l-1.02,1.03',
      'L32.72,32.57v-1.46H3.51c-0.17,0-0.32-0.07-0.44-0.19c-0.12-0.12-0.18-0.27-0.18-0.44V3.55c0-0.17,0.07-0.32,0.18-0.44',
      'c0.12-0.12,0.27-0.18,0.44-0.18h72.98c0.17,0,0.32,0.07,0.44,0.18c0.12,0.12,0.18,0.27,0.18,0.44v26.94c0,0.17-0.07,0.32-0.18,0.44',
      'c-0.12,0.12-0.27,0.18-0.44,0.19h-29.8L40,37.87l-6.69-6.75h-0.6V32.57z" />',
      '<path class="st1" d="M32.72,32.57L40,39.93l7.28-7.36h29.21c1.14,0,2.07-0.94,2.07-2.09V3.55c0-1.15-0.93-2.09-2.07-2.09H3.51',
      'c-1.14,0-2.06,0.94-2.06,2.09v26.94c0,1.15,0.93,2.09,2.06,2.09H32.72z" />',
      
      `<text x="34" y="13" fill="yellow" font-size="12px" font-weight="600" class="price">${intPosition}</text>`,
      `<text x="12" y="27" fill="#fff" font-size="14px" font-weight="600" class="price">${searchCard}</text>`,
      '</g>',
      '</svg>'
    ].join('\n');
    return markericon
  }



	hideDirection(){
		this.objDir.forEach((x) => {
		x.visible = false;
		})
			console.log(this.objDir);
	}

	showDirection(){

		this.objDir.forEach((x) => {
				x.visible = true;
		})
	}
 
}