import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isLaoding$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  isLoadingObs$ = this.isLaoding$.asObservable()

  constructor() { }
  emitLoadingFalg(flag: boolean) {
    this.isLaoding$.next(flag)
  }
}
