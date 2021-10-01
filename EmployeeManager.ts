import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
  } from "selenium-webdriver";
  import { BasePage } from "./ObjPageBase";
  
/**Listed below are all asyncs and methods used to create the user accounts */

  export interface Employee {
    name: string;
    phone: number;
    email: string;
    title: string;
  }
  
  export class EmployeeManager extends BasePage {
    searchBox: By = By.name("searchBox");
    listContainer: By = By.className("listContainer");
    listedEmployees: By = By.xpath("//li[contains(@name, 'employee')]");
    addButton: By = By.name("addEmployee");
    cardTitle: By = By.id("employeeTitle");
    idNumber: By = By.id("employeeID");
    nameEntry: By = By.name("nameEntry");
    phoneEntry: By = By.name("phoneEntry");
    emailEntry: By = By.name("emailEntry");
    titleEntry: By = By.name("titleEntry");
    saveButton: By = By.name("save");
    cancelButton: By = By.name("cancel");
    deleteButton: By = By.name("delete");
    constructor(options) {
      super(options);
      this.url =
        "https://devmountain-qa.github.io/employee-manager-v2/build/index.html";
    }
    async navigate() {
      await this.driver.get(this.url);
      await this.driver.wait(
        until.elementIsEnabled(await this.getElement(this.searchBox))
      );
    }
    async searchFor(searchText: string) {
      await this.setInput(this.searchBox, searchText);
    }
    async getEmployeeList() {
      const employeeList: Array<string> = [];
      let list = await this.driver.findElements(this.listedEmployees);
      for (let i = 0; i < list.length; i++) {
        await employeeList.push(await list[i].getText());
      }
      return list;
    }
    async selectEmployee(name: string) {
      await this.click(By.xpath(`//li[text()='${name}']`));
      await this.getElement(this.cardTitle);
      await this.driver.wait(
        until.elementTextContains(await this.getElement(this.cardTitle), name)
      );
    }
    async getCurrentEmployee() {
      let employee = { name: "", phone: 0, email: "", title: "", id: "" };
      employee.name = await this.getAttribute(this.nameEntry, "value");
      employee.phone = parseInt(
        await this.getAttribute(this.phoneEntry, "value"),
        10
      );
      employee.email = await this.getAttribute(this.emailEntry, "value");
      employee.title = await this.getAttribute(this.titleEntry, "value");
      employee.id = (await this.getText(this.idNumber)).slice(4);
      return employee;
    }
    async addEmployee(employee: Employee) {
      await this.click(this.addButton);
      //   await new Promise((res) => setTimeout(res, 500));
      //   await this.searchFor("New Employee");
      //   await new Promise((res) => setTimeout(res, 500));
      await this.selectEmployee("New Employee");
      await this.driver.wait(until.elementLocated(this.cardTitle));
      await this.driver.wait(
        until.elementTextIs(await this.getElement(this.cardTitle), "New Employee")
      );
      await this.setInput(this.nameEntry, employee.name);
      await this.setInput(this.phoneEntry, employee.phone);
      await this.setInput(this.emailEntry, employee.email);
      await this.setInput(this.titleEntry, employee.title);
      await this.click(this.saveButton);
    }
    async deleteEmployee(name: string) {
      await this.selectEmployee(name);
      let record = await this.driver.findElement(
        By.xpath(`//li[text()='${name}']`)
      );
      await this.click(this.deleteButton);
      await this.driver.wait(until.alertIsPresent());
      let alert = await this.driver.switchTo().alert();
      await alert.accept();
      await this.driver.wait(until.stalenessOf(record));
    }
  }