import { Request } from 'express';

export default interface IRequest extends Request {
  user?: { id: number; userType: string; passwordChangedAt: Date | null };
  __skipRequestBodyLog?: boolean;
  __skipHttpLog?: boolean;
  __id: string;
  __xTimestamp?: number;
  __timestamp: number;
  __timezone: string;
  __customLang: string[];
  __xCustomLang: string;
  __version: string;
  __repoVersion: string;

  __class?: string;
  __function?: string;

  __filters?: Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  >;
//   __pagination?: ResponseDefaultSerialization;
}