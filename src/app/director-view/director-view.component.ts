import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-director-view",
  templateUrl: "./director-view.component.html",
  styleUrls: ["./director-view.component.scss"],
})
// export class DirectorViewComponent implements OnInit {
export class DirectorViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      directorImage: any;
      birth: string;
      birthplace: string;
    }
  ) {}

  ngOnInit(): void {}

  formatDate(birth: string) {
    return formatDate(birth, "yyyy", "en-US");
  }
}
