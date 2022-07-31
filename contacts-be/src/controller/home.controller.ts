import * as express from 'express';
import { controller, httpGet, request, response } from 'inversify-express-utils';

@controller('/')
class HomeController {
  @httpGet('/')
  public getHome(@request() req: express.Request, @response() res: express.Response) {
    return 'Hello, world!';
  }
}

export default HomeController;
