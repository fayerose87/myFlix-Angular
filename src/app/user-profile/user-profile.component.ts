import { Component, OnInit, Input } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {

  /**
   * gets user details with input
   */
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * gets user
   */
  getUser(): void {
    const user = localStorage.getItem("user");
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
    });
  }

  /**
   * deregisters user
   */
  deleteUser(): void {
    if (
      confirm(
        "Are you sure you want to delete your account? This can't be undone."
      )
    ) {
      this.fetchApiData.deleteUser().subscribe(
        () => {
          this.snackBar.open("User successfully deleted.", "OK", {
            duration: 3000,
          });
        },
        (response) => {
          this.snackBar.open(response, "OK", { duration: 2000 });
          localStorage.clear();
          this.router.navigate(["welcome"]);
        }
      );
    }
  }

  formatDate(birthday: string) {
    return formatDate(birthday, "MM/dd/YYYY", "en-US");
  }

  
  /**
   * Opens dialog to update user info
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
      width: "280px",
    });
  }
}
