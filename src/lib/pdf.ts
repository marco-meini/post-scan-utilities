import { PDFDocument } from "pdf-lib";
import * as _ from "lodash";
import * as fs from "fs";

export class Pdf {
  static async merge(destinationFile: string, sourceFiles: Array<Buffer>): Promise<number> {
    try {
      let mergedPdf = await PDFDocument.create();
      for (let item of sourceFiles) {
        let pdf = await PDFDocument.load(item.toString("base64"));
        let copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      let mergedPdfFile = await mergedPdf.save({
        addDefaultPage: false,
        useObjectStreams: false
      });
      fs.writeFileSync(destinationFile, mergedPdfFile);
      let fileContent = Buffer.from(mergedPdfFile).toString("base64");
      let size = Buffer.byteLength(fileContent);
      return Promise.resolve(size);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async mergeAlternating(destinationFile: string, firstFile: Buffer, secondFile: Buffer, revertSecond: boolean, progress?: (percentage: number) => {}): Promise<void> {
    try {
      let mergedPdf = await PDFDocument.create();
      let firstPdf = await PDFDocument.load(firstFile.toString("base64"));
      let seconfPdf = await PDFDocument.load(secondFile.toString("base64"));
      let firstPages = await mergedPdf.copyPages(firstPdf, firstPdf.getPageIndices());
      let secondPages = await mergedPdf.copyPages(seconfPdf, seconfPdf.getPageIndices());
      if (revertSecond) _.reverse(secondPages);
      let max = _.max([firstPages.length, secondPages.length]);
      for (let i = 0; i < max; i++) {
        if (i < firstPages.length) {
          mergedPdf.addPage(firstPages[i]);
        }
        if (i < secondPages.length) {
          mergedPdf.addPage(secondPages[i]);
        }
        if (progress) progress((i / max) * 100);
      }
      let mergedPdfFile = await mergedPdf.save({
        addDefaultPage: false,
        useObjectStreams: false
      });
      fs.writeFileSync(destinationFile, mergedPdfFile);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async imagesToPdf(destinationFile: string, images: Array<Buffer>) {
    try {
      let mergedPdf = await PDFDocument.create();
      for (let i = 0; i < images.length; i++) {
        let page = mergedPdf.insertPage(i);
        const embeddedImage = await mergedPdf.embedJpg(images[i]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: page.getWidth(),
          height: page.getHeight()
        });
      }
      let mergedPdfFile = await mergedPdf.save({
        addDefaultPage: false,
        useObjectStreams: false
      });
      fs.writeFileSync(destinationFile, mergedPdfFile);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
