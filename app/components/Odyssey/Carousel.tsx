import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { BadgeMint } from "../Buttons/ActionButton";
import { useContractWrite,  useAccount, useContract } from '@starknet-react/core';
import ErrorMessage from "./ErrorMessage";
import LoadingScreen from "./LoadingScreen";
import SuccessMessage from "./SuccessMessage";
import CarbonableBadgeABI from "../../abi/testnet/CarbonableBadge_abi.json";
import type { Abi } from "starknet";
import type { Badge, BadgeContract } from "@prisma/client";
import { IPFS_GATEWAY } from "~/utils/links";
import ConnectDialog from "../Connection/ConnectDialog";

interface Signature {
    low: string,
    high: string
}

export default function Carousel({badges, contract}: {badges: Badge[], contract: BadgeContract}) {
    const minterContractAddress = contract?.minter;
    const badgeContractAddress = contract?.badge;

    const [signature, setSignature] = useState({ low: '0', high: '0' });
    const [badgeType, setBadgeType] = useState(0);
    const [menu, setMenu] = useState<ReactNode | null>(null);
    const [currentTransactionHash, setCurrentTransactionHash] = useState('');
    const { account, address } = useAccount();
    let [isOpen, setIsOpen] = useState(false);

    const { writeAsync } = useContractWrite({ 
        calls: {
            contractAddress: minterContractAddress,
            entrypoint: 'claim',
            calldata: [signature.low, signature.high, badgeType]
        }
    })
    const { contract:badgeContract } = useContract({
        address: badgeContractAddress,
        abi: CarbonableBadgeABI as Abi
    })
    const [activeSlide, setActiveSlide] = useState(0);

    const handleClick = (index: number) => {
        setActiveSlide(index);
    }

    useEffect(() => {
        writeAsync().then((transaction: any) => {
            const transactionHash = transaction.transaction_hash;
            setCurrentTransactionHash(transactionHash);
        })
    }, [signature, badgeType, writeAsync]);

    useEffect(() => {
        if (currentTransactionHash) {
            checkTransactionStatus();
            const interval = setInterval(() => {
                checkTransactionStatus();
            }, 3000)
            function checkTransactionStatus() {
                const url = contract?.networkId === "mainnet" ? "https://alpha-mainnet.starknet.io/feeder_gateway/get_transaction_receipt?transactionHash=" : "https://alpha4.starknet.io/feeder_gateway/get_transaction_receipt?transactionHash=";
                fetch(url + currentTransactionHash).then(async (response) => {
                    const data = await response.json();
                    if (data.status === 'ACCEPTED_ON_L2' || data.status === 'ACCEPTED_ON_L1') {
                        setMenu(<SuccessMessage strong="Success." text="Your badge has been minted!" action={() => setMenu(null)} />);
                        setCurrentTransactionHash('');
                    }
                    else {
                        setMenu(<SuccessMessage strong={data.status} text="Waiting for the transaction to be accepted. This may take a few minutes." buttonText="Please wait..." />);
                    }
                })
            }
            return () => clearInterval(interval);
        }
    }, [currentTransactionHash]);

    const handleMint = async (badge: any) => {
        setMenu(<LoadingScreen />)

        if (!badgeContract){
            return setMenu(null);
        }
        if (!account) {
           setIsOpen(true);
           return setMenu(null);
        }
        // Check if the user has already minted the badge
        const balance = parseInt((await badgeContract.functions.balanceOf(address, [badge.token_id, 0])).balance.low);
        if (balance > 0) return setMenu(<ErrorMessage strong="You already have minted this badge." text="You can only mint each badge one time." action={() => setMenu(null)} />);

        // Check if the user is whitelisted
        const res = await fetch(`odyssey/sign/${account.address}/${badge.token_id}`)
        const signature: Signature = await res.json();
        if (!signature.low || !signature.high) return setMenu(<ErrorMessage strong="You are currently not in the whitelist." text="To become a Green Pioneer you needed to complete the quest #GREEN PIONEER BADGE WL QUEST on Crew3 before January 10th. Stay tuned on discord and Twitter for next badges." action={() => setMenu(null)} />);

        // Mint the badge
        setMenu(<SuccessMessage strong="Success." text="Please approve the transaction" action={() => setMenu(null)} />)
        setSignature(signature);
        setBadgeType(badge.token_id);
    }

    return (
        <div className="mb-20 mt-8">
            <div id="assets" className="grid justify-items-center place-items-center w-11/12 max-w-screen-2xl scroll-mt-12 mx-auto ">
                <div className="w-60 md:w-full max-w-2xl grid grid-cols-1 place-content-center justify-items-center gap-x-8">
                    {minterContractAddress && badges.map((badge: Badge, index: number) => (
                        <div key={`badge_${index}`} className="text-center">
                            <div className="relative px-2 flex justify-center items-center outline-0 my-2">
                                <img alt={`Carbonable Badge ${index}`} onMouseOver={() => handleClick(index)} src={IPFS_GATEWAY + badge.image} className={index === activeSlide ? "rounded-lg w-full h-40 z-0" : "rounded-lg w-full h-40 z-0"}   />
                                { (badge.mintable && index === activeSlide ) &&
                                    <div className="opacity-0 hover:opacity-100 absolute h-full bg-green min-w-fit z-20 uppercase font-inter font-bold text-black w-11/12 py-2 px-2 top-0 text-[8px] md:text-xs lg:px-3 rounded-lg"> 
                                        <div className="grid grid-flow-row h-full items-stretch">
                                            <p className="font-trash font-bold text-3xl self-start">{badge.name1} <br /></p> 
                                            <p className="font-americana font-thin text-2xl self-start">{badge.name2}</p>
                                            <BadgeMint className=" place-self-center self-end w-28" onClick={() => handleMint(badge)}>
                                                Mint SBT
                                            </BadgeMint>
                                        </div> 
                                    </div>
                                }
                            </div>
                            <div className="capitalize font-inter text-xl mt-4">{badge.name1} {badge.name2}</div>
                        </div>
                    ))}
                </div>
            </div>
            {menu}
            <ConnectDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
