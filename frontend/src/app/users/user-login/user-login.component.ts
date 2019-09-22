import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  faUser = faUser;
  faLock = faLock;

  email: string;
  password: string;
  isMouseOverSubmit: boolean;

  constructor(private router: Router, private auth: AuthService) { }

  login(formValues) {
    this.auth.login(formValues.email, formValues.password)
      .subscribe(
        () => {
          console.log('User is logged in:', this.auth.currentUser);
        }
      );
  }

  async cancel() {
    await this.router.navigate(['/home']);
  }

}
