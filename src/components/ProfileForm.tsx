// import { useState, useEffect } from 'react';
// import { UserProfile } from '@/types/user';
// import { useNavigate } from 'react-router-dom';

// interface ProfileFormProps {
//   initialData?: UserProfile;
//   onSubmit: (data: UserProfile) => void;
//   isEditing?: boolean;
// }

// const ProfileForm = ({ initialData, onSubmit, isEditing = false }: ProfileFormProps) => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState<'parent' | 'child' | 'adhd'>('parent');
//   const [formData, setFormData] = useState<UserProfile>(initialData || {
//     parentInfo: {
//       name: '',
//       age: 0,
//       dob: '',
//       profession: '',
//       isSingleParent: false,
//       singleParentRole: undefined,
//       bothParentsWork: false,
//       workingParent: undefined,
//       primaryCaregiver: 'mother',
//       numberOfChildren: 1,
//       planningNextChild: false,
//     },
//     childInfo: {
//       name: '',
//       age: 0,
//       isAdopted: false,
//       dob: '',
//       gender: 'male',
//     },
//     adhdAndAutismInfo: {
//       hasCondition: false,
//       consultedDoctor: false,
//       respondsToAffection: { response: '', level: 'medium' },
//       developmentalMilestones: { description: '', level: 'medium' },
//       behavioralPatterns: { description: '', level: 'medium' },
//       toiletingCommunication: { description: '', level: 'medium' },
//       hyperactiveBehaviors: { description: '', level: 'medium' },
//       impulsiveBehaviors: { description: '', level: 'medium' },
//       socialInteractions: { description: '', level: 'medium' },
//       eyeContact: { description: '', level: 'medium' },
//       physicalBehavior: { description: '', level: 'medium' },
//       socialCommunication: { description: '', level: 'medium' },
//       primaryCaregiver: '',
//       dailyRoutine: { description: '', level: 'medium' },
//       diet: { description: '', level: 'medium' },
//     }
//   });

//   const handleInputChange = (
//     section: keyof UserProfile,
//     field: string,
//     value: any,
//     subField?: string
//   ) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: subField
//           ? { ...(prev[section] as any)[field], [subField]: value }
//           : value,
//       },
//     }));
//   };

//   const handleNext = () => {
//     if (currentStep === 'parent') {
//       // Validate parent info
//       if (!formData.parentInfo.name || !formData.parentInfo.age || !formData.parentInfo.dob) {
//         alert('Please fill in all required parent information fields');
//         return;
//       }
//       // Move to child info
//       setCurrentStep('child');
//     } else if (currentStep === 'child') {
//       // Validate child info
//       if (!formData.childInfo.name || !formData.childInfo.age || !formData.childInfo.dob) {
//         alert('Please fill in all required child information fields');
//         return;
//       }
//       // Move to ADHD info
//       setCurrentStep('adhd');
//     }
//   };

//   const handleBack = () => {
//     if (currentStep === 'child') {
//       setCurrentStep('parent');
//     } else if (currentStep === 'adhd') {
//       setCurrentStep('child');
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Only submit if we're on the ADHD step
//     if (currentStep === 'adhd') {
//       // Validate ADHD info
//       if (!formData.adhdAndAutismInfo.primaryCaregiver) {
//         alert('Please fill in all required ADHD information fields');
//         return;
//       }
      
//       // Submit the complete form data
//       onSubmit(formData);
//     } else {
//       // If not on ADHD step, move to next step
//       handleNext();
//     }
//   };

//   // Prevent accidental navigation
//   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//     e.preventDefault();
//     e.returnValue = '';
//   };

