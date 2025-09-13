import {
  Component,
  ViewChild,
  ContentChild,
  ViewChildren,
  ContentChildren,
  QueryList,
  ElementRef,
  OnInit,
  ViewContainerRef,
  AfterViewInit,
} from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [HomeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    console.log(this.pageViewChildren.first?.nativeElement);
  }
  // ViewChild and ViewChildren examples
  @ViewChild(HomeComponent) homeComponent!: any;
  @ViewChild('pageViewChild') pageViewChild!: ElementRef;
  @ViewChildren('pageViewChildren') pageViewChildren!: QueryList<ElementRef>;

  // ContentChild and ContentChildren examples
  @ContentChild('pageContentChild') pageContentChild!: ElementRef;
  @ContentChildren('pageContentChildren')
  pageContentChildren!: QueryList<ElementRef>;
  consolingcount(e: number) {
    console.log(e);
  }
}
