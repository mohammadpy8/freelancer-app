import React from "react";
import useMoveBack from "../hooks/useMoveBack";
import { HiArrowCircleRight } from "react-icons/hi";

function NotFound() {
  return (
    <div className="sm:max-w-sm justify-center pt-10">
      <div>
        <h1 className="text-xl font-bold text-secondary-700 mb-8">
          صفحه ای که دنبالش بودید پیدا نشد.!!
        </h1>
        <button onClick={useMoveBack()} className="flex items-center gap-x-6">
          <HiArrowCircleRight className="w-6 h-6 text-primary-800" />
          <span>برگشت</span>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
