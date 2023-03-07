import React from 'react';

import { Results } from 'shared';

import ResultCard from './ui/ResultCard';
import HorizontalSwipeList from './ui/HorizontalSwipeList';

type ResultsList = {
  results: DeepReadonly<Results>;
};

const ResultsList: React.FC<ResultsList> = ({ results }) => {
  return (
    <div className="mx-auto max-h-full flex flex-col">
      <HorizontalSwipeList>
        {results.map((result, i) => (
          // Can use index as we'll never change list
          <ResultCard key={i} results={results} />
        ))}
      </HorizontalSwipeList>
    </div>
  );
};

export default ResultsList;
