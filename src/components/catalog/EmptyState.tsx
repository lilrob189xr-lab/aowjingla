import DiamondMark from "./DiamondMark";
import InquiryActions from "./InquiryActions";

export default function EmptyState({ message, showContact = true }: { message: string; showContact?: boolean }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state__icon"><DiamondMark size={44} /></span>
      <p className="empty-state__msg">{message}</p>
      {showContact && (
        <>
          <p className="empty-state__sub">สอบถามสินค้าได้ทาง LINE หรือโทรหาสาขา</p>
          <InquiryActions />
        </>
      )}
    </div>
  );
}
