import React from "react";

// import { Container } from './styles';

interface Props {
  title: string;
  message: string;
}

const AlertaErro: React.FC<Props> = ({ title, message }) => {
  return (
    <div className="flex my-4 rounded-sm w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-4 py-2 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:px-4">
      <div className="w-full">
        <h5 className="font-semibold text-[#B45454]">{title}</h5>
        <ul>
          <li className="leading-relaxed text-[#CD5D5D]">{message}</li>
        </ul>
      </div>
    </div>
  );
};

export default AlertaErro;
