import styled from "styled-components";
import Modal from "./Modal";

const GraphContainer = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Graph = styled.div`
  background-color: #3f433a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  enableOnClickOutside?: boolean;
}

export default function ImageModal({
  isOpen,
  onClose,
  image,
  enableOnClickOutside,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      enableOnClickOutside={enableOnClickOutside}
    >
      <GraphContainer>
        <Graph>
          <img src={image} />
        </Graph>
      </GraphContainer>
    </Modal>
  );
}
