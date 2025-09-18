import * as React from 'react';

interface EmailTemplateProps {
  subject?: string;
  message: string;
}

export function EmailTemplate({ subject, message }: EmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 16, color: '#222' }}>
      {subject && <h2 style={{ marginBottom: 12 }}>{subject}</h2>}
      <p>{message}</p>
    </div>
  );
}