import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss'],
})
export class ArrowComponent implements OnInit {
  @Input() fill = '#8c52e5';
  @Input() height = '17';
  @Input() width = '18';

  constructor() {}

  ngOnInit(): void {}
}
