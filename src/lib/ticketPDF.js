import { jsPDF } from "jspdf";
import { imgArray, font } from "./dataTicketPDF";

const callAddFont = function () {
  this.addFileToVFS("Goldman-Bold-bold.ttf", font);
  this.addFont("Goldman-Bold-bold.ttf", "Goldman-Bold", "bold");
};
jsPDF.API.events.push(["addFonts", callAddFont]);

export default function ticketPdf(
  boarding,
  date,
  destinationAirport,
  name,
  pnr,
  seat,
  startingAirport,
  takeOff,
  tripId,
  landingTime
) {
  var doc = new jsPDF("landscape");
  var itinerary = startingAirport + " - " + destinationAirport;
  var dtime = takeOff.toTimeString().substring(0, 17);
  var bTime = boarding.toTimeString().substring(0, 17);
  var ltime = landingTime.toTimeString().substring(0, 17);

  //Image + Borders
  const rand = Math.floor(Math.random(3) * 3);

  doc.addImage(imgArray[rand], "JPEG", 0, 0, 300, 210);

  doc.setLineWidth(1.5);
  doc.setDrawColor(255, 255, 255);
  doc.line(10, 10, 285, 10); // horizontal line
  doc.line(10, 10, 10, 200);
  doc.line(285, 10, 285, 200); // horizontal line
  doc.line(10, 200, 285, 200);

  //doc.setDrawColor(255, 255, 255) // draw red lines
  doc.setTextColor(255, 255, 255);
  doc.setFont("Goldman-Bold", "bold");
  doc.setFontSize(43);
  doc.text(95, 30, "F L Y   J E D I");
  doc.setFontSize(17);
  doc.text(200, 80, "PNR");
  doc.text(20, 60, "Name");
  doc.text(20, 80, "Itinerary");
  doc.text(20, 120, "Time of Departure");
  doc.text(20, 140, "Landing Time");
  doc.text(20, 100, "Boarding Time");
  doc.text(200, 100, "Seat");
  doc.text(20, 160, "Departure Date")

  doc.setFontSize(20);
  doc.text(220, 80, pnr);
  doc.text(55, 60, name);
  doc.text(55, 80, itinerary);
  doc.text(85, 120, dtime);
  doc.text(85, 160, date);
  doc.text(85, 100, bTime);
  doc.text(220, 100, seat);
  doc.text(85, 140, ltime);

  doc.setFontSize(15);
  doc.text(140, 170, "Boarding Gate closes 10 minutes prior departure");
  doc.setFontSize(12);
  doc.text(150, 157, "Frisking of person and checking of hand baggage");
  doc.text(165, 162, "is mandatory for all passengers");
  doc.setFontSize(25);
  doc.text(125, 190, "E-TKT");
  doc.text(25, 190, "Boarding Pass");
  doc.setFontSize(20);
  doc.text(180, 190, "May the Force be with you");
  doc.save(pnr + "_" + tripId + ".pdf");
}
