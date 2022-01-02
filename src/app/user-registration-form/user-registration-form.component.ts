import { Component, OnInit, Input } from "@angular/core";

// Close the dialog on success
import { MatDialogRef } from "@angular/material/dialog";

// Bring in the API calls
import { FetchApiDataService } from "../fetch-api-data.service";

// Display notifications back to the user
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-registration-form",
  templateUrl: "./user-registration-form.component.html",
  styleUrls: ["./user-registration-form.component.scss"],
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * Information needed to register user
   */
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Function responsible for sending the form inputs to the backend
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
         // Logic for a successful user registration
        this.dialogRef.close(); //close the modal on success
        console.log(response);
        this.snackBar.open("User registered successfully!", "OK", {
          duration: 2000,
        });
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, "OK", {
          duration: 2000,
        });
      }
    );
  }
}
