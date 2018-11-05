import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-loadercontent',
  templateUrl: './loadercontent.component.html',
  styleUrls: ['./loadercontent.component.scss']
})
export class LoadercontentComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<LoadercontentComponent>) { }

  ngOnInit() {
    console.log("model");
  }
  
  Close(){
    // this.thisDialogRef.close();    
    console.log(1);
  }

  Confirm(){
   this.thisDialogRef.close();
   console.log("confirmed"); 
  }

}
