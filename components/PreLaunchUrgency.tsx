import React, { useState, useEffect } from 'react';
import './PreLaunchUrgency.css';

interface PreLaunchUrgencyProps {
  retailLink: string;
  institutionalLink: string;
  launchDate?: Date;
}

const PreLaunchUrgency: React.FC<PreLaunchUrgencyProps> = ({
  retailLink,
  institutionalLink,
  launchDate = new Date('2026-02-18T00:00:00')
}) => {
  const [countdown, setCountdown] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        setIsVisible(false);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown(`${days}d ${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [launchDate]);

  if (!isVisible) return null;

  return (
    <div className="pre-launch-urgency-wrapper">
      {/* Top Banner */}
      <div className="urgency-banner">
        <div className="urgency-banner-content">
          <span className="urgency-icon">⚡</span>
          <span className="urgency-text">PRE-ORDER PRICE LOCKED</span>
          <span className="urgency-countdown">{countdown}</span>
          <span className="urgency-subtext">— Price increases at launch</span>
        </div>
      </div>

      {/* Order Buttons */}
      <div className="order-buttons-container">
        {/* Retail Edition */}
        <a 
          href={retailLink} 
          className="amazon-btn retail-btn pulse-urgency" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div className="btn-urgency-overlay">
            <span className="save-badge">SAVE NOW</span>
          </div>
          <span className="btn-text">Order Retail Edition</span>
          <span className="btn-price">Launch Price Locked</span>
        </a>

        {/* Institutional Edition */}
        <a 
          href={institutionalLink} 
          className="amazon-btn institutional-btn pulse-urgency" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <div className="btn-urgency-overlay">
            <span className="save-badge">SAVE NOW</span>
          </div>
          <span className="btn-text">Order Institutional Edition</span>
          <span className="btn-price">Launch Price Locked</span>
        </a>
      </div>
    </div>
  );
};

export default PreLaunchUrgency;
