const qr = require("qrcode");
const main = async () => {
  const assetTrackerContractFactory = await hre.ethers.getContractFactory(
    "AssetTracker"
  );
  const assetTrackerContract = await assetTrackerContractFactory.deploy();
  await assetTrackerContract.deployed();
  console.log("Contract deployed to:", assetTrackerContract.address);

  let assetCreate = await assetTrackerContract.createAsset(
    "covishield",
    "vaccine",
    0,
    50,
    1,
    "serum",
    "rohit",
    "mumbai",
    "gujrat"
  );
  console.log("asset Created", assetCreate.hash);

  let assets = await assetTrackerContract.getAllAssets();
  console.log("assets", assets);
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
