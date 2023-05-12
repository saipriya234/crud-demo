import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import {  FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{

  companyForm: FormGroup |any;
  constructor(private cs:CompanyService,
    private router:Router,
    private fb:FormBuilder,
    private snackbar:MatSnackBar
    ){}
  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      location:''
    });
  }

  create(){
    const company:Company={
      name: this.companyForm.value.name,
      email: this.companyForm.value.email,
      location: this.companyForm.value.location,
    _id:''
    };
    this.cs.create(company).subscribe(()=>{
      this.snackbar.open('Record Created', 'Close', { duration: 2000 });
      this.router.navigate(['/']);
    })
  }
}

