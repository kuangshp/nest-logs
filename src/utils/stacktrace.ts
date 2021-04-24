import * as Path from 'path';
import * as StackTrace from 'stacktrace-js';

export const getStackTrace = (deep: number = 2): string => {
  const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
  const stackInfo: StackTrace.StackFrame = stackList[deep];
  // const lineNumber: number = stackInfo.lineNumber;
  // const columnNumber: number = stackInfo.columnNumber;
  const fileName: string = stackInfo.fileName;
  const basename: string = Path.basename(fileName);
  return `${basename}:`;
}