import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  prefix = 'API/survey';

  constructor(private http: HttpClient) {

  }

  getSurvey() {
    return this.http.get(
      `${this.prefix}/123`
    );
  }
}
