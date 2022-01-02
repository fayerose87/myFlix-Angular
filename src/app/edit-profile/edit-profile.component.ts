import { Component, OnInit, Input, Inject } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
})
export class EditProfileComponent implements OnInit {
  user: any[] = [];

  @Input() userDetails = {
    Username: "",
    Password: "",
    Email: "",
    Birthday: "",
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  updateUser(): void {
    this.fetchApiData.editUser(this.userDetails).subscribe(
      (result) => {
        this.dialogRef.close();
        localStorage.setItem("user", result.Username);

        this.snackBar.open("User updated.", "OK", {
          duration: 3000,
        });
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, "OK", {
          duration: 3000,
        });
      }
    );
    setTimeout(function () {
      window.location.reload();
    }, 3500);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
