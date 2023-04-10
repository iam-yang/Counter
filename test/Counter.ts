import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Count = await ethers.getContractFactory("Count");
    const count = await Count.deploy();
    await count.deployed();

    return { count, owner, otherAccount };
  }

  describe("Deployment and test", function () {
    it("Should set 0", async function () {
      const { count } = await deployContract();
      expect(await count.count()).to.equal(0);
    });

    it("Should get 1 after add", async function () {
      const { count } = await deployContract();
      await count.increment();
      expect(await count.count()).to.equal(1);
    });

    it("Should fail if oprator is not owner", async function () {
      const { count, otherAccount } = await deployContract();
      const ohterCount = count.connect(otherAccount);

      await expect(ohterCount.increment()).to.be.revertedWith(
        "only owner can add count"
      );
    });
  });
});
