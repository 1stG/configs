import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  template: `component content`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {}
