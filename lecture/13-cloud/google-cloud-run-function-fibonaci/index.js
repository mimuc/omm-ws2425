const functions = require('@google-cloud/functions-framework');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
functions.http('helloHttp', (req, res) => {
    let n = req.query.n;
    let a = 0, b = 1, result = 0;
    for (let i = 2; i <= n; i++) {
        result = a + b;
        a = b;
        b = result;
    }
    let message = `Hello OMM! Your result is ${result}`;
    res.status(200).send(message);
});
