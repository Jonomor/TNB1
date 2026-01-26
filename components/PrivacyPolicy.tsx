import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div style={{
      background: '#000000',
      minHeight: '100vh',
      color: '#e5e7eb',
      fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif"
    }}>
      <div style={{
        background: '#dc2626',
        color: 'white',
        textAlign: 'center',
        padding: '12px 20px',
        fontSize: '0.85em',
        fontWeight: 600,
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        DAY ZERO COUNTDOWN: PRIVACY POLICY - EFFECTIVE FEBRUARY 18, 2026
      </div>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
          borderBottom: '1px solid #22d3ee',
          padding: '60px 40px'
        }}>
          <div style={{ color: '#22d3ee', fontSize: '1.2em', marginBottom: '20px' }}>
            ▶ The Neutral Bridge
          </div>
          <h1 style={{
            color: '#ffffff',
            fontSize: '3em',
            fontWeight: 300,
            marginBottom: '20px',
            letterSpacing: '-1px'
          }}>
            Privacy <span style={{ color: '#22d3ee', fontWeight: 400 }}>Policy</span>
          </h1>
          <div style={{ color: '#9ca3af', fontSize: '0.95em', marginTop: '15px' }}>
            <strong>Effective Date:</strong> February 18, 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> January 25, 2026
          </div>
        </div>

        <div style={{ padding: '40px' }}>
          {/* Content sections */}
          <div style={{ marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid #1f1f1f' }}>
            <h2 style={{ color: '#22d3ee', fontSize: '1.8em', marginBottom: '20px' }}>1. Introduction</h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.7 }}>
              Welcome to The Neutral Bridge ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our forensic analysis platform at{' '}
              <a href="https://theneutralbridge.com" style={{ color: '#22d3ee', textDecoration: 'none' }}>theneutralbridge.com</a>{' '}
              and use our Intelligence Vault services.
            </p>
          </div>

          <div style={{ marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid #1f1f1f' }}>
            <h2 style={{ color: '#22d3ee', fontSize: '1.8em', marginBottom: '20px' }}>2. Information We Collect</h2>
            
            <h3 style={{ color: '#60a5fa', fontSize: '1.3em', marginBottom: '15px' }}>2.1 Information You Provide</h3>
            <ul style={{ color: '#d1d5db', lineHeight: 1.7, marginLeft: '30px' }}>
              <li><strong style={{ color: '#ffffff' }}>Institutional Access Information:</strong> When you access the Intelligence Vault, we collect verification data such as your Order ID or license key.</li>
              <li><strong style={{ color: '#ffffff' }}>Purchase Information:</strong> When you acquire the Retail or Institutional editions, we collect transaction details (processed securely through third-party platforms like Amazon).</li>
              <li><strong style={{ color: '#ffffff' }}>Communications:</strong> When you contact our analysis team, we collect the information provided in your inquiries.</li>
            </ul>

            <h3 style={{ color: '#60a5fa', fontSize: '1.3em', margin: '30px 0 15px 0' }}>2.2 Automatically Collected Information</h3>
            <ul style={{ color: '#d1d5db', lineHeight: 1.7, marginLeft: '30px' }}>
              <li><strong style={{ color: '#ffffff' }}>Systems Usage Data:</strong> We monitor interaction with forensic exhibits.</li>
              <li><strong style={{ color: '#ffffff' }}>Technical Device Information:</strong> We collect device type, browser specifications, IP address, and OS.</li>
              <li><strong style={{ color: '#ffffff' }}>Operational Cookies:</strong> We use essential technologies to maintain your session.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid #1f1f1f' }}>
            <h2 style={{ color: '#22d3ee', fontSize: '1.8em', marginBottom: '20px' }}>3. How We Use Your Information</h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.7 }}>We use the information we collect to:</p>
            <ul style={{ color: '#d1d5db', lineHeight: 1.7, marginLeft: '30px' }}>
              <li>Maintain and secure the Intelligence Vault and Forensic Terminal</li>
              <li>Validate institutional licenses and facilitate document redemptions</li>
              <li>Deliver critical roadmap updates and quarterly strategy briefings</li>
              <li>Respond to systems engineering inquiries and analyst support requests</li>
              <li>Analyze usage trends within the forensic Exhibits</li>
              <li>Detect and prevent unauthorized access to confidential intelligence</li>
            </ul>
          </div>

          {/* Highlighted section */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.05) 0%, rgba(34, 211, 238, 0.02) 100%)',
            borderLeft: '3px solid #22d3ee',
            padding: '25px',
            margin: '30px 0',
            borderRadius: '4px'
          }}>
            <h2 style={{ color: '#22d3ee', fontSize: '1.8em', marginBottom: '20px' }}>4. Google API Services</h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.7, marginBottom: '15px' }}>
              The Neutral Bridge's use of information received from Google APIs adheres to the{' '}
              <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee', textDecoration: 'none' }}>
                Google API Services User Data Policy
              </a>, including all Limited Use requirements.
            </p>
            <p style={{ color: '#d1d5db', lineHeight: 1.7 }}>
              We only access data necessary for the services you request. We do not use Google user data for advertising. Human review is prohibited except for security, support, or legal compliance.
            </p>
          </div>

          <div style={{ marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid #1f1f1f' }}>
            <h2 style={{ color: '#22d3ee', fontSize: '1.8em', marginBottom: '20px' }}>5. Contact Us</h2>
            <p style={{ color: '#d1d5db', lineHeight: 1.7 }}>
              <strong style={{ color: '#ffffff' }}>The Neutral Bridge</strong><br/>
              Email: <a href="mailto:inquiries@theneutralbridge.com" style={{ color: '#22d3ee', textDecoration: 'none' }}>inquiries@theneutralbridge.com</a><br/>
              Terminal: <a href="https://theneutralbridge.com" style={{ color: '#22d3ee', textDecoration: 'none' }}>https://theneutralbridge.com</a>
            </p>
          </div>
        </div>
      </div>
      
      <div style={{
        textAlign: 'center',
        padding: '60px 40px',
        background: '#0a0a0a',
        borderTop: '1px solid #22d3ee',
        marginTop: '60px'
      }}>
        <p style={{ color: '#9ca3af', marginBottom: '25px' }}>
          <strong>Acknowledgment:</strong> By utilizing The Neutral Bridge, you acknowledge and accept this forensic Privacy Policy.
        </p>
        <a
          href="https://theneutralbridge.com"
          style={{
            display: 'inline-block',
            background: '#22d3ee',
            color: '#000000',
            padding: '16px 40px',
            borderRadius: '4px',
            fontWeight: 600,
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.9em'
          }}
        >
          ← Return to The Neutral Bridge
        </a>
      </div>
    </div>
  );
}
