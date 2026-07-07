import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../models/users';
import { config } from 'rxjs';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  isInEditMode: boolean = false
  userForm !: FormGroup
  edituser !: Iuser
  userId !: string

  constructor(private userservice: UsersService,
    private snackbar: SnackbarService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUserForm()
    this.addSkillsControl()
    this.isPermenantAddHandler()
    this.isAddSameHandler()
    this.patchvalueinform()

  }

  isPermenantAddHandler() {
    this.formcontrols['address'].get('current')?.valueChanges
      .subscribe(val => {
        if (this.formcontrols['address'].get('current')?.valid) {
          this.formcontrols['isAddSame'].enable()
        } else {
          this.formcontrols['isAddSame'].reset()
          this.formcontrols['isAddSame'].disable()
        }
      })
  }

  isAddSameHandler() {
    this.formcontrols['isAddSame'].valueChanges
      .subscribe(val => {
        if (val) {
          let CurrentAdd = this.formcontrols['address'].get('current')?.value;
          this.formcontrols['address'].get('permanent')?.patchValue(CurrentAdd)
          this.formcontrols['address'].get('permanent')?.disable()
        } else if (this.isInEditMode && !val) {
          this.formcontrols['address'].get('permanent')?.patchValue(this.edituser.address.permanent)
          this.formcontrols['address'].get('permanent')?.enable()
        }
        else {
          this.formcontrols['address'].get('permanent')?.reset()
          this.formcontrols['address'].get('permanent')?.enable()
        }
      })
  }

  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(null, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }),
      skills: new FormArray([]),

      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl('India'),
          zipcode: new FormControl(null, [Validators.required])
        })
      })
    })
  }

  addSkillsControl() {
    let SkillControl = new FormControl(null, [Validators.required])
    this.skillsArr.push(SkillControl)
  }

  get formcontrols() {
    return this.userForm.controls
  }

  get skillsArr() {
    return this.formcontrols['skills'] as FormArray
  }

  onUserAdd() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let USerDetails = { ...this.userForm.getRawValue(), userId: Date.now().toString() }
      this.userservice.onadduser(USerDetails)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this.snackbar.opensnackbar(err.msg)
          }
        })
    }
  }

  patchvalueinform() {
    this.userId = this.routes.snapshot.paramMap.get('userId')!
    if (this.userId) {
      this.userservice.fetchUserById(this.userId).subscribe({
        next: res => {
          this.edituser = res
          this.isInEditMode = true
          this.userForm.patchValue(this.edituser)
          if (res.userRole === 'Candidate') {
            this.userForm.disable()
          }
          this.skillsArr.clear()
          this.edituser.skills.forEach(ele => {
            let control = new FormControl(ele)
            this.skillsArr.push(control)
          })
        }
      })
    }
  }

  onupdate() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched()
    } else {
      let Userdetails = { ...this.userForm.getRawValue(), userId: this.userId }
      this.userservice.onupdateuser(Userdetails)
        .subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.userForm.reset()
            this.isInEditMode = false

            this.router.navigate(['/users', res.data.userId])
          },
          error: err => {
            this.snackbar.opensnackbar(err.msg)
          }
        })
    }
  }

  canDeactivate() : boolean {
    if(this.userForm.dirty && this.isInEditMode){
      return confirm(`Are You Sure You Want Discard The Changes !!`)
    }
    return true
  }

 

}
