import { useState } from 'react';

const StatisticLine: React.FC<{ title: string; count: number | string }> = ({ title, count }) => {
  return (
    <div>
      {title} {count}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const average = (good + neutral + bad) / good + neutral + bad;
  const positive = good / (good + neutral + bad) + '%';

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <p>
          <button onClick={() => setGood((prev) => prev + 1)}>good</button>
          <button onClick={() => setNeutral((prev) => prev + 1)}>neutral</button>
          <button onClick={() => setBad((prev) => prev + 1)}>bad</button>
        </p>
        {good || neutral || bad ? (
          <>
            <StatisticLine title="good" count={good} />
            <StatisticLine title="neutral" count={neutral} />
            <StatisticLine title="bad" count={bad} />
            <StatisticLine title="all" count={good + neutral + bad} />
            <StatisticLine title="average" count={average} />
            <StatisticLine title="positive" count={positive} />
          </>
        ) : (
          <>No feedback given</>
        )}
      </div>
    </>
  );
};

export default App;
