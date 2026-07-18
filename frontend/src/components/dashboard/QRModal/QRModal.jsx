import QRCode from "react-qr-code";
import { useRef } from "react";
import { useToast } from "../../../hooks/useToast";

import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button/Button";

import styles from "./QRModal.module.css";
import { toPng } from "html-to-image";


export default function QRModal({
  open,
  url,
  onClose,
}) {

    const qrRef = useRef(null);
    const toast = useToast(); 
    if (!url) return null;
    
    async function downloadQR() {
      try {
        const node = qrRef.current;

        if (!node) {
          toast.error("Unable to generate QR code.");
          return;
        }

        const dataUrl = await toPng(node);

        const link = document.createElement("a");

        link.download = `${url.short_code}.png`;
        link.href = dataUrl;
        link.click();

        toast.success("QR code downloaded.");
      } catch {
        toast.error("Failed to download QR code.");
      }
    }
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="QR Code"
    >
      <div className={styles.content}>

        <div
          ref={qrRef}
          className={styles.qrContainer}
        >
          <QRCode
            value={url.short_url}
            size={220}
          />
        </div>

        <p className={styles.url}>
          {url.short_url}
        </p>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            onClick={async () => {
              await navigator.clipboard.writeText(url.short_url);
              toast.success("Link copied!");
            }}
          >
            Copy Link
          </Button>

            <Button onClick={downloadQR}>
                Download
            </Button>
        </div>

      </div>
    </Modal>
  );
}