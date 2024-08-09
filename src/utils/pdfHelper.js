// Importing modules
const PDFDocument = require("pdfkit");
const fs = require("fs");
const {
  generateAdmissionPDFName,
  generatePaymentPDFName,
  capitalizeFirstLetters,
} = require("./helpers");

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
    const availablePageWidth =
      doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const availablePageHeight =
      doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

    const labelWidth = 150; // Label width for alignment
    const fieldSpacing = 20; // Space between fields

    // Saving the pdf file in root directory.
    const fileName = generateAdmissionPDFName(
      form?.firstName ?? "firstName",
      form?.lastName ?? "lastName",
      form?.paymentReference ?? "paymentReference"
    );

    doc.pipe(fs.createWriteStream(`tmp/${fileName}.pdf`));

    // Header row: GHS Application Form, Logo, and Passport Photo
    const passportWidth = 100;
    const headerWidth = availablePageWidth - passportWidth;

    // Add a border for the header row
    doc.rect(startX, startY, availablePageWidth, 120).stroke();

    // Add GHS Application Form text and logo on the left
    doc.fontSize(18).text("GHS Application Form", startX + 10, startY + 10);
    doc.image("tmp/GHS.png", startX + 10, startY + 40, { width: 50 });

    // Add Passport Photo on the right
    doc.image(
      form?.passportPhoto ?? "tmp/GHS.png",
      startX + headerWidth + 10,
      startY + 10,
      { width: passportWidth, height: passportWidth }
    );

    startY += 130; // Adjust to account for the header row height

    // Function to check if a new page is needed
    function checkPageSpace(cellHeight) {
      if (startY + cellHeight > availablePageHeight) {
        doc.addPage();
        startY = doc.page.margins.top; // Reset Y position
      }
    }

    // Draw a field within a bordered table cell
    function drawField(label, value, cellHeight) {
      checkPageSpace(cellHeight); // Check if a new page is needed

      // Draw the label cell
      doc.rect(startX, startY, labelWidth, cellHeight).stroke();
      doc.fontSize(12).text(label, startX + 5, startY + 5);

      // Draw the value cell
      doc
        .rect(
          startX + labelWidth,
          startY,
          availablePageWidth - labelWidth,
          cellHeight
        )
        .stroke();
      doc.fontSize(12).text(value, startX + labelWidth + 5, startY + 5);

      startY += cellHeight;
    }

    // Draw a heading text
    function drawHeadingText(text, cellHeight = 20) {
      checkPageSpace(cellHeight); // Check if a new page is needed

      startY += 10;
      doc.fontSize(14).text(text, startX, startY);
      startY += fieldSpacing;
    }

    // Personal Information
    drawField(
      "First Name:",
      capitalizeFirstLetters(form?.firstName ?? ""),
      fieldSpacing
    );
    drawField(
      "Middle Name:",
      capitalizeFirstLetters(form?.middleName ?? ""),
      fieldSpacing
    );
    drawField(
      "Last Name:",
      capitalizeFirstLetters(form?.lastName ?? ""),
      fieldSpacing
    );
    drawField("Email:", form?.email ?? "", fieldSpacing);
    drawField(
      "Residential Address:",
      form?.residentialAddress ?? "",
      fieldSpacing
    );
    drawField(
      "Region of Residence:",
      form?.regionOfResidence ?? "",
      fieldSpacing
    );
    drawField("Sex:", form?.sex ?? "", fieldSpacing);
    drawField("Date of Birth:", form?.dob ?? "", fieldSpacing);
    drawField("Nationality:", form?.nationality ?? "", fieldSpacing);
    drawField("Mobile 1:", form?.mobile1 ?? "", fieldSpacing);
    drawField("Mobile 2:", form?.mobile2 ?? "", fieldSpacing);
    drawField("National ID Type:", form?.nationalIDType ?? "", fieldSpacing);
    drawField(
      "National ID Number:",
      form?.nationalIDNumber ?? "",
      fieldSpacing
    );
    drawField("Payment Reference:", form?.paymentReference ?? "", fieldSpacing);

    // Education History
    drawHeadingText("Education History");

    drawField("School 1:", form?.nameOfSchoolAttended1 ?? "", fieldSpacing);
    drawField("Location:", form?.locationOfSchoolAttended1 ?? "", fieldSpacing);
    drawField("Year Attended:", form?.yearAttended1 ?? "", fieldSpacing);
    drawField("Qualification:", form?.qualification1 ?? "", fieldSpacing);

    drawField("School 2:", form?.nameOfSchoolAttended2 ?? "", fieldSpacing);
    drawField("Location:", form?.locationOfSchoolAttended2 ?? "", fieldSpacing);
    drawField("Year Attended:", form?.yearAttended2 ?? "", fieldSpacing);
    drawField("Qualification:", form?.qualification2 ?? "", fieldSpacing);

    drawField("School 3:", form?.nameOfSchoolAttended3 ?? "", fieldSpacing);
    drawField("Location:", form?.locationOfSchoolAttended3 ?? "", fieldSpacing);
    drawField("Year Attended:", form?.yearAttended3 ?? "", fieldSpacing);
    drawField(
      "Qualification:",
      form?.qualification3 ?? "Master's Degree",
      fieldSpacing
    );

    // Course Preferences
    drawHeadingText("Course Preferences");

    drawField("Preferred Course:", form?.preferredCourse ?? "", fieldSpacing);
    drawField("Course Session:", form?.session ?? "", fieldSpacing);
    drawField(
      "Prefer Hostel:",
      form?.preferHostel ? "Yes" : "No",
      fieldSpacing
    );

    // Medical Information
    drawHeadingText("Medical Information");

    drawField(
      "Has Medical Condition:",
      form?.hasMedicalCondition ? "Yes" : "No",
      fieldSpacing
    );
    if (form?.hasMedicalCondition) {
      drawField(
        "Medical Condition:",
        form?.medicalCondition ?? "",
        fieldSpacing
      );
    }

    drawField(
      "Has Disability:",
      form?.hasDisability ? "Yes" : "No",
      fieldSpacing
    );
    if (form?.hasDisability) {
      drawField("Disability:", form?.disability ?? "", fieldSpacing);
    }

    // Additional Information
    drawHeadingText("Additional Information");

    drawField("Source:", form?.source ?? "", fieldSpacing);
    drawField("Prior Experience:", form?.priorExperience ?? "", fieldSpacing);
    drawField(
      "Specialization:",
      form?.priorExperienceSpecialization ?? "",
      fieldSpacing
    );

    // Sponsor Information
    drawHeadingText("Sponsor Information");

    drawField(
      "Sponsor Name:",
      capitalizeFirstLetters(form?.sponsorName ?? ""),
      fieldSpacing
    );
    drawField("Relationship:", form?.sponsorRelationship ?? "", fieldSpacing);
    drawField(
      "Occupation:",
      capitalizeFirstLetters(form?.sponsorOccupation ?? ""),
      fieldSpacing
    );
    drawField("Mobile:", form?.sponsorMobile ?? "", fieldSpacing);
    drawField("Address:", form?.sponsorAddress ?? "", fieldSpacing);

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
