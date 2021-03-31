import {HttpRequest} from "@angular/common/http";

export function setAuthorizationHeader(res: HttpRequest<any>, token: string): HttpRequest<any> {
  return res.clone({
    setHeaders: {
      authorization: `Bearer ${token}`,
    },
  });
}
