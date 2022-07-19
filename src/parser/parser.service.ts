import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Node, parse as parseRawHtml } from 'node-html-parser';
import { SocketGateway } from 'src/socket/socket.gateway';

export type ParserElement = {
  name: string;
  url: string;
  params: { [x: string]: any };
  container: string;
  fields: {
    description: string;
    value: string;
  }[];
};

@Injectable()
export class ParserService {
  private readonly logger: Logger;
  private isRunning: boolean;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly socketGateway: SocketGateway,
  ) {
    this.logger = new Logger(ParserService.name);
    this.isRunning = this.configService.get<boolean>('active_from_start');
  }

  @Cron(CronExpression.EVERY_5_SECONDS, { name: ParserService.name })
  parse() {
    if (!this.isRunning) return this.socketGateway.broadcast([]);
    const parsingTarget =
      this.configService.get<ParserElement>('parsing_target');
    this.logger.log(`Parsing: ${parsingTarget.name}`);
    this.httpService
      .get(parsingTarget.url, parsingTarget.params)
      .subscribe(({ data }) => {
        const htmlDOM = parseRawHtml(data);
        const container = htmlDOM.querySelector(parsingTarget.container);
        const fieldsData = container.childNodes.reduce(
          (parsedData, currentElement) => [
            ...parsedData,
            parsingTarget.fields.reduce(
              (parsedElementData, field) => ({
                ...parsedElementData,
                [field.description]: (
                  currentElement as Node & {
                    querySelector(selector: string): HTMLElement;
                  }
                ).querySelector(field.value).textContent,
              }),
              {},
            ),
          ],
          [],
        );
        this.socketGateway.broadcast(fieldsData);
      });
  }

  stopParse() {
    if (!this.isRunning)
      throw new BadRequestException('Parser already stopped');
    this.isRunning = false;
    return { message: 'success' };
  }

  startParse() {
    if (this.isRunning) throw new BadRequestException('Parser already running');
    this.isRunning = true;
    return { message: 'success' };
  }
}
