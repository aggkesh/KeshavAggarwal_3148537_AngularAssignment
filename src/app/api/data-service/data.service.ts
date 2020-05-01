import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { News } from 'src/app/model/news';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {

    let news =  [
      {  id:  1, title: 'News1', description: 'Insurance policy number PO1 askdj flkajsldfj alksjdfkla sjflkjsadf lkjasdkf jalksddjf klsadj flkasd jfklasdjf lkasdjjfkl jasjdlkf jasldkjj fkjasd ndflk asdjflka sjflkjas dlfknj asdlkfj slkfjasl kdsjflk dadjfl kdsadjjfl kadsdjfl kadjflkad ssdjfl kasdjflk asdjfkl asjdlkfj adsdsljf ', summary: "Summary 1" }
    ];

     let users = [
        { username: 'Admin', email: 'keshav.aggarwal@nagarro.com', password: 'Keshav1' }
     ];

     return {news, users};
  }

  genId(news: News[]): number {
    return news.length > 0 ? Math.max(...news.map(news => news.id)) + 1 : 1;
  }
}
