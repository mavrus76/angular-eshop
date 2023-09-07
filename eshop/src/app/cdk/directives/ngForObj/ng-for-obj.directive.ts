import {
  Directive,
  DoCheck,
  Input,
  KeyValueChangeRecord,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngForObj]',
})
export class NgForObjDirective implements OnInit, DoCheck {
  public object!: any;
  public differ!: KeyValueDiffer<string, string>;

  @Input() set ngForObjOf(object: any) {
    this.object = object;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private iterable: KeyValueDiffers
  ) {}

  ngOnInit(): void {
    this.differ = this.iterable.find(this.object).create();
  }

  ngDoCheck(): void {
    const objectChanges: KeyValueChanges<string, string> | null =
      this.differ.diff(this.object);

    if (objectChanges) {
      objectChanges.forEachItem(
        (record: KeyValueChangeRecord<string, string>) => {
          this.viewContainer.createEmbeddedView(this.templateRef, {
            $implicit: {
              name: record.key,
              value: record.currentValue,
            },
          });
        }
      );
    }
    console.log('doCheck');
  }
}
