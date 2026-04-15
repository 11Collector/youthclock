'use client';

import React from 'react';

export default function AmuletDownloader() {
  const downloadAmulet = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Background - Deep Black
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Red Aura Glow
    const gradientGlow = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.8
    );
    gradientGlow.addColorStop(0, 'rgba(230, 57, 70, 0.2)');
    gradientGlow.addColorStop(1, 'rgba(230, 57, 70, 0)');
    ctx.fillStyle = gradientGlow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 3. Main Amulet Body (Gold Gradient)
    const amuletWidth = 600;
    const amuletHeight = 900;
    const x = (canvas.width - amuletWidth) / 2;
    const y = (canvas.height - amuletHeight) / 2 - 50;

    const amuletGradient = ctx.createLinearGradient(x, y, x + amuletWidth, y + amuletHeight);
    amuletGradient.addColorStop(0, '#ffd700');
    amuletGradient.addColorStop(0.5, '#d4af37');
    amuletGradient.addColorStop(1, '#aa8000');

    // Shadow & Outer Frame
    ctx.shadowBlur = 100;
    ctx.shadowColor = 'rgba(255, 215, 0, 0.3)';
    ctx.fillStyle = amuletGradient;
    
    // Draw Rounded Rect for Amulet
    const radius = 20;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + amuletWidth - radius, y);
    ctx.quadraticCurveTo(x + amuletWidth, y, x + amuletWidth, y + radius);
    ctx.lineTo(x + amuletWidth, y + amuletHeight - radius);
    ctx.quadraticCurveTo(x + amuletWidth, y + amuletHeight, x + amuletWidth - radius, y + amuletHeight);
    ctx.lineTo(x + radius, y + amuletHeight);
    ctx.quadraticCurveTo(x, y + amuletHeight, x, y + amuletHeight - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Inner Border
    ctx.strokeStyle = 'rgba(139, 0, 0, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(x + 15, y + 15, amuletWidth - 30, amuletHeight - 30);

    // 4. Sacred Geometry (SVG-like paths)
    const centerX = x + amuletWidth / 2;
    const centerY = y + amuletHeight * 0.35;
    
    ctx.strokeStyle = '#8b0000';
    ctx.lineWidth = 4;

    // Circles
    ctx.beginPath();
    ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, 90, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Cross Paths
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 140);
    ctx.lineTo(centerX, centerY + 140);
    ctx.moveTo(centerX - 140, centerY);
    ctx.lineTo(centerX + 140, centerY);
    
    ctx.moveTo(centerX - 100, centerY - 100);
    ctx.lineTo(centerX + 100, centerY + 100);
    ctx.moveTo(centerX - 100, centerY + 100);
    ctx.lineTo(centerX + 100, centerY - 100);
    ctx.stroke();

    // Center Core
    ctx.beginPath();
    ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#8b0000';
    ctx.fill();

    // 5. Thai Text - "มรณัง"
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 24px Kanit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('มรณัง', centerX, centerY + 10);

    // 6. Main Blessing Text - "อายุ วัณโณ สุขัง พลัง"
    ctx.fillStyle = '#8b0000';
    ctx.font = 'bold 100px Kanit, sans-serif';
    ctx.textAlign = 'center';
    
    // Adjusted textY to be more centered and avoid overflow
    const textY = y + amuletHeight * 0.58; 
    const lineHeight = 95;
    ctx.fillText('อายุ', centerX, textY);
    ctx.fillText('วัณโณ', centerX, textY + lineHeight);
    ctx.fillText('สุขัง', centerX, textY + lineHeight * 2);
    ctx.fillText('พลัง', centerX, textY + lineHeight * 3);

    // 7. Branding
    ctx.fillStyle = '#444';
    ctx.font = '32px Kanit, sans-serif';
    ctx.fillText('THE SOUL CLOCK × อัพสกิลกับฟุ้ย', canvas.width / 2, canvas.height - 100);

    // Trigger Download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'DigitalAmulet-TheSoulClock.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <button 
      onClick={downloadAmulet}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textDecoration: 'none', 
        padding: '12px 25px', 
        fontSize: '1.1rem', 
        background: 'transparent', 
        border: '1px solid #ffd700', 
        borderRadius: '12px', 
        color: '#ffd700', 
        gap: '8px', 
        width: '100%', 
        transition: 'all 0.3s',
        cursor: 'pointer'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Save Digital Amulet
    </button>
  );
}
