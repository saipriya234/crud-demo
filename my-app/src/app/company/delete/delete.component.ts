import { Component,Inject,OnInit } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { CompanyService } from '../company.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
constructor(private dialogRef:MatDialogRef<DeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private cs:CompanyService
  ){}
  
  ngOnInit(): void {}
  confirmDelete(){ 
    this.cs.delete(this.data.id).subscribe(()=>{  
    this.dialogRef.close(this.data.id);
    })
  }
}
