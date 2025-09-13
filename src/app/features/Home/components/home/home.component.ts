import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ViewChild,
  ContentChild,
  ViewChildren,
  ContentChildren,
  QueryList,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent
  implements DoCheck, OnInit, AfterContentInit, AfterViewInit, OnDestroy
{
  private subscribe: Subscription[]=[]
  users: User[] = [];
  count: number = 0;
  @Input() fsdf: any;
  @Output() countChanged = new EventEmitter<number>();
  // ViewChild and ViewChildren examples
  @ViewChild('viewchildcontent') viewChildElement!: ElementRef;
  @ViewChildren('viewChildElements') viewChildElements!: QueryList<ElementRef>;

  // ContentChild and ContentChildren examples
  @ContentChild('pageContentChild') pageContentChild!: ElementRef;
  @ContentChildren('contentChildElements')
  contentChildElements!: QueryList<ElementRef>;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authservice: AuthService
  ) {}
  ngOnDestroy(): void {
    this.subscribe.forEach((x) => x.unsubscribe());
  }
  ngOnInit(): void {
    const subscribe =this.authservice.getUsers().subscribe({
      next: (x) => {
        this.users = x;
      },
      error: (err:any) => {
        console.error('خطا در دریافت کاربران:', err);
        // مدیریت خطا اینجا انجام شود
      }
    });
    this.subscribe.push(subscribe)
  }

  ngDoCheck(): void {
    console.log('ngDoCheck is running...');
    // زمانی که تغییرات در count انجام می‌شود، تشخیص تغییرات به‌صورت دستی انجام می‌دهیم
    if (this.count > 5) {
      this.cdr.detectChanges(); // تغییرات را به‌صورت دستی تشخیص می‌دهیم
      console.log('Detected changes manually');
      this.router.navigateByUrl('/about-us');
    }
  }

  increment() {
    this.count++;
    if (this.count > 4) {
      this.countChanged.emit(this.count);
    }
  }

  ngAfterViewInit() {
    console.log(this.viewChildElement.nativeElement.innerHTML);
    this.viewChildElement.nativeElement.innerHTML =
      this.pageContentChild.nativeElement.innerHTML;
    console.log('ngAfterViewInit is running...');
    console.log(this.viewChildElement.nativeElement.innerHTML);
  }

  ngAfterContentInit() {
    // Accessing ContentChild elements after content initialization
    if (this.pageContentChild) {
      console.log('ContentChild element:', this.pageContentChild.nativeElement);
    }

    // Accessing ContentChildren elements
    if (this.contentChildElements) {
      console.log(
        'ContentChildren elements:',
        this.contentChildElements.toArray()
      );
    }
  }
}
