import { EmployeeManager } from "./EmployeeManager";

const page = new EmployeeManager("chrome");

const employees = [

    {
        "employee_id": 29982246,
        "employee_name": "Yulia Barbash",
        "employee_phone": "93918734",
        "employee_email": "myemail@gmail.com",
        "employee_title": "Customer Support"
    },
    {
        "employee_id": 25,
        "employee_name": "Mathew Man",
        "employee_phone": "8643798564",
        "employee_email": "greetman@gmail.com",
        "employee_title": "Intern"
    },
    {
        "employee_id": 29982247,
        "employee_name": "Fiddy Cent",
        "employee_phone": "1234201304",
        "employee_email": "dreerd2004@yahoo.com",
        "employee_title": "New Employee"
    },
    {
        "employee_id": 4300,
        "employee_name": "Megan Smith",
        "employee_phone": "8005882300",
        "employee_email": "meganSmith@empire.com",
        "employee_title": "Empire"
    },
    {
        "employee_id": 29982248,
        "employee_name": "Stu Dawg",
        "employee_phone": "9999999999",
        "employee_email": "abc@yougotmail.nyc",
        "employee_title": "One of the GOATS of mentors"
    },
    {
        "employee_id": 300000,
        "employee_name": "Greg Bush",
        "employee_phone": "746389033",
        "employee_email": "great@gmail.com",
        "employee_title": "Specialist"
    },
    {
        "employee_id": 155612,
        "employee_name": "Jeff Winge",
        "employee_phone": "1251261278",
        "employee_email": "jwinger@gmail.com",
        "employee_title": "Greendale Professor of Law"
    },
    {
        "employee_id": 231,
        "employee_name": "Dimitri Blaiddyd",
        "employee_phone": "2815555555",
        "employee_email": "dimblad44@yahoo.com",
        "employee_title": "King of Faerghus"
    },
    {
        "employee_id": 200,
        "employee_name": "Mikal Zibanejad",
        "employee_phone": "8018018011",
        "employee_email": "zibs@nyrangers.com",
        "employee_title": "Center"
    },

];
  


    describe("checking that the UI matches the DB", () => {
        beforeEach(async () => await page.navigate());
        afterAll(async () => await page.driver.quit());
        for (let i = 0; i < employees.length; i++) {
          test(`Looking for ${employees[i].employee_name} in the UI`, async () => {
            await page.selectEmployee(employees[i].employee_name);
            let employee = await page.getCurrentEmployee();
            expect(employee.id).toEqual(employees[i].employee_id.toString());
            expect(employee.name).toEqual(employees[i].employee_name);
            expect(employee.phone.toString()).toEqual(employees[i].employee_phone);
            expect(employee.email).toEqual(employees[i].employee_email);
            expect(employee.title).toEqual(employees[i].employee_title);
          });
        }
      });