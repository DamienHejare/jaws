import type { NextApiRequest, NextApiResponse } from "next";
import { getBreakoutsByDailyRun } from "../../../../../db/breakoutsEntity";
import { getDailyRun } from "../../../../../db/dailyRunsEntity";
import { getError } from "../../../../../db/errorsEntity";
import {
  getRatingsForDailyRunAndUser,
  extendBreakoutsWithRatings,
} from "../../../../../lib/ratingHandler";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req;
  const { date, time } = query;

  const runId = `${date as string}_${time as string}`;

  const dailyRun = await getDailyRun(runId);
  if (!dailyRun) {
    return res.status(404).json(null);
  }

  let extraData = {};

  const error = await getError(runId);
  if (error) {
    extraData = { error: error };
  } else {
    const breakouts = await getBreakoutsByDailyRun(runId);

    const userRef = "ludde@hejare.se";
    const ratingsForUser = await getRatingsForDailyRunAndUser(runId, userRef);

    const breakOutsWithRatings = extendBreakoutsWithRatings(
      breakouts,
      ratingsForUser,
    );
    extraData = {
      breakouts: breakOutsWithRatings,
    };
  }

  res.status(200).json({
    ...dailyRun,
    ...extraData,
  });
}
