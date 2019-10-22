import {Component, OnDestroy, OnInit} from '@angular/core';
import {Theme, Themes, ThemeService, ALL_THEMES} from './service/theme-service/theme.service';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {OverlayContainer} from '@angular/cdk/overlay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  theme: Theme;
  themeSubscription: Subscription;

  constructor(private themeService: ThemeService, private overlayContainer: OverlayContainer) { }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.observer()
      .pipe(
        map((theme: Theme) => {
          this.theme = theme;

          // add theme class to overlay container (eg. dialog);
          const overlayContainerHTMLElement: HTMLElement = this.overlayContainer.getContainerElement();
          ALL_THEMES.forEach((t: Theme) => {
            overlayContainerHTMLElement.classList.remove(t.cssClassName);
          });
          overlayContainerHTMLElement.classList.add(theme.cssClassName);
        })
      ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
