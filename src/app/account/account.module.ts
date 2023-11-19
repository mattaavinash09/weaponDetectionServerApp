import { AccountComponent } from '../account/account/account.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from '../account/account-routing.module';
import { MatCardModule,  } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }