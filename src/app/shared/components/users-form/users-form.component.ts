import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from '../../models/users';

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
            this.router.navigate(['/users'])
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
          this.userForm.patchValue(this.edituser)

        }
      })
    }
  }

}
