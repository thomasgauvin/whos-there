import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('HTTP trigger function processed a request.');
    const responseMessage = [ 'Kevin', 'Hamilton' ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
    };
    context.res.headers = { 'Content-Type': 'application/json' };
};

export default httpTrigger;
