import * as Web3Utils from "web3-utils";
import { Address } from "./types";

export const isAddress = (address: Address): boolean => {
  const addr = address.toLowerCase();
  return addr[0] === "0" && addr[1] === "x" && Web3Utils.isAddress(addr);
};

export const isBigNumber = (number: string | number): boolean => {
  try {
    Web3Utils.toBN(number);
    return true;
  } catch {
    return false;
  }
};
