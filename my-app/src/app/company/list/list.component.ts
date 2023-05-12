import { Component,OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  implements OnInit{
  companies:Company[]=[];
  
  displayedColumns: string[] =['name','email','location','actions'];
  constructor(private cs:CompanyService,
    private router:Router
    ){}
  ngOnInit(): void {
    this.get()
  }
  get(){
   this.cs.get().subscribe((data:any)=>{
    this.companies=data;
   }) 
  }
onedit(id:any){
  this.router.navigate(['/edit',id]);
}
 openDeleteModel(id: string): void{
    if(confirm('you want to delete the record?')){
      this.cs.delete(id).subscribe(res=>{
        if(res.status===200){
       alert('record deleted')
        }
      })
    }
    
}

}