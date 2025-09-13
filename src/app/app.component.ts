import { Component, OnInit } from '@angular/core';
import {
  CommonModule,
  DecimalPipe,
  PercentPipe,
  CurrencyPipe,
  UpperCasePipe,
  TitleCasePipe,
  DatePipe,
  NgFor,
} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  NgbModule,
  NgbDateStruct,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LanguageService } from './shared/services/language.service';
import { FormsModule } from '@angular/forms';
import moment from 'moment-jalaali';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgFor,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    DecimalPipe,
    PercentPipe,
    CurrencyPipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe,
    NgbModule,
    NgbDatepickerModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentLanguage: string = 'persian';
  isPersian = true;
  currentDay: string = '';
  dayMessage: string = '';

  amount: number = 24.7687878;
  percentnumberofchicken: number = 1.67710923809123809812;

  users: any[] = [
    { name: 'Ali', email: 'ali@example.com', age: 25 },
    { name: 'Sara', email: 'sara@example.com', age: 30 },
    { name: 'Reza', email: 'reza@example.com', age: 28 },
  ];

  selectedDate?: NgbDateStruct;
  selectedDateJalali?: string;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.updateDayInfo();
  }

  switchLanguage(language: string) {
    this.currentLanguage = language;
    this.isPersian = language === 'persian';
    this.languageService.setCurrentLanguage(language);
    this.updateDayInfo();
  }

  private updateDayInfo() {
    const todayIndex = new Date().getDay();
    this.currentDay = this.languageService.getDayName(todayIndex);
    this.dayMessage = this.languageService.getDayMessage(
      todayIndex,
      this.currentLanguage
    );
  }

  onDateSelect(date: NgbDateStruct) {
    this.selectedDate = date;
    const m = moment([date.year, date.month - 1, date.day]);
    this.selectedDateJalali = m.format('jYYYY/jMM/jDD');
  }
  onDateChange() {
    if (this.selectedDate) {
      const m = moment([
        this.selectedDate.year,
        this.selectedDate.month - 1,
        this.selectedDate.day,
      ]);
      this.selectedDateJalali = m.format('jYYYY/jMM/jDD');
    }
  }
}
