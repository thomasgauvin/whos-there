import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { env } from 'process';
import { Tedis } from 'tedis';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');

    const redis: Tedis = new Tedis({
      port: 6380,
      host: process.env.REDISCACHEHOSTNAME,
      password: process.env.REDISCACHEKEY,
      tls: { cert: null, key: null }
    });
    let responseMessage: string[] = [ 'Kevin', 'Hamilton' ];

    if (req.method === 'POST' && req.query.name) {
      await redis.set('mystring', req.query.name);
    }

    try {
      const lookup: string | number = await redis.get('mystring');
      if (typeof lookup === 'string') {
        responseMessage = [lookup];
      }
    } catch (e) {
      context.log(e);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
    };
    context.res.headers = { 'Content-Type': 'application/json' };
};

export default httpTrigger;
