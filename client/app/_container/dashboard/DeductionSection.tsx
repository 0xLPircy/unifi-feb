'use client';
import { ChainSubtotal, DeductionTotal } from '@/app/_components';
import { chains, deductions } from '@/app/_lib/constants';
import Image from 'next/image';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeductionSection = () => {
  const transferHandler = () => {
    // TRANSFER CLICKED

    setTimeout(() => {
      // FUNCTION FOR TRANSFER
      // INTEGRA
      const resolveAfter3Sec = new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );
      toast.promise(resolveAfter3Sec, {
        pending: 'Transfer Initiated',
        success: 'Transfer Successfull',
        error: 'Transfer Unsuccessfull'
      });
    }, 100);
  };
  return (
    <div className="h-fit flex flex-col gap-3 m-4 p-4 rounded-[16px] bg-[#FECE00] border-[0.9px] border-[#e2c02a]">
      <h2 className="text-center text-[24px]">Deduction detailed by chain:</h2>
      {/* deduction content */}
      <div className="flex flex-col items-center">
        {/* deduction*/}
        <div className="w-[366px]">
          {/* heading */}
          <div className="grid grid-flow-col bg-[#ffffff] w-[366px] rounded-[8px] mb-[8px]">
            <h4 className="w-[220px] p-[6px] text-center text-[21px]  border-r-[1px] border-solid border-[#1C1B1F]">
              Chain
            </h4>
            <h4 className="text-center text-[21px] p-[6px] w-[146px]">
              Subtotal
            </h4>
          </div>
          {/* chain - subtotal */}
          <div className="flex flex-col overflow-y-scroll h-[450px]">
            {deductions.map((chain) => (
              <ChainSubtotal chain={chain} key={chain.chain} />
            ))}
          </div>
        </div>
        {/* deduction total */}
        <DeductionTotal deductions={deductions} />
        <button
          onClick={() => {
            transferHandler();
          }}
          className="mt-2 w-[100%] text-[21px] font-normal 
          bg-[#0BD262] text-[#000000] 
          hover:shadow-[0px_6px_0px_0px_#091D31] hover:mb-1 h-fit rounded-[8px] px-8 py-2 hover:pt-[6px] flex items-center justify-center gap-4 border-[1px] border-solid border-[#091D31] z-50"
        >
          <h4>Transfer Now</h4>
          <Image
            src={'/rocket.svg'}
            alt="transfer"
            width={21}
            height={21}
            className=""
          />
        </button>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default DeductionSection;
