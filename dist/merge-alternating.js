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
        commander_1.program.version("1.0.0")
            .option("-f, --first-file <path>", "First file to merge")
            .option("-s, --second-file <path>", "Second file to merge")
            .option("-r, --revert-second", "Revert seconf file pages", false)
            .option("-o, --output-file <path>", "Output file");
        commander_1.program.parse(process.argv);
        const options = {
            firstFilePath: commander_1.program.opts().firstFile,
            seconfFilePath: commander_1.program.opts().secondFile,
            outputPath: commander_1.program.opts().outputFile,
            revertSecond: commander_1.program.opts().revertSecond
        };
        if (options.firstFilePath && options.seconfFilePath && fs.existsSync(options.firstFilePath) && fs.existsSync(options.seconfFilePath) && options.outputPath) {
            let firstFile = fs.readFileSync(options.firstFilePath);
            let secondFile = fs.readFileSync(options.seconfFilePath);
            yield pdf_1.Pdf.mergeAlternating(options.outputPath, firstFile, secondFile, options.revertSecond);
            process.exit();
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
//# sourceMappingURL=merge-alternating.js.map