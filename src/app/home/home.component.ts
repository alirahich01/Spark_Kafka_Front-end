import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  predictionResult: string = '';
  
  consumeResult: string = '';
  inputDataForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.inputDataForm = this.formBuilder.group({
      names: [''],
      age: [null],
      total_Purchase: [null],
      account_Manager: [null],
      years: [null],
      num_Sites: [null],
      location: [''],
      company: ['']
    });
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

  predict(): void {
    const inputData = this.inputDataForm.value;
    // Make a request to the FastAPI backend for prediction
    this.http.post<any>('http://localhost:8000/predict', inputData).subscribe(response => {
      this.predictionResult = response.result;
    });
  }

  consume(): void {
  // Make a request to the FastAPI backend for consuming
  this.http.get<any>('http://localhost:8000/consume').subscribe(
    response => {
      console.log('Full Response:', response); // Log the entire response
      if (response && response.résultat !== undefined) {
        console.log('Consume Result:', response.résultat); // Log to console
        this.consumeResult = response.résultat; // Update the consume result variable for frontend
      } else {
        console.error('Invalid response format:', response);
        this.consumeResult = 'Error: Invalid response format';
      }
    },
    error => {
      console.error('Error consuming:', error);
      this.consumeResult = 'Error during consumption';
    }
  );
}
}
