const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("lab2.sol", () => {
    let contractFactory;
    let contract;
    let owner;
    let alice;
    let bob;
    let initialSupply;
    let ownerAddress;
    let aliceAddress;
    let bobAddress;

    beforeEach(async () => {
        [owner, alice, bob] = await ethers.getSigners();
        initialSupply = ethers.utils.parseEther("100000");
        contractFactory = await ethers.getContractFactory("lab2");
        contract = await contractFactory.deploy(initialSupply);
        ownerAddress = await owner.getAddress();
        aliceAddress = await alice.getAddress();
        bobAddress = await bob.getAddress();
    });

    describe("Correct setup", () => {
        it("should be named 'lab2", async () => {
            const name = await contract.name();
            expect(name).to.equal("lab2");
        });
        it("should have correct supply", async () => {
            const supply = await contract.totalSupply();
            expect(supply).to.equal(initialSupply);
        });
        it("owner should have all the supply", async () => {
            const ownerBalance = await contract.balanceOf(ownerAddress);
            expect(ownerBalance).to.equal(initialSupply);
        });
    });

    describe("Core", () => {
        it("owner should transfer to Alice and update balances", async () => {
            const transferAmount = ethers.utils.parseEther("1000");
            let aliceBalance = await contract.balanceOf(aliceAddress);
            expect(aliceBalance).to.equal(0);
            await contract.transfer(aliceAddress, transferAmount);
            aliceBalance = await contract.balanceOf(aliceAddress);
            expect(aliceBalance).to.equal(transferAmount);
        });
        it("owner should transfer to Alice and Alice to Bob", async () => {
            const transferAmount = ethers.utils.parseEther("1000");
            await contract.transfer(aliceAddress, transferAmount); // contract is connected to the owner.
            let bobBalance = await contract.balanceOf(bobAddress);
            expect(bobBalance).to.equal(0);
            await contract.connect(alice).transfer(bobAddress, transferAmount);
            bobBalance = await contract.balanceOf(bobAddress);
            expect(bobBalance).to.equal(transferAmount);
        });
    });
	
	describe("StructArrayTest", function() { 

        it("Test Push", async function () {
          expect((await contract.revealArray()).length).to.equal(0);
          await contract.setStruct(
            {
                x1: true, 
                x2: BigNumber.from(1),
                x3: alice.address, 
                x4: 450912586
            }
        );
          expect((await contract.revealArray()).length).to.equal(1);
        });
      });
	
});
