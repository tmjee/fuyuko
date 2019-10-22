import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class ProfilingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime: number = new Date().getTime();
    return next
      .handle(req)
      .pipe(
        tap((e: HttpEvent<any>) => {
          if (e instanceof HttpResponse) {
            const url: string = (e as HttpResponse<any>).url;
            const endTime: number = new Date().getTime();
            const totalTime = endTime - startTime;
            console.log(`[profiling] ${url} took ${totalTime} ms`);
          }
        })
      );
  }
}

