import React from "react";
import { FiDownload, FiExternalLink, FiFileText } from "react-icons/fi";

const resumePDF = "/NitinKumar.pdf";

const ResumeApp = () => (
  <div className="nkos-resume-app">
    <div className="nkos-document-toolbar">
      <div className="nkos-document-name"><FiFileText /><b>NitinKumar.pdf</b><small>2-page verified resume</small></div>
      <div>
        <a href={resumePDF} target="_blank" rel="noreferrer"><FiExternalLink /><span>Open PDF</span></a>
        <a href={resumePDF} download="NitinKumar.pdf"><FiDownload /><span>Download</span></a>
      </div>
    </div>
    <iframe
      className="nkos-pdf-viewer"
      src={`${resumePDF}#view=FitH&toolbar=1&navpanes=0`}
      title="Nitin Kumar resume PDF"
    />
  </div>
);

export default ResumeApp;
