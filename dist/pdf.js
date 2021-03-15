"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pdf = void 0;
const pdf_lib_1 = require("pdf-lib");
const fs = require("fs");
class Pdf {
    static merge(destinationFile, sourceFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mergedPdf = yield pdf_lib_1.PDFDocument.create();
                for (let item of sourceFiles) {
                    let pdf = yield pdf_lib_1.PDFDocument.load(item.toString("base64"));
                    let copiedPages = yield mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach((page) => mergedPdf.addPage(page));
                }
                let mergedPdfFile = yield mergedPdf.save({
                    addDefaultPage: false,
                    useObjectStreams: false
                });
                fs.writeFileSync(destinationFile, mergedPdfFile);
                let fileContent = Buffer.from(mergedPdfFile).toString("base64");
                let size = Buffer.byteLength(fileContent);
                return Promise.resolve(size);
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    }
}
exports.Pdf = Pdf;
//# sourceMappingURL=pdf.js.map