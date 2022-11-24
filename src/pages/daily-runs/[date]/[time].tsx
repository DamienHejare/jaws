import styled from "styled-components";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetch from "node-fetch";
import { handleResult } from "../../../util";
import { DailyRunDataType } from "../../../db/dailyRunsMeta";
import {
  BreakoutWithRatingDataType,
  ExistingBreakoutDataType,
} from "../../../db/breakoutsEntity";
import BreakoutsList, {
  PartialBreakoutDataType,
} from "../../../components/organisms/BreakoutsList";
import { handleLimitPrice } from "../../../util/handleLimitPrice";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// eslint-disable-next-line no-unused-vars
enum STATUS {
  LOADING = "LOADING",
  READY = "READY",
}

interface DailyRunFetchDataType extends DailyRunDataType {
  breakouts: ExistingBreakoutDataType[];
}

const DailyRun: NextPage = () => {
  const router = useRouter();
  const { date, time } = router.query;
  const [dataFetchStatus, setDataFetchStatus] = useState(STATUS.LOADING);
  const [dailyRun, setDailyRun] = useState<DailyRunDataType>();
  const [breakoutsData, setBreakoutsData] = useState<PartialBreakoutDataType[]>(
    [],
  );

  useEffect(() => {
    fetch(`/api/data/daily-runs/${date as string}/${time as string}`)
      .then(handleResult)
      .then((result: DailyRunFetchDataType) => {
        setDailyRun(result);
        let newBreakoutsData = result.breakouts.map(
          ({
            image,
            tickerRef,
            relativeStrength,
            breakoutValue,
            configRef,
            _ref: breakoutRef,
            rating,
          }: BreakoutWithRatingDataType) => ({
            breakoutRef,
            tickerRef,
            relativeStrength,
            breakoutValue: handleLimitPrice(breakoutValue),
            configRef,
            image,
            rating,
          }),
        );
        newBreakoutsData = newBreakoutsData.sort((a, b) =>
          b.tickerRef < a.tickerRef ? 1 : b.tickerRef > a.tickerRef ? -1 : 0,
        );
        setBreakoutsData(newBreakoutsData);
        setDataFetchStatus(STATUS.READY);
      })
      .catch(console.error);
  }, [date, time]);

  return (
    <PageContainer>
      <h1>DAILY RUN</h1>
      <h3>
        Date: {date} (Time: {time})
      </h3>
      {dailyRun && dataFetchStatus === STATUS.READY && (
        <div>
          <div>
            <span>Id: {dailyRun.runId}</span>
          </div>
          <div>
            <span>Status: {dailyRun.status}</span>
          </div>
          <div>
            <span>
              Initiated:{" "}
              {new Date(dailyRun.timeInitiated)
                .toUTCString()
                .replace(" GMT", "")}
            </span>
            <span>
              Ended: {dailyRun.timeEnded} ({dailyRun.duration}s)
            </span>
          </div>
        </div>
      )}
      <BreakoutsList data={breakoutsData} />
    </PageContainer>
  );
};

export default DailyRun;