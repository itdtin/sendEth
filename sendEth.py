import os
import argparse


def sendTo(address: str, amount: str):
    return """
import hre from "hardhat";
import { BigNumberish } from "ethers";

export async function sendETH(_destinationAddress: string, _amount: BigNumberish) {
  const signers = await hre.ethers.getSigners();
  const governance = signers[0].address;
  console.log("governance: ", governance);
  const nonce = await signers[0].getTransactionCount();

  console.log("sending...");
  const tx = await signers[0].sendTransaction({
    to: _destinationAddress,
    value: _amount
  });
  tx.wait()
  console.log("tx: ", tx)
}

if (require.main === module) {
  sendETH("%s", hre.ethers.utils.parseEther("%s"))
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
    """ % (address, amount)


def create_secrets(wallet: str):
    secret = """{"pk": "%s"}""" % (wallet)
    with open(f"./secrets.json", "w+") as file:
        file.writelines(secret)


def create_send(to: str, amount: str) -> None:
    with open(f"./sendETH.ts", "w+") as file:
        file.writelines(sendTo(to, amount))


def read_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-wallet", dest="wallet", required=True)
    parser.add_argument("-addressTo", dest="addressTo", required=True)
    parser.add_argument("-amount", dest="amount", required=True)
    return parser.parse_args()


def create(args):
    create_secrets(args.wallet)
    create_send(args.addressTo, args.amount)


if __name__ == '__main__':

    args = read_args()
    create(args)
    stream = os.popen('npx hardhat run sendETH.ts --network ethTestnet')
    output = stream.read()
    print(output)
