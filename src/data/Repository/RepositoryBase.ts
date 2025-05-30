import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export default class RepositoryBase {
  protected readonly baseUrl: string;
  protected readonly clientId: string;
  protected readonly clientSecret: string;
  protected readonly autenticationPrefix: string;
  protected readonly identityPrefix: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
    this.clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;
    this.clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET as string;
    this.autenticationPrefix = process.env.NEXT_PUBLIC_AUTHENTICATION_PREFIX as string;
    this.identityPrefix = process.env.NEXT_PUBLIC_IDENTITY_PREFIX as string;
  }
}
