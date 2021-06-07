import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class GenericHttpService<T> {
    constructor(
        private httpClient: HttpClient,
        private url: string,
        private endpoint: string
    ) { }

    public create(item: T): Observable<T> {
        return this.httpClient
            .post<T>(`${this.url}/${this.endpoint}`, item)
            .pipe(map(data => data));
    }

    public update(item: T, id: any): Observable<T> {
        return this.httpClient
            .put<T>(`${this.url}/${this.endpoint}/${id}`, item)
            .pipe(map(data => data));
    }

    public getById(id: number): Observable<T> {
        return this.httpClient
            .get(`${this.url}/${this.endpoint}/${id}`)
            .pipe(map((data: any) => data));
    }

    public getByQuery(name: any): Observable<T> {
        return this.httpClient
            .get(`${this.url}/${this.endpoint}/${name}`)
            .pipe(map((data: any) => data));
    }


    public getAll(): Observable<T[]> {
        return this.httpClient
            .get(`${this.url}/${this.endpoint}`)
            .pipe(map((data: any) => data));
    }

    public deleteById(id: number) {
        return this.httpClient
            .delete(`${this.url}/${this.endpoint}/${id}`)
            .pipe(map(data => data));
    }

    public getAllWithUrlParam(url: any, endpoint: any, value: any): Observable<T[]> {
        if (value) {
            return this.httpClient
                .get(`${url}/${endpoint}/${value}`)
                .pipe(map((data: any) => data));
        } else {
            return this.httpClient
                .get(`${url}/${endpoint}`)
                .pipe(map((data: any) => data));
        }
    }
}