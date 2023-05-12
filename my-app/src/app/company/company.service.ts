import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './company';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
private url='http://localhost:3000/company'
  constructor(private http:HttpClient) { }
  get():Observable<Company[]>{
    return this.http.get<Company[]>(this.url);
  }
  create(company:Company){
    return this.http.post(this.url,company);
  }
  getById(id:string):Observable<Company>{
    return this.http.get<Company>(`${this.url}/${id}`);
  }
  update(company:Company):Observable<Company>{   
   return this.http.put<Company>(`${this.url}/${company._id}`,company ) 
  }
  delete(id:string):Observable<HttpResponse<any>>{
    return this.http.delete<HttpResponse<any>>(`${this.url}/${id}`);  
  }
}
