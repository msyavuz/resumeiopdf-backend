import axios from "axios";
import { jsPDF } from "jspdf";

export async function getBufferFromSID(sid: string) {
    const imageUrl = `https://ssr.resume.tools/to-image/ssid-${sid}-1.png?size=1800`;
    const linksUrl = `https://ssr.resume.tools/meta/ssid-${sid}`;

    const imageRes = await axios.get(imageUrl, {
        responseType: "arraybuffer",
    });
    const linkRes = await axios.get(linksUrl, {
        responseType: "json",
    });
    const imageData = await imageRes.data;
    const linkData = await linkRes.data;

    const width = linkData.pages[0].viewport.width;
    const height = linkData.pages[0].viewport.height;
    const doc = new jsPDF("p", "px", [width, height]);
    doc.addImage(imageData, "PNG", 0, 0, width, height);

    for (let link of linkData.pages[0].links) {
        doc.rect(link.left, height - link.top, link.width, -link.height, null);
        doc.link(link.left, height - link.top, link.width, -link.height, {
            url: link.url,
        });
    }

    const res = doc.output("arraybuffer");
    return res;
}
