import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AccountService} from '../../services/account.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() error: string | null;
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(   private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
    , private formBuilder: FormBuilder
    , private alertService: AlertService) { this.error = null;}

    ngOnInit() {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        role: ['admin']
    });
  }

    // convenience getter for easy access to form fields
     get f() { return this.form.controls; }

  

  onSubmit() {
    this.submitted = true;
    
        // reset alerts on submit
        this.alertService.clear();
        
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    console.log(this.form.value);
  return;
    this.loading = true;
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          
          this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
}

}
