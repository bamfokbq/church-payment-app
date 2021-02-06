import jsPDF from 'jspdf';
import 'jspdf-autotable';
// Date Fns is used to format the dates we receive
// from our API call
import { format } from 'date-fns';

// define a generatePDF function that accepts a reports argument
const generatePDF = (reports) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ['NAME', 'AMOUNT', 'PAYMENT TYPE', 'DATE', 'HOSTNAME'];
  // define an empty array of rows
  const tableRows = [];

  // for each report pass all its data into an array
  reports.forEach((report) => {
    report.date = format(new Date(report.date), 'dd-MM-yyyy');
    const reportData = [
      report.memberName,
      report.amount,
      report.paymentType,
      report.date,
      report.systemInfo.hostName,
    ];
    tableRows.push(reportData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // report title. and margin-top + margin-left
  doc.text('Payments Report', 14, 15);
  // we define the name of our PDF file.
  doc.autoPrint({ variant: 'non-conform' });
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;
