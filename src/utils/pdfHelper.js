// Importing modules
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { generateAdmissionPDFName, generatePaymentPDFName } = require("./helpers");

if (!fs.existsSync("tmp")) {
  console.log("tmp folder not found");
  fs.mkdir("tmp", (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}

module.exports = {
  generateAdmissionForm(form) {
    // Create a document
    const doc = new PDFDocument();

    let startX = doc.page.margins.left;
    let startY = doc.page.margins.top;
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    console.log(startX, startY, pageWidth, pageHeight, doc.page.margins);

    // Saving the pdf file in root directory.
    const fileName = generateAdmissionPDFName(
      form?.firstName,
      form?.lastName,
      form?.paymentReference
    );
    doc.pipe(fs.createWriteStream(`tmp/${fileName}.pdf`));

    // Adding an image in the pdf.

    doc.image("tmp/GHS.png", {
      fit: [100, 100],
      align: "center",
      valign: "center",
    });

    // Adding functionality
    doc
      .fontSize(18)
      .text("This the article for GeeksforGeeks", startX, startY, {});

    startY += 100;

    //
    doc
      .addPage()
      .fontSize(15)
      .text("Generating PDF with the help of pdfkit", startX, 100);

    // Apply some transforms and render an SVG path with the
    // 'even-odd' fill rule
    doc
      .scale(0.6)
      .translate(470, -380)
      .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
      .fill("red", "even-odd")
      .restore();

    // Add some text with annotations
    doc
      .addPage()
      .fillColor("blue")
      .text("The link for GeeksforGeeks website", 100, 100)
      .link(100, 100, 160, 27, "https://www.geeksforgeeks.org/");

    // Finalize PDF file
    doc.end();

    return fileName;
  },
  generatePaymentReceipt(paymentInfo, userInfo) {
    // Create a document
    const doc = new PDFDocument();

    let startX = doc.page.margins.left;
    let startY = doc.page.margins.top;
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    console.log(startX, startY, pageWidth, pageHeight, doc.page.margins);

    // Saving the pdf file in root directory.
    const fileName = generatePaymentPDFName(
      userInfo?.firstName,
      userInfo?.lastName,
      paymentInfo?.reference
    );
    doc.pipe(fs.createWriteStream(`tmp/${fileName}.pdf`));

    // Adding an image in the pdf.

    doc.image("tmp/GHS.png", {
      fit: [100, 100],
      align: "center",
      valign: "center",
    });

    // Adding functionality
    doc
      .fontSize(18)
      .text("This the article for GeeksforGeeks", startX, startY, {});

    startY += 100;

    //
    doc
      .addPage()
      .fontSize(15)
      .text("Generating PDF with the help of pdfkit", startX, 100);

    // Apply some transforms and render an SVG path with the
    // 'even-odd' fill rule
    doc
      .scale(0.6)
      .translate(470, -380)
      .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
      .fill("red", "even-odd")
      .restore();

    // Add some text with annotations
    doc
      .addPage()
      .fillColor("blue")
      .text("The link for GeeksforGeeks website", 100, 100)
      .link(100, 100, 160, 27, "https://www.geeksforgeeks.org/");

    // Finalize PDF file
    doc.end();

    return fileName;
  },
};
