import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public msg: {title: string, subtitle: string}) { }

  ngOnInit(): void {
  }

}
