import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { env } from 'process';
import { Tedis } from 'tedis';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');

    const redis: Tedis = new Tedis({
      port: 6380,
      host: env.REDISCACHEHOSTNAME,
      password: env.REDISCACHEKEY,
      tls: { cert: null, key: null }
    });
    let responseMessage: string[] = [];

    const namesSet: string = 'names';

    if (req.method === 'POST' && req.query.name) {
      const toAdd = {};
      toAdd[req.query.name] = Date.now();
      await redis.zadd(namesSet, toAdd);
    }

    try {
      const oneMinute: number = 60 * 1000;
      const oneMinuteAgo = Date.now() - oneMinute;
      await redis.zremrangebyscore(namesSet, '-inf', oneMinuteAgo.toString());

      const currentNames: string[] = await redis.zrange(namesSet, 0, -1);
      currentNames.sort();
      responseMessage = currentNames;
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
