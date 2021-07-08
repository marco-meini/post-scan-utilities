import { program } from "commander";
import * as fs from "fs";
import { Pdf } from "./lib/pdf";

(async () => {
  try {
    program.version("1.0.0").option("-o, --output-file <path>", "Output file").option("-f, --files <paths>", "Files, comma separated");
    program.parse(process.argv);
    const options: {
      files: string;
      outputPath: string;
    } = {
      files: program.opts().files,
      outputPath: program.opts().outputFile
    };
    if (options.files && options.outputPath) {
      const files = options.files.split(",").map((item) => {
        return fs.readFileSync(item);
      });
      await Pdf.imagesToPdf(options.outputPath, files);
    } else {
      console.error(new Error("Missing parameters"));
      process.exit(1);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
