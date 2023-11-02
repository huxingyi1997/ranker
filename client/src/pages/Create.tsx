import React, { useState } from 'react';

import { AppPage, actions } from '../store';
import CountSelector from '../components/ui/CountSelector';
import { pollsApiInterface } from '../api';

const Create: React.FC = () => {
  const [pollTopic, setPollTopic] = useState<string>('');
  const [maxVotes, setMaxVotes] = useState<number>(3);
  const [name, setName] = useState<string>('');

  const [apiError, setApiError] = useState<string>('');

  const areFieldsValid = (): boolean => {
    if (pollTopic.length < 1 || pollTopic.length > 100) {
      return false;
    }

    if (maxVotes < 1 || maxVotes > 5) {
      return false;
    }

    if (name.length < 1 || name.length > 25) {
      return false;
    }

    return true;
  };

  const handleCreatePoll = async () => {
    actions.startLoading();
    setApiError('');

    const res = await pollsApiInterface.pollsControllerCreate({
      topic: pollTopic,
      votesPerVoter: maxVotes,
      name,
    });
    const { data, error_msg, error } = res.data;

    console.log(data, error);

    if (error_msg && error === 400) {
      console.log('400 error', error_msg);
      setApiError(error_msg);
    } else if (error_msg && error !== 400) {
      setApiError(error_msg || '');
    } else if (data) {
      actions.initializePoll(data.poll);
      actions.setPollAccessToken(data.accessToken);
      actions.setPage(AppPage.WaitingRoom);
    }

    actions.stopLoading();
  };

  return (
    <div className="flex flex-col w-full justify-around items-stretch h-full mx-auto max-w-sm">
      <div className="mb-12">
        <h3 className="text-center">Enter Poll Topic</h3>
        <div className="text-center w-full">
          <input
            maxLength={100}
            onChange={(e) => setPollTopic(e.target.value)}
            className="box info w-full"
          />
        </div>

        <h3 className="text-center mt-4 mb-2">Votes Per Participant</h3>
        <div className="w-48 mx-auto my-4">
          <CountSelector
            min={1}
            max={5}
            initial={3}
            step={1}
            onChange={(val) => setMaxVotes(val)}
          />
        </div>

        <div className="mb-12">
          <h3 className="text-center">Enter Name</h3>
          <div className="text-center w-full">
            <input
              maxLength={25}
              onChange={(e) => setName(e.target.value)}
              className="box info w-full"
            />
          </div>
        </div>

        {apiError && (
          <p className="text-center text-red-600 font-light mt-8">{apiError}</p>
        )}

        <div className="flex flex-col justify-center items-center">
          <button
            className="box btn-orange w-32 my-2"
            onClick={handleCreatePoll}
            disabled={!areFieldsValid()}
          >
            Create
          </button>
          <button
            className="box btn-purple w-32 my-2"
            onClick={() => actions.startOver()}
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
