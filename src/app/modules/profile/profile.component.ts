import { Component, EventEmitter, OnInit, Output, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { RegisterComponent } from '../register/register.component';
import { Register } from 'src/app/models/register.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {} ; 
  profileForm: FormGroup;
  defaultProfileImage = 'assets/default-profile.png'; 




  constructor(private fb: FormBuilder, private authservice: AuthService) {
    this.profileForm = this.fb.group({
      nickname: ['', Validators.required],
      profilePicture: [''],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userProfile = JSON.parse(storedUser);
      this.profileForm.patchValue(this.userProfile);
    } else {
      this.profile();
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const updatedProfile = {
        ...this.userProfile,
        nickname: this.profileForm.value.nickname,
        profilePicture: this.profileForm.value.profilePicture || this.defaultProfileImage,
        location: this.profileForm.value.location
      };
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      this.userProfile = updatedProfile;
    }
  }
  

  profile(): void { 
    const id = Number(sessionStorage.getItem("idUser") ?? 1);
    this.authservice.profile(id).subscribe(
      (response) => {
        this.userProfile = response;
        this.profileForm.patchValue(this.userProfile); 
        localStorage.setItem('user', JSON.stringify(this.userProfile));
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
  

}


