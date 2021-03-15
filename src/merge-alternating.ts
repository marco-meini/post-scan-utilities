import { program } from "commander";
import * as fs from "fs";
import { Pdf } from "./lib/pdf";


(async () => {
  try {
    program.version("1.0.0")
      .option("-f, --first-file <path>", "First file to merge")
      .option("-s, --second-file <path>", "Second file to merge")
      .option("-r, --revert-second", "Revert seconf file pages", false)
      .option("-o, --output-file <path>", "Output file");
    program.parse(process.argv);
    const options: {
      firstFilePath: string;
      seconfFilePath: string;
      outputPath: string;
      revertSecond: boolean;
    } = {
      firstFilePath: program.opts().firstFile,
      seconfFilePath: program.opts().secondFile,
      outputPath: program.opts().outputFile,
      revertSecond: program.opts().revertSecond
    };

    if (options.firstFilePath && options.seconfFilePath && fs.existsSync(options.firstFilePath) && fs.existsSync(options.seconfFilePath) && options.outputPath) {
      let firstFile = fs.readFileSync(options.firstFilePath);
      let secondFile = fs.readFileSync(options.seconfFilePath);
      await Pdf.mergeAlternating(options.outputPath, firstFile, secondFile, options.revertSecond);
      process.exit();
    } else {
      console.error(new Error("Missing parameters"));
      process.exit(1);
    }
  }
  catch (e) {
    console.error(e);
    process.exit(1);
  }
})();