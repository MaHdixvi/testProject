import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: string = 'persian';
  private days: any = {
    english: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    persian: [
      'یکشنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنجشنبه',
      'جمعه',
      'شنبه',
    ],
  };

  getDayName(
    dayIndex: number,
    language: string = this.currentLanguage
  ): string {
    return this.days[language][dayIndex];
  }

  getDayMessage(
    dayIndex: number,
    language: string = this.currentLanguage
  ): string {
    switch (dayIndex) {
      case 0:
        return language === 'english'
          ? 'Today is Sunday: Math class.'
          : 'امروز شنبه‌ست: کلاس ریاضی داری.';
      case 1:
        return language === 'english'
          ? 'Today is Monday: Physics class.'
          : 'امروز یکشنبه‌ست: کلاس فیزیک داری.';
      case 2:
        return language === 'english'
          ? 'Today is Tuesday: Chemistry class.'
          : 'امروز دوشنبه‌ست: کلاس شیمی داری.';
      case 3:
        return language === 'english'
          ? 'Today is Wednesday: Computer class.'
          : 'امروز سه‌شنبه‌ست: کلاس کامپیوتر داری.';
      case 4:
        return language === 'english'
          ? 'Today is Thursday: Sports class.'
          : 'امروز چهارشنبه‌ست: کلاس ورزش داری.';
      case 5:
        return language === 'english'
          ? 'Today is Friday: Language class.'
          : 'امروز پنج‌شنبه‌ست: کلاس زبان داری.';
      case 6:
        return language === 'english'
          ? 'Today is Saturday: Rest day!'
          : 'امروز جمعه‌ست: استراحت کن!';
      default:
        return 'Invalid day!';
    }
  }

  setCurrentLanguage(language: string) {
    this.currentLanguage = language;
  }
}
