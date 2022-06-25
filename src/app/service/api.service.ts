import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';;
import { LoaderService } from './loader.service';
import { UserInterface } from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private ServerUrl: string = 'https://randomuser.me/api/';

  constructor(private http: HttpClient, public loaderservice: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderservice.isLoading.next(true);
    console.log('Request Http Interceptor....');
    // in case of authorization and JWT token use below
    const reqWithAuth = req.clone({
      setHeaders: {
        // headers
      }
    });
    return next.handle(req)
      .pipe(

        //retry on failure
        retry(1),

        //handle Errors
        catchError((error: HttpErrorResponse) => {
          this.loaderservice.isLoading.next(false);
          //error handling logic

          Swal.fire('Error', 'HTTP Error: Failed!! Try again later', 'error');

          // alert(`HTTP Error: ${req.url}`);
          return throwError(error);
        }),
        //profilling
        finalize(() => {

          const profilingMessage = `${req.method} "${req.urlWithParams}"`;
          console.log(profilingMessage);
          this.loaderservice.isLoading.next(false);
        })
      );
  }
  //subscribe to user information from random.me api server Url
  public getUserInformation(): Observable<UserInterface[]> {
    return this.http.get<any>(this.ServerUrl + '?results=30');
  }
}
