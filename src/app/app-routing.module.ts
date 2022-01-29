import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import { ContactComponent } from './contact/contact.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'aboutpage', component: AboutpageComponent },
  { path: 'products' , component: ProductsComponent},
  { path: 'FAQs' , component: FrequentlyAskedQuestionsComponent},
  { path: 'contact' , component: ContactComponent},
  { path: '' , redirectTo: '/homepage', pathMatch: 'full'},
  { path: '**' , component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
