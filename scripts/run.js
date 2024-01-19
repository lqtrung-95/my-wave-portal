const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory(
        'WavePortal'
    );
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.parseEther('0.1'),
    });
    await waveContract.waitForDeployment();

    const contractAddress = await waveContract.getAddress();

    console.log('Contract deployed to:', contractAddress);

    /*
     * Get Contract balance
     */
    let contractBalance = await hre.ethers.provider.getBalance(contractAddress);
    console.log('Contract balance:', hre.ethers.formatEther(contractBalance));

    /*
     * Send Wave
     */
    let waveTxn = await waveContract.wave('A message!');
    await waveTxn.wait();

    /*
     * Get Contract balance to see what happened!
     */
    contractBalance = await hre.ethers.provider.getBalance(contractAddress);
    console.log('Contract balance:', hre.ethers.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
