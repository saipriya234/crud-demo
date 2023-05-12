import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { FormBuilder,  FormGroup } from '@angular/forms';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  companyId: string|any;
  companyForm:FormGroup| any;
  company:Company|any ;
constructor(private cs:CompanyService,
  private router:Router,
  private route:ActivatedRoute,
  private fb:FormBuilder
  ){}
  ngOnInit(): void {
    this.companyForm=this.fb.group({    
      name:'',
      location:'',
      email: ''
    })
    this.companyId=this.route.snapshot.paramMap.get('id');
    this.cs.getById(this.companyId)
    .subscribe(company=>{
      this.company=company; 
      this.companyForm.patchValue({
        name: company.name,
        location: company.location,
        email: company.email
      });
    })
}

update(){
 
  const updateCompany:Company={
    _id:this.companyId,
    name: this.companyForm.value.name,
    location: this.companyForm.value.location,
     email: this.companyForm.value.email
  }
    this.cs.update(updateCompany).subscribe(()=>{
      this.router.navigate(['/'])
    })
  }
}



