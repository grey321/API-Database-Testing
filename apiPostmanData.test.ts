import { EmployeeManager } from "./EmployeeManager";

const page = new EmployeeManager("chrome");

describe("checking that the UI matches the DB", () => {
  beforeEach(async () => await page.navigate());
  afterAll(async () => await page.driver.quit());
  test("checking employees from an api call", async () => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: "https://peaceful-inlet-88854.herokuapp.com/api/employees",
      headers: {},
    };

    return axios(config)
      .then(async function (response) {
        let employees = response.data;
        for (let i = 0; i < employees.length; i++) {
          await page.selectEmployee(employees[i].employee_name);
          let employee = await page.getCurrentEmployee();
          expect(employee.id).toEqual(employees[i].employee_id.toString());
          expect(employee.name).toEqual(employees[i].employee_name);
          expect(employee.phone.toString()).toEqual(
            employees[i].employee_phone
          );
          expect(employee.email).toEqual(employees[i].employee_email);
          expect(employee.title).toEqual(employees[i].employee_title);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});