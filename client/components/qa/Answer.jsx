/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line no-use-before-define
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { authToken } from '../../../config';

const Answer = ({ answer }) => {
  // console.log(answer);
  const {
    id,
    body,
    date,
    helpfulness,
    photos,
    answerer_name: name,
  } = answer;

  const [helpRating, setHelpRating] = React.useState(helpfulness);
  const [helped, setHelped] = React.useState(false);
  const [reportText, setReportText] = React.useState('Report');
  const [reported, setReported] = React.useState(false);

  useEffect(() => {
    setHelpRating(helpfulness);
  }, [answer]);

  const submitHelpfulness = () => {
    if (!helped) {
      setHelped(true);
      axios.put(`./qa/answers/helpful/${id}`, {
        headers: { Authorization: authToken },
      })
        .then(setHelpRating((curr) => curr + 1))
        .catch((err) => console.log(err));
    }
  };

  const report = () => {
    if (!reported) {
      setReported(true);
      axios.put(`./qa/answers/report/${id}`, {
        headers: { Authorization: authToken },
      })
        .then(setReportText('Reported'))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="qa-answer flex-container">
        <div id="qa-a">A:</div>
        <br />
        <div id="qa-answer-body">{body}</div>
      </div>
      <div className="qa-photo-container flex-container">
        { /* <img src={`${photos[0]}`} alt="Lamp" width="32" height="32" /> */
          photos.map((photo) => (
            <img className="qa-photo" src={photo.url} alt="product" />
          ))
        }
      </div>
      <div className="qa-answer-metadata flex-container">
        <div className="qa-ansqwer-user" id="qa-user">
          {`by ${name}, ${date.slice(0, 10)}`}
        </div>
        <div>|</div>
        <div className="flex-container">
          <div id="qa-helpful">Helpful?</div>
          <div id="qa-yes" onClick={() => submitHelpfulness()}>Yes</div>
          <div id="qa-score">{`(${helpRating})`}</div>
        </div>
        <div>|</div>
        <div id="qa-report" onClick={() => report()}>{reportText}</div>
      </div>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.array,
    ]),
  ).isRequired,
  // PropTypes.arrayOf(PropTypes.string)
  // PropTypes.string.isRequired
};

export default Answer;
