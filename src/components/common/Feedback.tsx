import React, { useEffect, useState } from 'react';
import { AiFillQuestionCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import { MdFeedback } from 'react-icons/md';
import { FaShare } from 'react-icons/fa';
import posthog from 'posthog-js';

export function Feedback() {
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const toggleFeedback = () => {
    posthog.capture('toggle feedback');
    setShowFeedback(!showFeedback);
  };

  return (
    <div>
      {showFeedback && (
        <div style={{ position: 'fixed', bottom: '0px', right: '0px', paddingRight: '1%', paddingBottom: '4%' }}>
          <div className="card h-100" style={{ backgroundColor: '#222222', minWidth: '220px' }}>
            <div className="card-body">
              <div className="row pb-3">
                <div className="col-3">
                  <AiOutlineQuestionCircle size={'25'} color="white" />
                </div>
                <div className="col-9">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScQ-g4WB3xFoO8_6cF5yXGu0myqcKdj4QhWi3LD9AKfwLaicQ/viewform?usp=sf_link"
                    target="_blank"
                  >
                    Submit Feedback
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <FaShare size={'25'} color="white" />
                </div>
                <div className="col-9">
                  <a
                    href="https://chrome.google.com/webstore/detail/wallet-guard/pdgbckgdncnhihllonhnjbdoighgpimk"
                    target="_blank"
                  >
                    Leave a Review
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ position: 'fixed', bottom: '0px', right: '0px', paddingRight: '1%', paddingBottom: '1%' }}>
        <button>
          <MdFeedback size={'35px'} color="gray" onClick={() => toggleFeedback()} />
        </button>
      </div>
    </div>
  );
}
