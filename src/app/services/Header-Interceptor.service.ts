import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') !== null) {
      const token = 'Bearer ' + localStorage.getItem('token');

      const tokenRequest = req.clone({
        headers: req.headers.set('Authorization', token),
      });

      return next.handle(tokenRequest).pipe(
        tap((event: HttpEvent<any>) => {
          if (
            event instanceof HttpResponse &&
            (event.status === 200 || event.status === 201)
          ) {
            console.info('Sucesso na Operação');
          }
        }),
        catchError(this.processaError)
      );
    } else {
      return next.handle(req).pipe(catchError(this.processaError));
    }
  }

  constructor(private snack: MatSnackBar) {}

  processaError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      errorMessage = 'Error' + error.error.error;
    } else if (error.error == 403) {
      errorMessage = 'Acesso negado: Faça o login novamente';
    }else {
      errorMessage = error.error.error;
    }

    window.alert(errorMessage)
    return throwError(errorMessage);
  }
  message(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
  
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptorService,
      multi: true,
    },
  ],
})
export class HeaderInterceptorModule {}
