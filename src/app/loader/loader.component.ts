import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(){
    this.openDialog();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(LoaderComponent, {
      width: '120px',
      height:'120px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
