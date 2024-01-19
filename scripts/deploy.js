const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory(
        'WavePortal'
    );
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.parseEther('0.001'),
    });

    await waveContract.waitForDeployment();

    const waveContractAddress = await waveContract.getAddress();

    console.log('WavePortal address: ', waveContractAddress);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();
