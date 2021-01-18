import {FormGroup} from "@angular/forms";

export function TimeValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    const controlValue = control.value;
    const matchingControlValue = matchingControl.value;

    const controlTime = SplitTime(controlValue);
    const matchingControlTime = SplitTime(matchingControlValue);

    if (controlTime > matchingControlTime) {
      control.setErrors({time: true})
    }

    return null;
  };
}

function SplitTime(value: string) {
  let str = value.split(':');
  let time = +(str[0] + str[1]);

  return time;
}
