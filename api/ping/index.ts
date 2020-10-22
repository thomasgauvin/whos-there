import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { env } from 'process';
import { Tedis } from 'tedis';

class ActiveName {
  name: string;
  stale: boolean;
}

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');

    const redis: Tedis = new Tedis({
      port: 6380,
      host: env.REDISCACHEHOSTNAME,
      password: env.REDISCACHEKEY,
      tls: { cert: null, key: null }
    });
    const namesSet: string = 'names';
    const currentNames: ActiveName[] = [];

    if (req.method === 'POST' && req.query.name) {
      const toAdd = {};
      toAdd[req.query.name] = Date.now();
      await redis.zadd(namesSet, toAdd);
    }

    try {
      const now: number = Date.now();
      const oneMinute: number = 60 * 1000;
      const oneMinuteAgo = now - oneMinute;
      const fifteenSeconds: number = 15 * 1000;
      const fifteenSecondsAgo = now - fifteenSeconds;
      await redis.zremrangebyscore(namesSet, '-inf', oneMinuteAgo.toString());

      const namesAndScores: { [propName: string]: string } = await redis.zrange(namesSet, 0, -1, "WITHSCORES");

      for (const name in namesAndScores) {
        if (namesAndScores.hasOwnProperty(name)) {
          const score: number = parseInt(namesAndScores[name], 10);
          let stale: boolean = false;
          if (score < fifteenSecondsAgo) {
            stale = true;
          }
          currentNames.push({ name, stale });
        }
      }

      currentNames.sort((a: ActiveName, b: ActiveName): number => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    } catch (e) {
      context.log(e);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: currentNames,
    };
    context.res.headers = { 'Content-Type': 'application/json' };
};

export default httpTrigger;
