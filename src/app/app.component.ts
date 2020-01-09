import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newMovementType;
  newMovementAmount;

  movements: Movement[] = [];
  totalExpenses;
  totalIncome;
  total;

  constructor() {
    this.resetNewMovementInputs();
    this.updateTotals();
  }

  addNewMovement() {
    let newMovement: Movement = {type: this.newMovementType, amount: this.newMovementAmount, date: new Date()};
    this.movements.push(newMovement);
    this.resetNewMovementInputs();
    this.updateTotals();
  }

  resetNewMovementInputs() {
    this.newMovementType = 'INGRESO';
    this.newMovementAmount = 0.0;
  }

  private updateTotals() {
    let expenses = this.movements.filter((movement) => movement.type === 'EGRESO');
    let incomes = this.movements.filter((movement) => movement.type === 'INGRESO');
    let totalExpenses = this.getTotalFromMovements(expenses);
    let totalIncomes = this.getTotalFromMovements(incomes);
    let total = totalIncomes - totalExpenses;

    this.totalExpenses = totalExpenses;
    this.totalIncome = totalIncomes;
    this.total = total;
  }

  private getTotalFromMovements(movements: Movement[]): number {
    let accu = 0;
    for (let movement of movements) {
      accu += movement.amount;
    }
    return accu;
  }
}
