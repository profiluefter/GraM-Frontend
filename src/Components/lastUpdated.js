import React, {useEffect, useState} from 'react';
import friendlyTime from 'friendly-time';

const LastUpdated = ({lastUpdated}) => {
  const [tsString, setTsString] = useState('');

  useEffect(() => {
    let updateString = () => setTsString(friendlyTime(new Date(lastUpdated)));
    updateString();
    let interval = setInterval(updateString, 500);
    return () => clearInterval(interval);
  }, [lastUpdated, tsString]);

  return <span>{tsString}</span>;
};

export default LastUpdated;
