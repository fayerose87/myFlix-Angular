import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(["welcome"]);
    this.snackBar.open("You have been logged out.", "OK", {
      duration: 2000,
    });
  }
}