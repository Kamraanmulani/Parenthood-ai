export interface AdhdAndAutismInfo {
  hasCondition: boolean;
  consultedDoctor: boolean;
  socialInteractions: {
    level: number;
    description: string;
  };
  behavioralPatterns: {
    level: number;
    description: string;
  };
  developmentalMilestones: {
    level: number;
    description: string;
  };
}

export interface ParentInfo {
  name: string;
  profession: string;
  isSingleParent: boolean;
  singleParentRole?: string;
}

export interface ChildInfo {
  name: string;
  age: number;
  gender: string;
  isAdopted: boolean;
}

export interface UserProfile {
  parentInfo: ParentInfo;
  childInfo: ChildInfo;
  adhdAndAutismInfo: AdhdAndAutismInfo;
}

export interface User {
  id: string;
  username: string;
  email: string;
  profile?: UserProfile;
}