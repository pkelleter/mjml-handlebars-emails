import {timer} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class APollingService {

    private readonly pollInterval = 2500;
    public polling$ = timer(0, this.pollInterval);

}
