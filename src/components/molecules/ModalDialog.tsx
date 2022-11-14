import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import CircularButton from "../atoms/buttons/CircularButton";
import RectangularButton from "../atoms/buttons/RectangularButton";
import { handleBuyOrder } from "../../services/brokerService";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  ticker: string;
  price: number;
  name: string;
}

const ContentContainer = styled.div`
  display: flex;
`;
const InfoContainer = styled.div`
  width: 50%;
`;

const GraphContainer = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 15px 0 15px 0;
  width: 50%;
`;
const Graph = styled.div`
  width: 50vh;
  height: 50vh;
  background-color: #3f433a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CancelButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

// TODO move to mui theme file.
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalDialog({
  isOpen,
  handleClose,
  ticker,
  price,
  name,
}: Props) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CancelButtonContainer>
            <CircularButton handleClick={handleClose}>
              <>X</>
            </CircularButton>
          </CancelButtonContainer>
          <ContentContainer>
            <InfoContainer>
              <p>
                Daily pick {ticker} {name}
              </p>
              <p>Price: {price}</p>
              <p>Entry Date:</p>
              <p>Symbol:</p>
              <p>Chart at Entry:</p>
              <p>Time:</p>
              <p>Shares:</p>
              <p>Entry Price:</p>
              <p>Size:</p>
              <RectangularButton
                handleClick={() => handleBuyOrder(ticker)}
                label={`BUY $1 ${name}`}
                variant="contained"
                size="small"
                color="info"
              />
            </InfoContainer>
            <GraphContainer>
              <Graph>Graph</Graph>
            </GraphContainer>
          </ContentContainer>
        </Box>
      </Modal>
    </div>
  );
}