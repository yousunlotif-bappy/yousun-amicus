"use client";

import { useState } from "react";
import { Download, Loader2, Printer } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type ReportActionsProps = {
  reportId: string;
  reportTitle: string;
};

export function ReportActions({ reportId, reportTitle }: ReportActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  /*
    Turn the report title into a clean file name.
    Example: "Bank Officer Credit Memo" -> "bank-officer-credit-memo"
  */
  function cleanFileName(value: string): string {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  async function handleDownloadPdf() {
    /*
      The report detail page should have an element with this ID.
      Only that report content will be captured for PDF export.
    */
    const reportElement = document.getElementById("report-content");

    if (!reportElement) {
      alert("Report content not found. Please refresh the page and try again.");
      return;
    }

    try {
      setIsDownloading(true);

      /*
        Capture the report as a high-resolution image.
        scale: 2 keeps the PDF sharper than a normal screenshot.
      */
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imageData = canvas.toDataURL("image/png");

      /*
        Create a portrait A4 PDF.
        We add margins so the report does not touch the page edges.
      */
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const margin = 10;
      const usablePageHeight = pageHeight - margin * 2;
      const imageWidth = pageWidth - margin * 2;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let heightLeft = imageHeight;
      let imagePosition = margin;

      /*
        Add the first page.
        If the report is longer than one page, the loop below will add more pages.
      */
      pdf.addImage(imageData, "PNG", margin, imagePosition, imageWidth, imageHeight);
      heightLeft -= usablePageHeight;

      /*
        Add extra pages for long reports.
        The negative image position shifts the captured report upward on each new page.
      */
      while (heightLeft > 0) {
        imagePosition = heightLeft - imageHeight + margin;

        pdf.addPage();
        pdf.addImage(
          imageData,
          "PNG",
          margin,
          imagePosition,
          imageWidth,
          imageHeight
        );

        heightLeft -= usablePageHeight;
      }

      const fileName = `${cleanFileName(reportTitle)}-${reportId}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  function handlePrint() {
    /*
      Browser print is useful for quick review.
      Later, we can add print-specific CSS for a cleaner printed layout.
    */
    window.print();
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handlePrint}
        className="flex items-center gap-2 rounded-xl border border-[#E5EAF0] bg-white px-5 py-3 text-sm font-bold text-[#0B2341] shadow-sm transition hover:bg-[#F8FAFC]"
      >
        <Printer className="h-4 w-4" />
        Print
      </button>

      <button
        type="button"
        onClick={handleDownloadPdf}
        disabled={isDownloading}
        className="flex items-center gap-2 rounded-xl bg-[#0B2341] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#071A2F] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}

        {isDownloading ? "Generating PDF..." : "Download PDF"}
      </button>
    </div>
  );
}

