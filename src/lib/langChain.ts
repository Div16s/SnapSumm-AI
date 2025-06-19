import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

const fetchAndExtractPDFText = async (pdfUrl: string) => {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();

    const arrayBuffer = await blob.arrayBuffer();
    const pdfLoader = new PDFLoader(new Blob([arrayBuffer]));

    const documents = await pdfLoader.load();

    // combine all pages
    return documents.map(doc => doc.pageContent).join('\n');
}

export default fetchAndExtractPDFText;