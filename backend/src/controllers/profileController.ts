import { Request, Response } from 'express';
import UserProfile from '../models/UserProfile';
import mongoose from 'mongoose';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    console.log('User ID from request:', userId);
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    try {
      console.log('Fetching profile for user:', userId);
      let profile = await UserProfile.findOne({ 
        userId: new mongoose.Types.ObjectId(userId) 
      });

      if (!profile) {
        console.log('No profile found, creating default profile');
        profile = await UserProfile.create({
          userId: new mongoose.Types.ObjectId(userId),
          parentInfo: {
            name: '',
            age: 0,
            dob: '',
            profession: '',
            isSingleParent: false,
            bothParentsWork: false,
            primaryCaregiver: 'mother',
            numberOfChildren: 1,
            planningNextChild: false
          },
          childInfo: {
            name: '',
            age: 0,
            isAdopted: false,
            dob: '',
            gender: 'male'
          },
          adhdAndAutismInfo: {
            hasCondition: false,
            consultedDoctor: false,
            respondsToAffection: { response: '', level: 'medium' },
            developmentalMilestones: { description: '', level: 'medium' },
            behavioralPatterns: { description: '', level: 'medium' },
            toiletingCommunication: { description: '', level: 'medium' },
            hyperactiveBehaviors: { description: '', level: 'medium' },
            impulsiveBehaviors: { description: '', level: 'medium' },
            socialInteractions: { description: '', level: 'medium' },
            eyeContact: { description: '', level: 'medium' },
            physicalBehavior: { description: '', level: 'medium' },
            socialCommunication: { description: '', level: 'medium' }
          }
        });
        console.log('Created default profile:', profile);
      }

      return res.json({ profile });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return res.status(500).json({
        message: 'Database error',
        error: process.env.NODE_ENV === 'development' ? dbError.message : 'Internal server error'
      });
    }
  } catch (error: any) {
    console.error('Profile controller error:', error);
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found' });
    }

    console.log('Updating profile for user:', userId);
    console.log('Update data:', req.body);

    try {
      const profileData = req.body;
      let profile = await UserProfile.findOne({ userId: new mongoose.Types.ObjectId(userId) });

      if (profile) {
        profile = await UserProfile.findOneAndUpdate(
          { userId: new mongoose.Types.ObjectId(userId) },
          { $set: profileData },
          { new: true, runValidators: true }
        );
      } else {
        profile = await UserProfile.create({
          userId: new mongoose.Types.ObjectId(userId),
          ...profileData
        });
      }

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      return res.json({ profile });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return res.status(500).json({
        message: 'Database error',
        error: process.env.NODE_ENV === 'development' ? dbError.message : 'Internal server error'
      });
    }
  } catch (error: any) {
    console.error('Profile update error:', error);
    res.status(500).json({
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};