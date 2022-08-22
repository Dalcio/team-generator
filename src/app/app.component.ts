import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMemberName: string = '';
  members: string[] = [];
  errorMessage: string = '';
  teamsQt: number = 0;
  teams: string[][] = [];

  private handleError = () => {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  };

  onInput = (name: string) => {
    this.newMemberName = name;

    this.handleError();
  };

  changeTeamsQuantity = (str: string) => {
    this.teamsQt = Number(str);

    this.handleError();
  };

  addMember = () => {
    if (this.newMemberName.length > 0) {
      if (!this.members.includes(this.newMemberName)) {
        this.members.push(this.newMemberName);
        this.newMemberName = '';
      } else {
        this.errorMessage = 'This member already exists';
      }
    } else {
      this.errorMessage = "Name can't be empty";
    }
  };

  generateTeams = () => {
    const qt = this.teamsQt;
    const length = this.members.length;

    if (qt <= length) {
      const allMembers = [...this.members];

      while (allMembers.length) {
        this.teams = [];

        for (let i = 0; i < qt; i++) {
          const randomIdx = Math.floor(Math.random() * allMembers.length);
          const member = allMembers.splice(randomIdx, 1)[0];

          if (!member) break;

          if (this.teams[i]) {
            this.teams[i].push(member);
          } else {
            this.teams[i] = [member];
          }
        }
      }
    } else {
      this.errorMessage = `It's impossible to generate ${qt} teams, because qe simply have ${length} members`;
    }
  };
}
