export type ColleagueResponse = {
  data: {
    colleague: { [key in ColleagueField]?: any };
  };
};

export type ColleagueField =
  | "personNumber"
  | "userId"
  | "jobId"
  | "title"
  | "firstName"
  | "middleName"
  | "lastName"
  | "preferredName"
  | "dateOfBirth"
  | "assignmentName"
  | "assignmentNumber"
  | "assignmentStatus"
  | "primaryAssignmentFlag"
  | "contractType"
  | "contractEndDate"
  | "actualTerminationDate"
  | "legalEntityId"
  | "effectiveStartDate"
  | "effectiveEndDate"
  | "source"
  | "masteredInLegacy"
  | "email"
  | "peopleGroup"
  | "regularTemporary"
  | "fullPartTime"
  | "workerType"
  | "workingAsManager"
  | "managerId"
  | "positionId"
  | "workLevel"
  | "gradeId"
  | "locationId"
  | "locationUUID"
  | "departmentId"
  | "departmentName"
  | "businessUnitId"
  | "addressLine1"
  | "addressLine2"
  | "addressLine3"
  | "region2"
  | "city"
  | "postCode"
  | "country"
  | "workPhoneNumber"
  | "leavingDate"
  | "hireDate"
  | "originalHireDate"
  | "workingHours"
  | "salaryAmount"
  | "defaultExpenseAccount"
  | "frequency"
  | "actionCode"
  | "actionReasonCode"
  | "employmentStatusType";

export type ColleagueBody = {
  query: string;
  variables: { colleagueUUID: string };
  operationName: "Query";
};
