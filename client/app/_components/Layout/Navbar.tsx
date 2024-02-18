'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AccountInfo, ConnectWallet, NotifTransact } from '..';
import Link from 'next/link';
import { curEns, currentAddress, notifs } from '../../_lib/constants';
import { useAuthCore } from '@particle-network/auth-core-modal';

const Navbar = () => {
  const currentPage = usePathname();
  // console.log(currentPage);
  const [notifClicked, setNotifClicked] = useState(false);
  console.log(currentPage);
  const [unreadNotifs, setUnreadNotifs] = useState(0);
  useEffect(() => {
    notifs.map((notif) => {
      if (notif.status == 'unread') {
        setUnreadNotifs(unreadNotifs + 1);
      }
    });
  }, [notifs]);

  const router = useRouter();

  const handleRedirectHome = () => {
    router.push('/');
  };

  const authCore = useAuthCore();

  return (
    <div className="w-[100vw] flex flex-row items-center justify-between py-[6px] pl-32 pr-20 border-b-[1px] border-solid border-[#1c1b1f] bg-[#f1f1f1] z-40">
      {/* logo name */}
      <div
        className="self-center place-self-start grid grid-flow-col gap-[10px] w-fit"
        onClick={handleRedirectHome}
      >
        <Image
          src={'/logo.svg'}
          alt="logo"
          width={50}
          height={50}
          className="self-center place-self-center"
        />
        <h2 className="text-[39px] self-center place-self-center">UNIFY</h2>
      </div>
      {/* nav name notif */}
      {(currentPage == '/dashboard' ||
        currentPage == '/mynfts' ||
        currentPage == '/walletInfo') && (
          <div className="grid grid-flow-col gap-8 self-center place-self-end">
            {/* nav items */}
            <div className="grid grid-flow-col self-center place-self-center pl-8 gap-8">
              <Link
                href={'/dashboard'}
                className={`text-[21px] hover:border-b-2 hover:font-semibold hover:cursor-pointer ${currentPage == '/dashboard' ? 'border-b-2' : ''
                  } border-solid border-[#1c1b1f]`}
              >
                Transfer
              </Link>
              <Link
                href={'/walletInfo'}
                className={`text-[21px] hover:border-b-2 hover:font-semibold hover:cursor-pointer
            ${currentPage == '/walletInfo' ? 'border-b-2' : ''
                  } border-solid border-[#1c1b1f]`}
              >
                Info
              </Link>
              {/* <Link
              href={'/mynfts'}
              className={`text-[21px] hover:border-b-2 hover:font-semibold hover:cursor-pointer ${
                currentPage == '/mynfts' ? 'border-b-2' : ''
              } border-solid border-[#1c1b1f]`}
            >
              My NFTs
            </Link> */}
            </div>
            {/* name notif */}
            <div className="rounded-full border-[1px] border-[#48637C] border-solid grid grid-flow-col">
              {/* name */}
              <AccountInfo />
              {/* <div className="px-5 grid grid-flow-col gap-[10px] py-[6px]">
                <Image
                  src={'/wallet.svg'}
                  alt="wallet"
                  width={24}
                  height={24}
                  className="self-center place-self-center"
                />
                <h3 className="text-[21px] self-center place-self-center">
                  {curEns}
                </h3>
              </div> */}
              {/* notif */}
              <div
                className="px-5 grid grid-flow-col gap-[10px] bg-[#48637C] hover:font-normal hover:opacity-75 py-[6px] rounded-r-full text-[#ffffff] hover:cursor-pointer"
                onClick={() => authCore.openWallet()}
              >
                <Image
                  src={'/notifications.png'}
                  alt="notif bell"
                  width={18}
                  height={18}
                  className="place-self-center self-center"
                />
                <h3 className="text-[21px]">
                  {unreadNotifs ? unreadNotifs : 'No'} New
                </h3>
              </div>
              {/* notif drop down */}
              {notifClicked && (
                <div className="z-50 absolute bg-[#f1f1f1b9] p-4 mt-[48px] h-[500px] rounded-[24px] border-[1px] border-solid border-[#cfe3e2] flex flex-col gap-[16px] overflow-scroll">
                  {/* head cross */}
                  <div className="w-[100%] grid grid-flow-col gap-3 self-start place-self-center p-[10px] rounded-full bg-[#48637C]">
                    <div className="grid grid-flow-col text-[#ffffff] gap-1">
                      <Image
                        src={'/bell.svg'}
                        width={15}
                        height={15}
                        alt="updates"
                        className="self-center place-self-start ml-[5px]"
                      />
                      <h3 className="text-[15px] self-center place-self-start">
                        Updates
                      </h3>
                    </div>
                    <Image
                      src={'/close.svg'}
                      alt="cross"
                      width={24}
                      height={24}
                      className="self-center place-self-end hover:opacity-75 cursor-pointer hover:p-[1px] "
                      onClick={() => setNotifClicked(!notifClicked)}
                    />
                  </div>
                  {/* transaction */}
                  {notifs.map((notif) => {
                    return <NotifTransact key={notif} notif={notif} />;
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      {currentPage == '/' && (
        <Link
          href={'/getStarted'}
          className="text-[21px] font-normal bg-[#48637C] text-[#ffffff] hover:shadow-[0px_6px_0px_0px_#091D31] h-fit w-fit rounded-[8px] px-8 py-2 flex gap-4 justify-center border-[1px] border-solid border-[#091D31] z-50"
        >
          Get Started
        </Link>
      )}
      {currentPage == '/getStarted' && (
        <div>
          <ConnectWallet />
        </div>
      )}
      {/* {(currentPage == '/create' ||
        currentPage == '/login' ||
        currentPage == '/loader') && (
          <div className="flex gap-2 items-center">
            <div className="bg-[#777777] rounded-full p-4"></div>
            <h4 className="text-[18px]">
              {currentAddress.slice(0, 5)}...{currentAddress.slice(38, 42)}
            </h4>
          </div>
        )} */}
    </div>
  );
};

export default Navbar;
