import { Component, OnInit } from '@angular/core';

import { MyserviceService } from '../service/myservice.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  result: any;
  newId: any;
  addcustomer: any;
  data: any;


  constructor(private myservice:MyserviceService, private router:Router) { }

  ngOnInit(): void {
    this.myservice.viewcustomer().subscribe(r=>{this.result=r;});
    this.addcustomer= new FormGroup(
      {
        FirstName:new FormControl(),
       LastName:new FormControl(),
        Country:new FormControl(),
        CreateDate:new FormControl()
       
      }
    ); 
    
  }
  addcus()
  {
    this.router.navigate(['/addcustomer']);
  }
deletecus(Id:any)
{
  this.myservice.deletecustomer(Id).subscribe((r:any)=>{this.result=r; window.location.reload();});
}
updatecus(CustomerId:any)
{
  this.newId=CustomerId
  alert(CustomerId);
  this.router.navigate(['/update',CustomerId]);
}
viewcus(CustomerId:any)
{
  this.newId=CustomerId;
  this.router.navigate(['/view', CustomerId]);
}

onSubmit()
{
  this.data=this.addcustomer.value;
  this.myservice.addcustomer(this.data).subscribe(res=>{this.result=res;
  this.router.navigate(['/view']);
  window.location.reload();
  });

  
}
}
