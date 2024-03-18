import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'f1-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardData: any;

  constructor() { }

  ngOnInit(): void {}

  formatTime(result){
    return result && result.Time && result.Time.time ? result.Time.time : "N/A";
  }
}