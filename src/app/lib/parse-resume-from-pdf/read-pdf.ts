import * as pdfjs from "pdfjs-dist";

// Instead of importing the worker directly, we'll set the worker source to a CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import type { TextItem as PdfjsTextItem } from "pdfjs-dist/types/src/display/api";
import type { TextItem, TextItems } from "lib/parse-resume-from-pdf/types";

/**
 * Step 1. Read a pdf resume file into text items to prepare for processing
 */
export const readPdf = async (fileUrl: string): Promise<TextItems> => {
  try {
    const pdf = await pdfjs.getDocument(fileUrl).promise;
    const textItems: TextItems = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const items = content.items as PdfjsTextItem[];

      for (const item of items) {
        if ("str" in item && item.str.trim()) {
          const transform = item.transform;
          const x = transform[4];
          const y = transform[5];

          textItems.push({
            text: item.str,
            x,
            y,
            width: item.width,
            height: item.height,
            fontName: item.fontName,
            hasEOL: item.hasEOL || false,
          });
        }
      }
    }

    return textItems;
  } catch (error) {
    console.error("Error reading PDF:", error);
    throw new Error("Failed to read PDF file");
  }
};
