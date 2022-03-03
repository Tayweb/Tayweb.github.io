import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor(private router: Router) {}

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
