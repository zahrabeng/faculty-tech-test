export interface mergedData {
  projects: {
      id: string,
      clientId : string, 
      employeeIds: string[],
      contract: {
        startDate: string,
        endDate: string,
        size: string
      }
    }
    clients:{
        id:string,
        name:string
    }
    employees: {
        id:string, 
        name:string, 
        role:string, 
        avatar:string
    }
}