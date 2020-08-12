import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ContentComponent} from './render-example/components/content/content/content.component';
import {HeaderComponent} from './render-example/components/header/header/header.component';
import {SidebarComponent} from './render-example/components/sidebar/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {AppRoutingModule} from './app-routing.module';
import {RenderExampleComponent} from './render-example/render-example.component';
import {ExamplesTabComponent} from './render-example/components/content/examples-tab/examples-tab.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CompiledTemplateComponent} from './render-example/components/content/compiled-template/compiled-template.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        AppComponent,
        ContentComponent,
        HeaderComponent,
        SidebarComponent,
        RenderExampleComponent,
        ExamplesTabComponent,
        CompiledTemplateComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTabsModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
