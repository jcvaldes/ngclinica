import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clinica';
  ngOnInit() {
    init_plugins();
  }
}
