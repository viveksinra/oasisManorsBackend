import { AuthService } from "./auth.service";
import { CustomerService } from "./customer.service";
import {ProspectService} from "./prospect.service"
import {EmployeeService} from "./employee.service"
import {ResidentService} from "./resident.service"
import {MedicationService} from "./medication.service"

import { API_ENDPOINT } from "../utils/index";

export const authService = new AuthService(API_ENDPOINT);
export const customerService = new CustomerService(API_ENDPOINT);
export const prospectService = new ProspectService(API_ENDPOINT);
export const employeeService = new EmployeeService(API_ENDPOINT);
export const residentService = new ResidentService(API_ENDPOINT);
export const medicationService = new MedicationService(API_ENDPOINT);

