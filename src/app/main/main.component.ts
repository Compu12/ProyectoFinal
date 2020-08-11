import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  formulario = new FormGroup({
    buscar: new FormControl(''),
   
  });
  constructor() { }

  ngOnInit(): void {
    
  }

 
 
   
}
