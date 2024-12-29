import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfile: any = {}; 
  profileForm: FormGroup;
  defaultProfileImage = 'assets/default-profile.png'; 

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      nickname: ['', Validators.required],
      profilePicture: [''],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Simulación: cargar datos del usuario con servicio que cree)
    

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
}
