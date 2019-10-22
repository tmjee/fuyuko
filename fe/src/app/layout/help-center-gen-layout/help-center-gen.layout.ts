import {Component} from '@angular/core';
import {AppNotificationService} from '../../service/app-notification-service/app-notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractGenSubLayoutComponent} from '../abstract-gen-sub.layout';
import {AuthService} from '../../service/auth-service/auth.service';

@Component({
  templateUrl: './help-center-gen.layout.html',
  styleUrls: ['./help-center-gen.layout.scss']
})
export class HelpCenterLayoutComponent extends AbstractGenSubLayoutComponent {

  constructor(notificationService: AppNotificationService,
              authService: AuthService,
              router: Router,
              route: ActivatedRoute) {
    super(notificationService, authService, route, router);
  }

}
