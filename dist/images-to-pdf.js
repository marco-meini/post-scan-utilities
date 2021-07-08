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
const commander_1 = require("commander");
const fs = require("fs");
const pdf_1 = require("./lib/pdf");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        commander_1.program.version("1.0.0").option("-o, --output-file <path>", "Output file").option("-f, --files <paths>", "Files, comma separated");
        commander_1.program.parse(process.argv);
        const options = {
            files: commander_1.program.opts().files,
            outputPath: commander_1.program.opts().outputFile
        };
        if (options.files && options.outputPath) {
            const files = options.files.split(",").map((item) => {
                return fs.readFileSync(item);
            });
            yield pdf_1.Pdf.imagesToPdf(options.outputPath, files);
        }
        else {
            console.error(new Error("Missing parameters"));
            process.exit(1);
        }
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}))();
//# sourceMappingURL=images-to-pdf.js.map