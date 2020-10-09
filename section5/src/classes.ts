// Code goes here!
abstract class Department {
  static fiscalYear = 2020
  protected employees: string[] = []

  constructor(protected id: string, public name: string) {}

  abstract describe(this: Department): void

  static createEmployee(name: string) {
    return { name: name }
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT')
  }

  describe() {
    console.log(`IT Department (${this.id}): ${this.name}`)
  }
}

class AccountingDepartment extends Department {
  private static instance: AccountingDepartment
  private lastReport: string

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw new Error('No result found.')
  }
  
  set mostRecentReport(report: string) {
    if (!report) {
      throw new Error('You have to add a report!')
    }
    this.addReport(report)
  }

  constructor(id: string, public reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  addReport(report: string) {
    this.reports.push(report)
    this.lastReport = report
  }

  printReports() {
    console.log(this.reports);
  }

  describe() {
    console.log(`Accounting Department (${this.id}): ${this.name}`)
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance
    }
    this.instance = new AccountingDepartment('D2', [])
    return this.instance
  }
}

const employee = Department.createEmployee('Horst')


const it_dep = new ITDepartment('D1', ['Max'])
it_dep.addEmployee('Tobias')
it_dep.addEmployee('Felix')
it_dep.addEmployee('Matthias')
it_dep.addEmployee('Max')

it_dep.describe()
it_dep.printEmployeeInformation()


// const accounting = new AccountingDepartment('D2', [])
const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()
console.log(accounting, accounting2);


accounting.mostRecentReport = 'Year End Report'
accounting.addReport('Sent wage to all employees.')
accounting.addEmployee('Michelle')
accounting.addEmployee('Anja')


console.log(accounting.mostRecentReport)

accounting.describe()
// accounting.printEmployeeInformation()
// accounting.printReports()


// const accountingCopy = { name: 'DUMMY', describe: accounting.describe }

// accountingCopy.describe()