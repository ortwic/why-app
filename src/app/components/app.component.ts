import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styles: `main { margin: 1rem 5% }`,
    imports: [RouterModule, RouterOutlet, NavComponent]
})
export class AppComponent {
}
