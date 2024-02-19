import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

const MEOW_FACTS_URL =
  process.env.MEOW_FACTS_URL ?? 'https://meowfacts.herokuapp.com';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  public getFacts(count: number) {
    return this.httpService
      .get<{ data: string[] }>(`${MEOW_FACTS_URL}?lang=eng-us&count=${count}`)
      .pipe(
        map((response) => {
          return response.data;
        }),
      );
  }
}
