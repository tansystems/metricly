import React from 'react';

const ExportButtons = ({ token }) => {
  const download = (type) => {
    const url = `/api/export/${type}`;
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = type === 'excel' ? 'metrics.xlsx' : 'metrics.pdf';
        link.click();
      });
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <button onClick={() => download('excel')} style={{ marginRight: 8 }}>Экспорт в Excel</button>
      <button onClick={() => download('pdf')}>Экспорт в PDF</button>
    </div>
  );
};

export default ExportButtons; 