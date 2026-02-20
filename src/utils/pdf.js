import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a PDF from an HTML element, auto-scaled to fit one page
 * @param {HTMLElement} element - The element to convert to PDF
 * @param {string} filename - The filename for the PDF (without extension)
 */
export async function generatePDF(element, filename) {
  // Create a canvas from the element
  const canvas = await html2canvas(element, {
    scale: 2, // Higher resolution
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');

  // Calculate dimensions for PDF (Letter size: 8.5 x 11 inches)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: 'letter',
  });

  const pageWidth = 8.5;
  const pageHeight = 11;
  const margin = 0.5;
  const contentWidth = pageWidth - 2 * margin;
  const contentHeight = pageHeight - 2 * margin;

  // Calculate aspect ratio
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const imgAspectRatio = imgHeight / imgWidth;

  // Calculate dimensions to fit content on one page
  let pdfImgWidth = contentWidth;
  let pdfImgHeight = contentWidth * imgAspectRatio;

  // If height exceeds page, scale down to fit
  if (pdfImgHeight > contentHeight) {
    const scale = contentHeight / pdfImgHeight;
    pdfImgHeight = contentHeight;
    pdfImgWidth = pdfImgWidth * scale;
  }

  // Center horizontally if scaled down
  const xOffset = margin + (contentWidth - pdfImgWidth) / 2;

  // Add image to PDF (always single page now)
  pdf.addImage(imgData, 'PNG', xOffset, margin, pdfImgWidth, pdfImgHeight);

  // Sanitize filename
  const safeFilename = filename
    .replace(/[^a-z0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase();

  // Use blob and explicit download link for better filename control
  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFilename || 'routine'}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
