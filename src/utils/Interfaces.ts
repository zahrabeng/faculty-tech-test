export interface singleProject {
  projectId: string;
  client: string;
  clientId: string;
  employees: string[];
  startDate: string;
  endDate: string;
  size: string;
}

export interface project {
  id: string;
  clientId: string;
  employeeIds: string[];
  contract: {
    startDate: string;
    endDate: string;
    size: string;
  };
}

export interface client {
  id: string;
  name: string;
}

export interface employees {
  id: string;
  name: string;
  role: string;
  avatar: string;
}
