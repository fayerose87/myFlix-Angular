import { Component, OnInit, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-login-form",
  templateUrl: "./user-login-form.component.html",
  styleUrls: ["./user-login-form.component.scss"],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: "", Password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Logs in user
   * routes to movie screen
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", response.user.Username);
        this.dialogRef.close(); //close the modal on success
        console.log(response);
        this.snackBar.open("User logged in successfully!", "OK", {
          duration: 2000,
        });
        this.router.navigate(["movies"]);
      },
      (response) => {
        this.snackBar.open(response, "OK", {
          duration: 2000,
        });
      }
    );
  }
}
