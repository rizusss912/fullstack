import {Observable, Subject} from "rxjs";

export function getLocalStorageObservable(key: string): Observable<StorageEvent> {
  const subject: Subject<StorageEvent> = new Subject<StorageEvent>();

  function wripper(key: string, subject: Subject<StorageEvent>): (e: StorageEvent) => void {
    return function (e: StorageEvent) {
      if (e.key === key) {
        subject.next(e);
      }
    };
  }

  window.addEventListener('storage', wripper(key, subject));

  return subject.asObservable();
}
