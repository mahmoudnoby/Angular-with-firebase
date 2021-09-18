import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  addNewStudentForm: FormGroup
  constructor(private fb: FormBuilder, private firestore: AngularFirestore) {
    this.addNewStudentForm = this.fb.group({
      name: ['', [Validators.required]],
      class: ['', [Validators.required]],
      result: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }


  addNewStudent(): void {
    console.log(this.addNewStudentForm.value);
    this.firestore.collection('students').add(this.addNewStudentForm.value)

  }

}
