import { Component, inject } from '@angular/core';
import { JsonPipe, NgIf, NgStyle } from '@angular/common';
import { Nitro } from '../nitrogen';

@Component({
  selector: 'nit-workspace',
  standalone: true,
  imports: [NgIf, NgStyle, JsonPipe],
  template: `
    <div class="workspace" [ngStyle]="workspace">
      <div class="border">
        <header *ngIf="nitro.value.displayHeader" [ngStyle]="headerStyle">
          <ng-container *ngIf="nitro.value.displayIcons">
            <div class="close"></div>
            <div class="min"></div>
            <div class="max"></div>
          </ng-container>
          <span *ngIf="nitro.value.displayTitle">{{ nitro.value.title }}</span>
        </header>
        <main>
          <ng-content></ng-content>
        </main>
      </div>
    </div>`,
  styles: `
:host {
  display: flex;
  border-color: transparent;
}

div.workspace {
  display: flex;
}

div.border {
  border-radius: .5em .5em .5em .5em;
  /*box-shadow: 5px 5px 10px 2px rgb(0 0 0 / 20%);*/
}

header {
  height: 1.5em;
  display: flex;
  align-items: center;
  background-color: black;
  padding: .1em 1em .1em .4em;
}

header span {
  color: grey;
  font-size: .8em;
}

main {
  /*border-radius: 0 0 .5em .5em;*/
}

.close, .min, .max {
  width: .5em;
  height: .5em;
  border-radius: 50%;
  margin-right: .2em;
}
.close {
  background: #FF5D5B;
}

.min {
  background: #FFBB39;
}

.max {
  background: #00CD4E;
}
  `
})
export class Workspace {
  protected nitro = inject(Nitro);

  get headerStyle() {
    const {tr, tl} = this.nitro.value;
    return {
      borderRadius: `${tl}px ${tr}px 0 0`,
    };
  }

  get workspace() {
    const {backgroundColor, marginTop, marginRight, marginBottom, marginLeft, transparent} = this.nitro.value;
    return {
      backgroundColor: transparent ? 'transparent': backgroundColor,
      paddingTop: `${marginTop}px`,
      paddingRight: `${marginRight}px`,
      paddingBottom: `${marginBottom}px`,
      paddingLeft: `${marginLeft}px`,
    };
  }
}
