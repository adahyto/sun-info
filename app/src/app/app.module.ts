import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProgressBarModule } from 'angular-progress-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { CounterComponent } from './components/counter/counter.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { SunInfoComponent } from './components/sun-info/sun-info.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        CounterComponent,
        ProgressBarComponent,
        LoadingBarComponent,
        SunInfoComponent,
    ],
    imports: [
        BrowserModule,
        ProgressBarModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [],
    bootstrap: [AppComponent,]
})
export class AppModule { }
