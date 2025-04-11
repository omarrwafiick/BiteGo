declare module 'express-sanitizer' {
    import { RequestHandler } from 'express';
    const expressSanitizer: () => RequestHandler;
    export default expressSanitizer;
}
