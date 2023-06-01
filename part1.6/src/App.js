import { useState } from 'react';

const Stat = ({ item: { text, count } }) => {
  return (
    <div>
      <p>
        {text} : {count}
      </p>
    </div>
  );
};

const Statistic = ({ items }) => {
  return items.map((item, key) => <Stat key={key} item={item} />);
};

const Feedback = ({ items }) => {
  return (
    <div>
      <h2>give feedback</h2>
      <div>
        {items.map((item, key) => (
          <button onClick={() => item.func((prev) => prev + 1)} key={key}>
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const average = (good + neutral + bad) / [good, neutral, bad].length;
  const positive = (good / (good + neutral + bad)) * 100;

  const btnItems = [
    { text: 'good', func: setGood },
    { text: 'neutral', func: setNeutral },
    { text: 'bad', func: setBad },
  ];

  const items = [
    { text: 'good', count: good },
    { text: 'neutral', count: neutral },
    { text: 'bad', count: bad },
    { text: 'average', count: average },
    { text: 'positive', count: `${positive} % ` },
  ];

  return (
    <>
      <Feedback items={btnItems} />
      <Statistic items={items} />
    </>
  );
};

export default App;
