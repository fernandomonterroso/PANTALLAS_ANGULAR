import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import { Subject } from 'rxjs';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements AfterViewInit{
  //isLoading$ = this._GlobalService.isLoading$;
  constructor(private _GlobalService: GlobalService,
    private changeDetectorRef: ChangeDetectorRef) { }

    isLoading$!: Subject<boolean>;

    ngAfterViewInit() {
      Promise.resolve().then(() => {this.isLoading$ = this._GlobalService.isLoading$;});
      //this.isLoading$ = this._GlobalService.isLoading$;
      //this.changeDetectorRef.detectChanges();
    }

}
