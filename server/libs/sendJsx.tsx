// import type { Response } from 'express';
// import type { Store } from '@reduxjs/toolkit';
// import type { IncomingHttpHeaders } from 'http';
// import path from 'path';
// import { promises as fs } from 'fs';

// const SRC_PATH = path.resolve(__dirname, '..', '..', 'build/');

// export type RequestDataType = {
//     headers: IncomingHttpHeaders;
//     cookies: Record<string, string>;
//     cookiesForWriteToHTML: Record<string, {value: string; maxAge?: string; path?: string}>;
// };

// type ResponseWithHtmlCookiesType = Response & {
//     cookiesForWriteToHTML?: RequestDataType['cookiesForWriteToHTML'];
// };

// type StateType = {
//     reduxState: Store;
// };

// type PropsType = {
//     headers: IncomingHttpHeaders;
//     cookies: Record<string, string>;
//     url: string;
//     jsx?: JSX.Element | null;
//     state: StateType;
//     meta?: string;
//     isPartialRendering?: boolean;
// };

// /**
//  * Returns index.html content with information about the node
//  * @returns {Promise<string>} index.html file content
//  */
// const getIndexHtmlWithNodeData = (): Promise<string> => {
//   const data = fs.readFile(`${SRC_PATH}/index.html`, 'utf-8');
//   return data;
// };

// const getContent = (() => {
//   let content = '';
//   return async (): Promise<string> => {
//     if (!content || process.env.project === 'development') {
//       content = await getIndexHtmlWithNodeData();
//     }
//     return content;
//   };
// })();

// /**
//  * send HTML
//  */
// export async function sendJSX(response: ResponseWithHtmlCookiesType, {
//   jsx = null,
//   state,
//   ...resOptions
// }: PropsType) {
//   response.setHeader('Content-Type', 'text/html; charset=utf-8');
//   const html = await getContent();
//   resultToStream();
// }
