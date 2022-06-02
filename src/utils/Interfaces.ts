export interface mergedData {
  projects: [
    {
      id: string;
      clientId: string;
      employeeIds: string[];
      contract: {
        startDate: string;
        endDate: string;
        size: string;
      };
    }
  ];

  clients: [
    {
      id: string;
      name: string;
    }
  ];
  employees: [
    {
      id: string;
      name: string;
      role: string;
      avatar: string;
    }
  ];
}

export interface singleProject {
  projectId: string;
  client: string;
  employees: (string | undefined)[];
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

export interface client{
  id: string;
  name: string;
}

export interface employees{
  id: string;
  name: string;
  role: string;
  avatar: string;
}