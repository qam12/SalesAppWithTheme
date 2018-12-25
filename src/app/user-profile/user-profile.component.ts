import { Component, OnInit } from '@angular/core';
import { UserinformationService } from './shared/userinformation.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'app/appsettings';
import { Userinformation } from './shared/userinformation.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  ListUserInformation: any;
  constructor(private http: HttpClient, private userInformationService: UserinformationService) {}

  ngOnInit() {
      this.userInformationService.Get();
      this.resetForm();
      // this.getUsers();
  }
/*
  getUsers() {
    this.http.get(AppSettings.API_BASE_URL + AppSettings.USER_INFORMATION_URL)
      .subscribe(response => {
        this.ListUserInformation = response;
        console.log(response);
      }, error => {
        console.log(error);
      });
  }
*/
  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.userInformationService.SelectedUserInformation = {
      Id: 0,
      Name: null,
      LoginUserName: null,
      Email: null,
      Phone: null,
      Password: null,
      UserRoleId: null,
      IsActive: true,
      IsDeleted: false,
      CompanyId: null,
      EntryTime: null,
      OfficeId: null,
      CompanyName: null,
      OfficeName: null,
      UserRoleName: null
    }
  }

  toggleEditProfile(form?: NgForm) {
    this.resetForm(form);
  }

  onSubmit(form: NgForm) {

    if (form.value.Id <= 0) {
      this.userInformationService.Post(form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.userInformationService.Get();
        // this.toastr.success('New Record Added Successfully', 'Victim');
      })
    } else if (form.value.Id > 0) {
      this.userInformationService.Put(form.value.Id, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.userInformationService.Get();
        // this.toastr.info('Record Updated Successfully', 'Victim');
      })
    }
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userInformationService.Delete(id)
      .subscribe(data => {
        this.userInformationService.Get();
      });
    }
  }

  onEdit(user: any) {
    console.log(user);
    this.userInformationService.SelectedUserInformation = {
      Id: user.id,
      Name: user.name,
      LoginUserName: user.loginUserName,
      Email: user.email,
      Phone: user.phone,
      Password: null,
      UserRoleId: user.userRoleId,
      IsActive: user.isActive,
      IsDeleted: user.isDeleted,
      CompanyId: user.companyId,
      EntryTime: user.entryTime,
      OfficeId: user.officeId,
      CompanyName: null,
      OfficeName: null,
      UserRoleName: null
    };
    document.getElementById('mat-tab-label-0-1').click();
  }

  back() {
    document.getElementById('mat-tab-label-0-0').click();
  }

  AddNewUser() {
    this.resetForm();
    document.getElementById('mat-tab-label-0-1').click();
  }

}
