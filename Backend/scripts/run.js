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
    "1",
    "serum"
  );
  await assetCreate.wait();
  let data = {
    uuid: 1,
    name: "covishield",
    description: "vaccine",
    manufacturer: "serum",
  };

  let strData = JSON.stringify(data);

  qr.toString(strData, { type: "terminal" }, function (err, code) {
    if (err) return console.log("error occurred");

    console.log(code);
  });

  qr.toDataURL(strData, function (err, code) {
    if (err) return console.log("error occurred");

    console.log(code);
  });
  console.log("Asset Created");

  let assetbyuuid = await assetTrackerContract.getAssetByUUID("1");
  console.log("Asset Details: ", assetbyuuid);

  // let owner=await assetTrackerContract.isOwnerOf("")
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
