import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[rszDragHandle]'
})
export class DragDirective {

  @Output() DragStart = new EventEmitter();
  @Output() Drag = new EventEmitter();
  @Output() DragEnd = new EventEmitter();

  private dragging = false;

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    if (event.which === 1) {
      this.dragging = true;
      this.DragStart.emit({ originalEvent: event });
    }
  }
  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) {
    if (this.dragging) {
      this.DragEnd.emit({ originalEvent: event });
    }
    this.dragging = false;
  }
  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.dragging) {
      this.Drag.emit({ originalEvent: event });
    }
  }
}