//   useEffect(() => {
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   const renderInputField = (
//     section: keyof UserProfile,
//     field: string,
//     label: string,
//     type: string = 'text',
//     options?: { value: string; label: string }[],
//     subField?: string,
//     required: boolean = true
//   ) => {
//     const value = subField 
//       ? (formData[section] as any)[field][subField]
//       : (formData[section] as any)[field];

//     const inputId = `${section}-${field}${subField ? `-${subField}` : ''}`;

//     if (type === 'select' && options) {
//       return (
//         <div className="space-y-2">
//           <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
//             {label}
//             {required && <span className="text-red-500 ml-1">*</span>}
//           </label>
//           <select
//             id={inputId}
//             value={value}
//             onChange={(e) => handleInputChange(section, field, e.target.value, subField)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required={required}
//             aria-label={label}
//           >
//             {options.map(option => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>
//       );
//     }

//     if (type === 'textarea') {
//       return (
//         <div className="space-y-2">
//           <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
//             {label}
//             {required && <span className="text-red-500 ml-1">*</span>}
//           </label>
//           <textarea
//             id={inputId}
//             value={value}
//             onChange={(e) => handleInputChange(section, field, e.target.value, subField)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             rows={3}
//             required={required}
//             aria-label={label}
//           />
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-2">
//         <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//         <input
//           id={inputId}
//           type={type}
//           value={value}
//           onChange={(e) => handleInputChange(
//             section, 
//             field, 
//             type === 'number' ? parseInt(e.target.value) || 0 : e.target.value,
//             subField
//           )}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           required={required}
//           aria-label={label}
//         />
//       </div>
//     );
//   };

//   const renderRadioGroup = (
//     section: keyof UserProfile,
//     field: string,
//     label: string,
//     options: { value: string; label: string }[],
//     subField: string,
//     required: boolean = true
//   ) => {
//     const currentValue = (formData[section] as any)[field][subField];
//     const groupId = `${section}-${field}-${subField}`;
    
//     return (
//       <div className="space-y-2" role="radiogroup" aria-labelledby={`${groupId}-label`}>
//         <label id={`${groupId}-label`} className="block text-sm font-medium text-gray-700">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//         <div className="flex space-x-4">
//           {options.map(option => (
//             <label key={option.value} className="inline-flex items-center">
//               <input
//                 type="radio"
//                 name={groupId}
//                 value={option.value}
//                 checked={currentValue === option.value}
//                 onChange={() => handleInputChange(section, field, option.value, subField)}
//                 className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
//                 required={required}
//                 aria-label={`${label} - ${option.label}`}
//               />
//               <span className="ml-2">{option.label}</span>
//             </label>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const renderParentInfo = () => (
//     <div className="space-y-6">
//       <h3 className="text-lg font-medium text-gray-900">Parent Information</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {renderInputField('parentInfo', 'name', 'Name')}
//         {renderInputField('parentInfo', 'age', 'Age', 'number')}
//         {renderInputField('parentInfo', 'dob', 'Date of Birth', 'date')}
//         {renderInputField('parentInfo', 'profession', 'Profession')}
        
//         {renderInputField(
//           'parentInfo', 
//           'isSingleParent', 
//           'Are you a single parent?', 
//           'select', 
//           [
//             { value: 'false', label: 'No' },
//             { value: 'true', label: 'Yes' }
//           ]
//         )}

//         {formData.parentInfo.isSingleParent && renderInputField(
//           'parentInfo',
//           'singleParentRole',
//           'Are you the mother or father?',
//           'select',
//           [
//             { value: 'mother', label: 'Mother' },
//             { value: 'father', label: 'Father' }
//           ]
//         )}

//         {renderInputField(
//           'parentInfo', 
//           'bothParentsWork', 
//           'Do both parents work?', 
//           'select', 
//           [
//             { value: 'false', label: 'No' },
//             { value: 'true', label: 'Yes' }
//           ]
//         )}

//         {!formData.parentInfo.bothParentsWork && renderInputField(
//           'parentInfo',
//           'workingParent',
//           'Who works?',
//           'select',
//           [
//             { value: 'father', label: 'Father' },
//             { value: 'mother', label: 'Mother' }
//           ]
//         )}

//         {renderInputField(
//           'parentInfo',
//           'primaryCaregiver',
//           'Who spends maximum time with the child?',
//           'select',
//           [
//             { value: 'mother', label: 'Mother' },
//             { value: 'father', label: 'Father' },
//             { value: 'guardian', label: 'Guardian' }
//           ]
//         )}

//         {renderInputField('parentInfo', 'numberOfChildren', 'How many children do you have?', 'number')}

//         {renderInputField(
//           'parentInfo', 
//           'planningNextChild', 
//           'Are you planning for next child?', 
//           'select', 
//           [
//             { value: 'false', label: 'No' },
//             { value: 'true', label: 'Yes' }
//           ]
//         )}
//       </div>
//     </div>
//   );

//   const renderChildInfo = () => (
//     <div className="space-y-6">
//       <h3 className="text-lg font-medium text-gray-900">Child Information</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {renderInputField('childInfo', 'name', 'Child\'s Name')}
//         {renderInputField('childInfo', 'age', 'Child\'s Age', 'number')}
//         {renderInputField('childInfo', 'dob', 'Child\'s Date of Birth', 'date')}
        
//         {renderInputField(
//           'childInfo',
//           'gender',
//           'Child\'s Gender',
//           'select',
//           [
//             { value: 'male', label: 'Male' },
//             { value: 'female', label: 'Female' }
//           ]
//         )}

//         {renderInputField(
//           'childInfo', 
//           'isAdopted', 
//           'Is the child adopted?', 
//           'select', 
//           [
//             { value: 'false', label: 'No' },
//             { value: 'true', label: 'Yes' }
//           ]
//         )}
//       </div>
//     </div>
//   );

//   const renderADHDAndAutismInfo = () => {
//     const levelOptions = [
//       { value: 'high', label: 'High' },
//       { value: 'medium', label: 'Medium' },
//       { value: 'low', label: 'Low' }
//     ];

//     return (
//       <div className="space-y-6">
//         <h3 className="text-lg font-medium text-gray-900">ADHD and Autism Information</h3>
//         <div className="grid grid-cols-1 gap-6">
//           {renderInputField(
//             'adhdAndAutismInfo', 
//             'hasCondition', 
//             'Do you know your child has a condition like ADHD or Autism?', 
//             'select', 
//             [
//               { value: 'false', label: 'No' },
//               { value: 'true', label: 'Yes' }
//             ]
//           )}

//           {renderInputField(
//             'adhdAndAutismInfo', 
//             'consultedDoctor', 
//             'Have you consulted with a doctor?', 
//             'select', 
//             [
//               { value: 'false', label: 'No' },
//               { value: 'true', label: 'Yes' }
//             ]
//           )}

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Response to Affection and Comfort</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'respondsToAffection',
//               'How does your child respond to affection and comfort?',
//               'textarea',
//               undefined,
//               'response'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'respondsToAffection',
//               'Response Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Developmental Milestones</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'developmentalMilestones',
//               'When did your child reach developmental milestones?',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'developmentalMilestones',
//               'Milestones Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Behavioral Patterns</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'behavioralPatterns',
//               'What behavioral patterns have you noticed in your child?',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'behavioralPatterns',
//               'Behavioral Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Toileting Communication</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'toiletingCommunication',
//               'How does your child communicate toileting needs?',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'toiletingCommunication',
//               'Communication Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Hyperactive Behaviors</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'hyperactiveBehaviors',
//               'Does your child display hyperactive behaviors?',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'hyperactiveBehaviors',
//               'Hyperactivity Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Impulsive Behaviors</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'impulsiveBehaviors',
//               'Does your child display impulsive behaviors?',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'impulsiveBehaviors',
//               'Impulsivity Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Social Interactions</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'socialInteractions',
//               'How does your child engage in social interactions?',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'socialInteractions',
//               'Social Interaction Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Eye Contact</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'eyeContact',
//               'How does your child make eye contact?',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'eyeContact',
//               'Eye Contact Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Physical Behavior</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'physicalBehavior',
//               'Describe your child\'s physical behavior in daily situations',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'physicalBehavior',
//               'Physical Behavior Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Social Communication</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'socialCommunication',
//               'How does your child communicate socially?',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'socialCommunication',
//               'Communication Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           {renderInputField(
//             'adhdAndAutismInfo',
//             'primaryCaregiver',
//             'Who spends the most time with your child?'
//           )}

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Daily Routine</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'dailyRoutine',
//               'Describe your child\'s daily routine',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'dailyRoutine',
//               'Routine Consistency Level',
//               levelOptions,
//               'level'
//             )}
//           </div>

//           <div className="space-y-4">
//             <h4 className="font-medium text-gray-900">Diet</h4>
//             {renderInputField(
//               'adhdAndAutismInfo',
//               'diet',
//               'Describe your child\'s diet',
//               'textarea',
//               undefined,
//               'description'
//             )}
//             {renderRadioGroup(
//               'adhdAndAutismInfo',
//               'diet',
//               'Diet Consistency Level',
//               levelOptions,
//               'level'
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderStepIndicator = () => (
//     <div className="flex items-center justify-center mb-8">
//       <div className="flex items-center">
//         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//           currentStep === 'parent' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
//         }`}>
//           1
//         </div>
//         <div className={`w-16 h-1 ${
//           currentStep === 'child' || currentStep === 'adhd' ? 'bg-indigo-600' : 'bg-gray-200'
//         }`}></div>
//         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//           currentStep === 'child' ? 'bg-indigo-600 text-white' : 
//           currentStep === 'adhd' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
//         }`}>
//           2
//         </div>
//         <div className={`w-16 h-1 ${
//           currentStep === 'adhd' ? 'bg-indigo-600' : 'bg-gray-200'
//         }`}></div>
//         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//           currentStep === 'adhd' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
//         }`}>
//           3
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {renderStepIndicator()}
      
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900 text-center">
//           {currentStep === 'parent' && 'Parent Information'}
//           {currentStep === 'child' && 'Child Information'}
//           {currentStep === 'adhd' && 'ADHD & Autism Information'}
//         </h2>
//       </div>

//       <form onSubmit={handleSubmit} noValidate>
//         {currentStep === 'parent' && renderParentInfo()}
//         {currentStep === 'child' && renderChildInfo()}
//         {currentStep === 'adhd' && renderADHDAndAutismInfo()}
        
//         <div className="mt-6 flex justify-between space-x-4">
//           <div>
//             {currentStep !== 'parent' && (
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
//               >
//                 Back
//               </button>
//             )}
//           </div>
//           <div>
//             {currentStep !== 'adhd' ? (
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//               >
//                 Next Step
//               </button>
//             ) : (
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//               >
//                 Complete Profile
//               </button>
//             )}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfileForm;


import { useState } from 'react';
import { UserProfile } from '@/types/user';

interface ProfileFormProps {
  initialData?: UserProfile;
  onSubmit: (data: UserProfile) => void;
  isEditing?: boolean;
}

const ProfileForm = ({ initialData, onSubmit, isEditing = false }: ProfileFormProps) => {
  const [activeTab, setActiveTab] = useState<'parent' | 'child' | 'adhd'>('parent');
  const [formData, setFormData] = useState<UserProfile>(initialData || {
    parentInfo: {
      name: '',
      age: 0,
      dob: '',
      profession: '',
      isSingleParent: false,
      singleParentRole: undefined,
      bothParentsWork: false,
      workingParent: undefined,
      primaryCaregiver: 'mother',
      numberOfChildren: 1,
      planningNextChild: false,
    },
    childInfo: {
      name: '',
      age: 0,
      isAdopted: false,
      dob: '',
      gender: 'male',
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
      socialCommunication: { description: '', level: 'medium' },
      primaryCaregiver: '',
      dailyRoutine: { description: '', level: 'medium' },
      diet: { description: '', level: 'medium' },
    }
  });

  const handleInputChange = (
    section: keyof UserProfile,
    field: string,
    value: any,
    subField?: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: subField
          ? { ...(prev[section] as any)[field], [subField]: value }
          : value,
      },
    }));
  };

  const renderInputField = (
    section: keyof UserProfile,
    field: string,
    label: string,
    type: string = 'text',
    options?: { value: string; label: string }[],
    subField?: string,
    required: boolean = true
  ) => {
    const value = subField 
      ? (formData[section] as any)[field][subField]
      : (formData[section] as any)[field];

    const inputId = `${section}-${field}${subField ? `-${subField}` : ''}`;

    if (type === 'select' && options) {
      return (
        <div className="space-y-2">
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            id={inputId}
            value={value}
            onChange={(e) => handleInputChange(section, field, e.target.value, subField)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required={required}
            aria-label={label}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div className="space-y-2">
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            id={inputId}
            value={value}
            onChange={(e) => handleInputChange(section, field, e.target.value, subField)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required={required}
            aria-label={label}
          />
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => handleInputChange(
            section, 
            field, 
            type === 'number' ? parseInt(e.target.value) || 0 : e.target.value,
            subField
          )}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required={required}
          aria-label={label}
        />
      </div>
    );
  };

  const renderRadioGroup = (
    section: keyof UserProfile,
    field: string,
    label: string,
    options: { value: string; label: string }[],
    subField: string,
    required: boolean = true
  ) => {
    const currentValue = (formData[section] as any)[field][subField];
    const groupId = `${section}-${field}-${subField}`;
    
    return (
      <div className="space-y-2" role="radiogroup" aria-labelledby={`${groupId}-label`}>
        <label id={`${groupId}-label`} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex space-x-4">
          {options.map(option => (
            <label key={option.value} className="inline-flex items-center">
              <input
                type="radio"
                name={groupId}
                value={option.value}
                checked={currentValue === option.value}
                onChange={() => handleInputChange(
                  section, 
                  field, 
                  { ...(formData[section] as any)[field], [subField]: option.value }
                )}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                required={required}
                aria-label={`${label} - ${option.label}`}
              />
              <span className="ml-2">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderParentInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Parent Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInputField('parentInfo', 'name', 'Name')}
        {renderInputField('parentInfo', 'age', 'Age', 'number')}
        {renderInputField('parentInfo', 'dob', 'Date of Birth', 'date')}
        {renderInputField('parentInfo', 'profession', 'Profession')}
        
        {renderInputField(
          'parentInfo', 
          'isSingleParent', 
          'Are you a single parent?', 
          'select', 
          [
            { value: 'false', label: 'No' },
            { value: 'true', label: 'Yes' }
          ]
        )}

        {formData.parentInfo.isSingleParent && renderInputField(
          'parentInfo',
          'singleParentRole',
          'Are you the mother or father?',
          'select',
          [
            { value: 'mother', label: 'Mother' },
            { value: 'father', label: 'Father' }
          ]
        )}

        {renderInputField(
          'parentInfo', 
          'bothParentsWork', 
          'Do both parents work?', 
          'select', 
          [
            { value: 'false', label: 'No' },
            { value: 'true', label: 'Yes' }
          ]
        )}

        {!formData.parentInfo.bothParentsWork && renderInputField(
          'parentInfo',
          'workingParent',
          'Who works?',
          'select',
          [
            { value: 'father', label: 'Father' },
            { value: 'mother', label: 'Mother' }
          ]
        )}

        {renderInputField(
          'parentInfo',
          'primaryCaregiver',
          'Who spends maximum time with the child?',
          'select',
          [
            { value: 'mother', label: 'Mother' },
            { value: 'father', label: 'Father' },
            { value: 'guardian', label: 'Guardian' }
          ]
        )}

        {renderInputField('parentInfo', 'numberOfChildren', 'How many children do you have?', 'number')}

        {renderInputField(
          'parentInfo', 
          'planningNextChild', 
          'Are you planning for next child?', 
          'select', 
          [
            { value: 'false', label: 'No' },
            { value: 'true', label: 'Yes' }
          ]
        )}
      </div>
    </div>
  );

  const renderChildInfo = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Child Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInputField('childInfo', 'name', 'Child\'s Name')}
        {renderInputField('childInfo', 'age', 'Child\'s Age', 'number')}
        {renderInputField('childInfo', 'dob', 'Child\'s Date of Birth', 'date')}
        
        {renderInputField(
          'childInfo',
          'gender',
          'Child\'s Gender',
          'select',
          [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' }
          ]
        )}

        {renderInputField(
          'childInfo', 
          'isAdopted', 
          'Is the child adopted?', 
          'select', 
          [
            { value: 'false', label: 'No' },
            { value: 'true', label: 'Yes' }
          ]
        )}
      </div>
    </div>
  );

  const renderADHDAndAutismInfo = () => {
    const levelOptions = [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' }
    ];

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">ADHD and Autism Information</h3>
        <div className="grid grid-cols-1 gap-6">
          {renderInputField(
            'adhdAndAutismInfo', 
            'hasCondition', 
            'Do you know your child has a condition like ADHD or Autism?', 
            'select', 
            [
              { value: 'false', label: 'No' },
              { value: 'true', label: 'Yes' }
            ]
          )}

          {renderInputField(
            'adhdAndAutismInfo', 
            'consultedDoctor', 
            'Have you consulted with a doctor?', 
            'select', 
            [
              { value: 'false', label: 'No' },
              { value: 'true', label: 'Yes' }
            ]
          )}

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Response to Affection and Comfort</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'respondsToAffection',
              'How does your child respond to affection and comfort?',
              'textarea',
              undefined,
              'response'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'respondsToAffection',
              'Response Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Developmental Milestones</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'developmentalMilestones',
              'When did your child reach developmental milestones?',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'developmentalMilestones',
              'Milestones Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Behavioral Patterns</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'behavioralPatterns',
              'What behavioral patterns have you noticed in your child?',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'behavioralPatterns',
              'Behavioral Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Toileting Communication</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'toiletingCommunication',
              'How does your child communicate toileting needs?',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'toiletingCommunication',
              'Communication Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Hyperactive Behaviors</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'hyperactiveBehaviors',
              'Does your child display hyperactive behaviors?',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'hyperactiveBehaviors',
              'Hyperactivity Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Impulsive Behaviors</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'impulsiveBehaviors',
              'Does your child display impulsive behaviors?',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'impulsiveBehaviors',
              'Impulsivity Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Social Interactions</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'socialInteractions',
              'How does your child engage in social interactions?',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'socialInteractions',
              'Social Interaction Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Eye Contact</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'eyeContact',
              'How does your child make eye contact?',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'eyeContact',
              'Eye Contact Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Physical Behavior</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'physicalBehavior',
              'Describe your child\'s physical behavior in daily situations',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'physicalBehavior',
              'Physical Behavior Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Social Communication</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'socialCommunication',
              'How does your child communicate socially?',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'socialCommunication',
              'Communication Level',
              levelOptions,
              'level'
            )}
          </div>

          {renderInputField(
            'adhdAndAutismInfo',
            'primaryCaregiver',
            'Who spends the most time with your child?'
          )}

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Daily Routine</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'dailyRoutine',
              'Describe your child\'s daily routine',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'dailyRoutine',
              'Routine Consistency Level',
              levelOptions,
              'level'
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Diet</h4>
            {renderInputField(
              'adhdAndAutismInfo',
              'diet',
              'Describe your child\'s diet',
              'textarea',
              undefined,
              'description'
            )}
            {renderRadioGroup(
              'adhdAndAutismInfo',
              'diet',
              'Diet Consistency Level',
              levelOptions,
              'level'
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <nav className="flex space-x-4">
          {(['parent', 'child', 'adhd'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-md ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab === 'parent' && 'Parent Info'}
              {tab === 'child' && 'Child Info'}
              {tab === 'adhd' && 'ADHD & Autism Info'}
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}>
        {activeTab === 'parent' && renderParentInfo()}
        {activeTab === 'child' && renderChildInfo()}
        {activeTab === 'adhd' && renderADHDAndAutismInfo()}

        <div className="mt-6 flex justify-end space-x-4">
          {activeTab !== 'adhd' ? (
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'parent') setActiveTab('child');
                else if (activeTab === 'child') setActiveTab('adhd');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {isEditing ? 'Finish & Update Profile' : 'Finish & Save Profile'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;