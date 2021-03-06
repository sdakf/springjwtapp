import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
// http://tutorials.pluralsight.com/front-end-javascript/getting-started-with-angular-2-by-building-a-giphy-search-application
export class GiphyService {

  // Public beta key: https://github.com/Giphy/GiphyAPI#public-beta-key
  giphyApi = '//api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=1&q=';

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Access-Control-Allow-Origin':'*',
  //     'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
  //     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, content-type, Accept'
  //
  //   }),
  //   withCredentials:true
  // };
  constructor(private httpClient: HttpClient) {
  }

  populate(searchTerm) {
    const apiLink = this.giphyApi + searchTerm;
    return this.httpClient.get(apiLink).pipe(map((response: any) => {
      if (response.data.length > 0) {
        return response.data[0].images.original.url;
      } else {
        return 'https://media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif'; // dancing cat for 404
      }
    }));
  }
}
