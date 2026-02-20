import { forwardRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { Star } from 'lucide-react';

// Pastel color rotation for printed steps
const printColors = [
  { bg: '#FFE4EC', icon: '#FF6B9D' },
  { bg: '#E4F0FF', icon: '#5B9BFF' },
  { bg: '#FFF4E4', icon: '#FFB347' },
  { bg: '#E4FFE9', icon: '#4ADE80' },
  { bg: '#F0E4FF', icon: '#A78BFA' },
];

const PrintPreview = forwardRef(({ title, steps, showCheckbox }, ref) => {
  // Calculate compact sizing based on number of steps
  const stepCount = steps.length;
  const isCompact = stepCount > 6;
  const gap = isCompact ? 8 : 12;
  const padding = isCompact ? 10 : 14;
  const numberSize = isCompact ? 28 : 32;
  const iconContainerSize = isCompact ? 40 : 48;
  const iconSize = isCompact ? 22 : 26;
  const fontSize = isCompact ? 18 : 20;

  return (
    <div
      ref={ref}
      className="print-container bg-white"
      style={{
        fontFamily: 'Nunito, system-ui, sans-serif',
        padding: '24px 32px',
        maxWidth: 650,
      }}
    >
      {/* Header with stars */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 8,
      }}>
        <Star style={{ width: 24, height: 24, color: '#FFD93D', fill: '#FFD93D' }} />
        <h1 style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#4B5563',
          margin: 0,
          lineHeight: 1.2,
        }}>
          {title || 'My Routine'}
        </h1>
        <Star style={{ width: 24, height: 24, color: '#FFD93D', fill: '#FFD93D' }} />
      </div>

      {/* Decorative line */}
      <div style={{
        height: 3,
        background: 'linear-gradient(to right, #FFB5C5, #B5D8FF, #FFB5C5)',
        borderRadius: 2,
        marginBottom: 16,
      }} />

      {/* Steps list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap }}>
        {steps.map((step, index) => {
          const Icon = LucideIcons[step.icon] || LucideIcons.CircleDot;
          const colors = printColors[index % printColors.length];

          return (
            <div
              key={step.id}
              className="print-step"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding,
                backgroundColor: colors.bg,
                borderRadius: 12,
              }}
            >
              {/* Step number - using table-cell for perfect centering */}
              <div style={{
                width: numberSize,
                height: numberSize,
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'table',
                flexShrink: 0,
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}>
                <span style={{
                  display: 'table-cell',
                  verticalAlign: 'middle',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: numberSize * 0.5,
                  lineHeight: 1,
                  color: colors.icon,
                }}>
                  {index + 1}
                </span>
              </div>

              {/* Icon */}
              <div style={{
                width: iconContainerSize,
                height: iconContainerSize,
                backgroundColor: 'white',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}>
                <Icon style={{ width: iconSize, height: iconSize, color: colors.icon }} />
              </div>

              {/* Label */}
              <span style={{
                fontWeight: 'bold',
                fontSize,
                color: '#374151',
                flexGrow: 1,
                lineHeight: 1.3,
              }}>
                {step.label}
              </span>

              {/* Checkbox (optional) - on the right side */}
              {showCheckbox && (
                <div style={{
                  width: 24,
                  height: 24,
                  border: '2px solid #9CA3AF',
                  borderRadius: 4,
                  flexShrink: 0,
                  backgroundColor: 'white',
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 20,
        paddingTop: 12,
        borderTop: '2px dashed #E5E7EB',
        textAlign: 'center',
        fontSize: 10,
        color: '#9CA3AF',
      }}>
        Created with Visual Schedule Builder
      </div>
    </div>
  );
});

PrintPreview.displayName = 'PrintPreview';

export default PrintPreview;
