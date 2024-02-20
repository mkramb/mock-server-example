import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, map, of } from 'rxjs';

const MEOW_FACTS_URL =
  process.env.MEOW_FACTS_URL ?? 'https://meowfacts.herokuapp.com';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpService: HttpService) {}

  public getFacts(count: number) {
    const url = `${MEOW_FACTS_URL}?lang=eng-us&count=${count}`;

    this.logger.log(`Making request to MEOW_FACTS_URL: ${url}`);

    return this.httpService.get<{ data: string[] }>(url).pipe(
      map((response) => {
        return response.data;
      }),
      catchError((error) => {
        this.logger.error('Error fetching data', {
          error: error?.message,
        });

        return of({ data: [], error: true });
      }),
    );
  }
}
