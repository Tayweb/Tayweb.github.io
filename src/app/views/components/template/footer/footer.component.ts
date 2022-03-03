import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public esconderBarra() {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token")?.toString().trim !== null
    ) {
      return false;
    } else {
      return true;
    }
  }

}
