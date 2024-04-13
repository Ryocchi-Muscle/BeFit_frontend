import React, { useState } from 'react'
import { secureApiCall } from '@/app/utils/api';
import TrainingDay from './TrainingDay';
import TrainingSet from './TrainingSet';
import AddTrainigMenu from './AddTrainigMenu';

export default function TrainingRecord() {
  const [trainingDay, setTrainingDay] = useState(null);
  const [trainingMenu, setTrainingMenu] = useState([]);
  const [trainingSets, setTrainingSets] = useState([]);

  const handleSaveTrainingRecord = async () => {
    const payload = {
      day: trainingDay,
      menu: trainingMenu,
      sets: trainingSets,
    };
    try {
      const response = await secureApiCall('saveTrainingRecord', 'POST', payload)
      console.log('Record saved successfully', response);
    } catch (error) {
      console.log('Error saving record', error);
    }
  };

  return (
    <div>
      {/* <TrainingDay setTrainingDay={setTrainingDay} />
      <AddTrainigMenu setTrainingMenu={setTrainingMenu} />
      <TrainingSet setTrainingSets={setTrainingSets} /> */}
    </div>
  );
}
