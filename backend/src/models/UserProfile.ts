import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId;
  parentInfo: {
    name: string;
    age: number;
    dob: string;
    profession: string;
    isSingleParent: boolean;
    singleParentRole?: 'mother' | 'father';
    bothParentsWork: boolean;
    workingParent?: 'father' | 'mother';
    primaryCaregiver: 'mother' | 'father' | 'guardian';
    numberOfChildren: number;
    planningNextChild: boolean;
  };
  childInfo: {
    name: string;
    age: number;
    isAdopted: boolean;
    dob: string;
    gender: 'male' | 'female';
  };
  adhdAndAutismInfo: {
    hasCondition: boolean;
    consultedDoctor: boolean;
    respondsToAffection: {
      response: string;
      level: 'high' | 'medium' | 'low';
    };
    developmentalMilestones: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    behavioralPatterns: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    toiletingCommunication: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    hyperactiveBehaviors: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    impulsiveBehaviors: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    socialInteractions: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    eyeContact: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    physicalBehavior: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    socialCommunication: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    primaryCaregiver: string;
    dailyRoutine: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
    diet: {
      description: string;
      level: 'high' | 'medium' | 'low';
    };
  };
}

const UserProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  parentInfo: {
    name: { type: String, default: '' },
    age: { type: Number, default: 0 },
    dob: { type: String, default: '' },
    profession: { type: String, default: '' },
    isSingleParent: { type: Boolean, default: false },
    singleParentRole: { type: String, enum: ['mother', 'father'] },
    bothParentsWork: { type: Boolean, default: false },
    workingParent: { type: String, enum: ['father', 'mother'] },
    primaryCaregiver: { type: String, enum: ['mother', 'father', 'guardian'], default: 'mother' },
    numberOfChildren: { type: Number, default: 1 },
    planningNextChild: { type: Boolean, default: false }
  },
  childInfo: {
    name: { type: String, default: '' },
    age: { type: Number, default: 0 },
    isAdopted: { type: Boolean, default: false },
    dob: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female'], default: 'male' }
  },
  adhdAndAutismInfo: {
    hasCondition: { type: Boolean, required: true },
    consultedDoctor: { type: Boolean, required: true },
    respondsToAffection: {
      response: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    developmentalMilestones: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    behavioralPatterns: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    toiletingCommunication: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    hyperactiveBehaviors: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    impulsiveBehaviors: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    socialInteractions: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    eyeContact: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    physicalBehavior: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    socialCommunication: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    primaryCaregiver: { type: String, default: 'mother' },
    dailyRoutine: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    },
    diet: {
      description: { type: String, default: '' },
      level: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema); 