import { useState, useEffect } from "react";
import { format } from "date-fns";
import formatDistanceToNowKo from "utils/functions/formatDistanceToNowKo";

const useSetTimeDistance = (createdAt: number, modifiedAt: number) => {
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(`${formatDistanceToNowKo(createdAt)} 전`);
      setDate(format(createdAt, 'yyyy년 MM월 d일 H시 m분'))
    } else {
      setTimeAgo(`${formatDistanceToNowKo(modifiedAt)} 전 수정됨`);
      setDate(format(modifiedAt, 'yyyy년 MM월 d일 H시 m분'))
    }
  }, [createdAt, modifiedAt, setTimeAgo]);

  return { timeAgo, date }
}

export default useSetTimeDistance