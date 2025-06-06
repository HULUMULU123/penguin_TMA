// src/components/CreditPurchaseModal.tsx

import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

interface CreditPurchaseModalProps {
  onClose: () => void;
}

function CreditPurchaseModal(props: CreditPurchaseModalProps) {
  return (
    <Overlay onClick={props.onClose}>
      <ModalContent
        onClick={function (e) {
          e.stopPropagation();
        }}
      >
        <CloseButton onClick={props.onClose}>×</CloseButton>
        <h2>Покупка кредитов</h2>
        <p>Выберите количество кредитов для покупки:</p>
        <div>
          <button onClick={props.onClose}>10 кредитов — 199 ₽</button>
          <button onClick={props.onClose}>50 кредитов — 899 ₽</button>
          <button onClick={props.onClose}>100 кредитов — 1699 ₽</button>
        </div>
      </ModalContent>
    </Overlay>
  );
}

export default CreditPurchaseModal;
