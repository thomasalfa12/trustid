import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount, useConnect } from "wagmi";
import Image from "next/image";
import React from "react";

interface Role {
  id: string;
  granted: boolean;
}

// Define the Home component
const Home: NextPage = () => {
  const STUDENTSBT = "STUDENT_SBT";
  const [isStudentSBT, setIsStudentSBT] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<string>("");
  const [verifyPressed, setVerifyPressed] = useState(false);

  // const truncateAddress = (address: string) => {
  //   return `${address.substring(0.2)}...${address.substring(
  //     address.length -4,
  //     address.length
  //   )}`;
  // };

  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    const requestAccount = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
      } catch (error) {
        console.error("Error requesting account:", error);
      }
    };

    requestAccount();
  }, []);

  const rules = [
    {
      roleId: STUDENTSBT,
      minToken: "1",
      chainId: 11155111,
      contractAddress: "0x926ebf13ab2823be391cbd8d02deeee7c7b552d4",
      type: "ERC1155",
    },
  ];

  const getRulesStatus = async () => {
    setLoading(true);
    setVerifyPressed(true);
    try {
      const isConnected = window.ethereum.isConnected();
      if (!isConnected) {
        console.error("Tidak terhubung ke Ethereum");
        // Tampilkan pesan kesalahan kepada pengguna
        return;
      }

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      if (process.env.NEXT_PUBLIC_COLLAB__API_KEY) {
        headers["X-API-KEY"] = process.env.NEXT_PUBLIC_COLLAB__API_KEY;
      } else {
        headers["X-API-KEY"] = "TjUgVmrF06717v9l.Zm2o1BHXLteVMm90vsGEt";
      }

      const response = await fetch(
        "https://api.collab.land/access-control/check-roles",
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            account: address,
            rules,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch roles status");
      }

      const result = await response.json();
      console.log(result);
      setLoading(false);

      for (const role of result.roles) {
        if (role.granted) {
          switch (role.id) {
            case STUDENTSBT:
              setIsStudentSBT(true);
              break;
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      // Tampilkan pesan kesalahan kepada pengguna
    }
  };

  return (
    <div>
      {/* Head section for page metadata */}
      <Head>
        <title>TrustId</title>
      </Head>

      <header>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a></a>
                </li>
                <li>
                  <Link
                    href="https://mint-page-ijazah.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    passHref
                  >
                    mint-page
                  </Link>
                </li>
                <li>
                  <a>About</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost text-xl">TrustId</a>
          </div>
          <div className="navbar-end m-4">
            <ConnectButton />
          </div>
        </div>
      </header>

      <main>
        <div
          className="section"
          style={{
            marginTop: "-150px",
          }}
        >
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">Revitalize Your Identity</h1>
                <p className="py-6">
                  PERANCANGAN SISTEM VERIFIKASI IDENTITAS DIGITAL DENGAN
                  PEMANFAATAN SOULBOUND TOKEN (SBT) BERBASIS BLOCKCHAIN ETHEREUM
                  DALAM KONTEKS WEB 3.0 ERAs
                </p>
              </div>
            </div>
          </div>
        </div>

        {isConnected && (
          <div
            className="section"
            style={{
              marginTop: "-227px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="row">
              <div className="col">
                <div className="card w-96 bg-base-100 shadow-xl">
                  <figure>
                    <Image
                      layout="responsive"
                      src="/nft.png"
                      width="500"
                      height="500"
                      alt="RainbowKit Demo NFT"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      Silahkan Cek Keaslian Ijazah Anda!
                    </h2>
                    {loading && <p>Loading ...</p>}
                    {verifyPressed && !loading && isStudentSBT && (
                      <p>
                        Anda Terverifikasi Sebagai Lulusan Universitas Sriwijaya
                      </p>
                    )}
                    {verifyPressed && !loading && !isStudentSBT && (
                      <p>Ijazah anda tidak valid</p>
                    )}
                    <div className="card-actions justify-end">
                      {!verifyPressed && (
                        <button
                          style={{ marginTop: 24 }}
                          className="btn btn-active"
                          onClick={getRulesStatus}
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer
        className="footer footer-center p-10 text-base-content rounded"
        style={{
          marginTop: "200px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
