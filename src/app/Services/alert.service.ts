import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, duration = 5000, isError = false) {
    this.snackBar.open(
      message,
      '',
      isError
        ? {
            duration: duration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          }
        : {
            duration: duration,
            horizontalPosition: 'right',
            verticalPosition: 'bottom'
          }
    );
  }
}
